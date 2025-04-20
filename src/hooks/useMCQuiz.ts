import { useState, useMemo } from 'react';
import { MCQuizQuestion, MCQuizDifficulty } from '@/models/MCQuiz';
import { generateContent } from '@/services/gemini';

interface UseMCQuizProps {
    easyPrompt: string;
    hardPrompt: string;
    numberOfQuestions: number;
}

export const useMCQuiz = ({ easyPrompt, hardPrompt }: UseMCQuizProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fetchedQuestions, setFetchedQuestions] = useState<MCQuizQuestion[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<MCQuizDifficulty | null>(null);
    const [percentile, setPercentile] = useState<number | null>(null);
    const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);

    // Filter valid questions and remove duplicates
    const validQuestions = useMemo(() => {
        const uniqueQuestions = fetchedQuestions.filter((q, index, self) => {
            const question = q.question.trim().toLowerCase();
            return index === self.findIndex(q2 => q2.question.trim().toLowerCase() === question);
        });
        return uniqueQuestions;
    }, [fetchedQuestions]);

    const isQuizFinished = currentQuestionIndex >= validQuestions.length;
    const currentQuestion = validQuestions[currentQuestionIndex];

    // --- API Call Function ---
    const fetchQuizData = async (isSecondCall: boolean = false) => {
        setIsLoading(true);
        setError(null);

        const prompt = selectedDifficulty === 'easy' ? easyPrompt : hardPrompt;
        const previousStatements = previousQuestions.join('\n');

        const enhancedPrompt = `${prompt}\n\n다음은 이미 생성된 문제들입니다. 이와 중복되지 않는 새로운 문제를 생성해주세요:\n${previousStatements}\n\n중복을 피하기 위해 다음 사항을 준수해주세요:\n1. 동일하거나 유사한 문장을 사용하지 마세요\n2. 동일한 주제나 내용을 다루더라도 다른 각도에서 접근해주세요\n3. 이미 생성된 문제의 변형이나 재구성된 버전을 만들지 마세요\n4. 정확히 10개의 문제만 생성해주세요`;

        try {
            const responseText = await generateContent(enhancedPrompt);
            const cleanedText = responseText.trim().replace(/^```json|```$/g, '').trim();
            const parsedResponse = JSON.parse(cleanedText);
            
            if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions) || parsedResponse.questions.length !== 10) {
                throw new Error("API 응답 형식이 올바르지 않거나 문제 수가 10개가 아닙니다.");
            }

            // Update previous questions list
            const newStatements = parsedResponse.questions.map((q: MCQuizQuestion) => q.question.trim().toLowerCase());
            setPreviousQuestions(prev => [...prev, ...newStatements]);

            const questionsWithIds = parsedResponse.questions.map((q: MCQuizQuestion, index: number) => ({
                ...q,
                id: fetchedQuestions.length + index + 1
            }));

            if (isSecondCall) {
                // For second call, ensure we have exactly 10 new questions
                let retryCount = 0;
                let uniqueNewQuestions = questionsWithIds.filter((q: MCQuizQuestion) => 
                    !fetchedQuestions.some(existing => 
                        existing.question.trim().toLowerCase() === q.question.trim().toLowerCase()
                    )
                );

                // If we don't have 10 unique questions, retry until we do
                while (uniqueNewQuestions.length < 10 && retryCount < 3) {
                    const retryResponse = await generateContent(enhancedPrompt);
                    const retryCleanedText = retryResponse.trim().replace(/^```json|```$/g, '').trim();
                    const retryParsedResponse = JSON.parse(retryCleanedText);
                    
                    if (retryParsedResponse.questions && Array.isArray(retryParsedResponse.questions)) {
                        const retryQuestions = retryParsedResponse.questions.map((q: MCQuizQuestion, index: number) => ({
                            ...q,
                            id: fetchedQuestions.length + uniqueNewQuestions.length + index + 1
                        }));

                        const additionalUniqueQuestions = retryQuestions.filter((q: MCQuizQuestion) => 
                            !fetchedQuestions.some(existing => 
                                existing.question.trim().toLowerCase() === q.question.trim().toLowerCase()
                            ) && !uniqueNewQuestions.some((newQ: MCQuizQuestion) => 
                                newQ.question.trim().toLowerCase() === q.question.trim().toLowerCase()
                            )
                        );

                        uniqueNewQuestions = [...uniqueNewQuestions, ...additionalUniqueQuestions];
                    }
                    retryCount++;
                }

                if (uniqueNewQuestions.length < 10) {
                    throw new Error("두 번째 배치에서 충분한 고유한 문제를 생성하지 못했습니다.");
                }

                setFetchedQuestions(prev => [...prev, ...uniqueNewQuestions.slice(0, 10)]);
            } else {
                setFetchedQuestions(questionsWithIds);
            }
            
        } catch (e) {
            console.error("Error fetching quiz data:", e);
            let errorMessage = "퀴즈 데이터를 가져오는 중 오류가 발생했습니다.";
            if (e instanceof Error) {
                if (e.message.includes('API key not valid') || e.message.includes('API_KEY_INVALID')) {
                    errorMessage = "API 키가 유효하지 않습니다. 확인해주세요.";
                } else if (e instanceof SyntaxError) {
                    errorMessage = "API 응답을 파싱하는 중 오류가 발생했습니다. 응답 형식을 확인하세요.";
                } else {
                    errorMessage = `오류 발생: ${e.message}`;
                }
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Event Handlers ---
    const handleStartQuiz = async () => {
        if (!selectedDifficulty) return;
        setIsLoading(true);
        setFetchedQuestions([]);
        setPreviousQuestions([]);
        await fetchQuizData(false); // Load first batch
        setShowIntro(false);
        setIsLoading(false);
        // Load additional questions immediately after first batch
        fetchQuizData(true);
    };

    const handleDifficultySelect = (difficulty: MCQuizDifficulty) => {
        setSelectedDifficulty(difficulty);
    };

    const calculatePercentile = async (score: number, totalQuestions: number) => {
        const prompt = `
            다음은 퀴즈 결과에 대한 상위 퍼센트를 계산하는 기준입니다:
            
            1. 정답률이 90% 이상: 상위 5%
            2. 정답률이 80% 이상: 상위 15%
            3. 정답률이 70% 이상: 상위 30%
            4. 정답률이 60% 이상: 상위 50%
            5. 정답률이 50% 이상: 상위 70%
            6. 정답률이 40% 이상: 상위 85%
            7. 정답률이 30% 이상: 상위 95%
            8. 그 외: 상위 100%
            
            정답률이 ${Math.round((score / totalQuestions) * 100)}%인 경우, 상위 몇 %에 해당하는지 숫자만 반환해주세요.
            예: 15
        `;

        try {
            const response = await generateContent(prompt);
            const percentile = parseInt(response.trim());
            setPercentile(percentile);
        } catch (e) {
            console.error("Error calculating percentile:", e);
            setPercentile(null);
        }
    };

    const handleAnswer = (answerIndex: number) => {
        if (showResult) return;
        setSelectedAnswer(answerIndex);
        setShowResult(true);
        if (answerIndex === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setShowResult(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        
        // 마지막 문제를 풀었을 때 퍼센트 계산
        if (currentQuestionIndex + 1 >= validQuestions.length) {
            calculatePercentile(score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0), validQuestions.length);
        }
    };

    const handleResetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowIntro(true);
        setFetchedQuestions([]);
        setError(null);
        setIsLoading(false);
        setSelectedDifficulty(null);
        setPercentile(null);
        setPreviousQuestions([]);
    };

    return {
        // State
        currentQuestionIndex,
        score,
        selectedAnswer,
        showResult,
        showIntro,
        isLoading,
        error,
        selectedDifficulty,
        validQuestions,
        isQuizFinished,
        currentQuestion,
        percentile,

        // Handlers
        handleStartQuiz,
        handleDifficultySelect,
        handleAnswer,
        handleNextQuestion,
        handleResetQuiz,
    };
}; 