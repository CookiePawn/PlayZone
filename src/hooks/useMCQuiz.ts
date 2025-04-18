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

    // Filter valid questions
    const validQuestions = useMemo(() => {
        return fetchedQuestions.filter(q => 
            q && 
            typeof q.question === 'string' && 
            q.question.trim() !== '' &&
            Array.isArray(q.options) &&
            q.options.length === 4 &&
            q.options.every(opt => typeof opt === 'string' && opt.trim() !== '') &&
            typeof q.correctAnswer === 'number' &&
            q.correctAnswer >= 0 &&
            q.correctAnswer <= 3 &&
            typeof q.explanation === 'string'
        );
    }, [fetchedQuestions]);

    const isQuizFinished = currentQuestionIndex >= validQuestions.length;
    const currentQuestion = validQuestions[currentQuestionIndex];

    // --- API Call Function ---
    const fetchQuizData = async () => {
        setIsLoading(true);
        setError(null);

        const prompt = selectedDifficulty === 'easy' ? easyPrompt : hardPrompt;

        try {
            const responseText = await generateContent(prompt);
            const cleanedText = responseText.trim().replace(/^```json|```$/g, '').trim();
            const parsedQuestions: MCQuizQuestion[] = JSON.parse(cleanedText);
            
            if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
                throw new Error("API 응답 형식이 올바르지 않습니다.");
            }

            const questionsWithIds = parsedQuestions.map((q, index) => ({
                ...q,
                id: fetchedQuestions.length + index + 1
            }));
            setFetchedQuestions(prev => [...prev, ...questionsWithIds]);
            
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
        setFetchedQuestions([]); // Reset questions
        await fetchQuizData(); // Load first batch
        setShowIntro(false);
        setIsLoading(false);
        // Load additional questions immediately after first batch
        fetchQuizData();
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