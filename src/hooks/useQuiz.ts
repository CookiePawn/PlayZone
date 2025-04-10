import { useState, useMemo } from 'react';
import { QuizQuestion as QuizQuestionType, Difficulty } from '@/models';
import { generateContent } from '@/services/gemini';

interface UseQuizProps {
    easyPrompt: string;
    hardPrompt: string;
    numberOfQuestions: number;
}

export const useQuiz = ({ easyPrompt, hardPrompt }: UseQuizProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fetchedQuestions, setFetchedQuestions] = useState<QuizQuestionType[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

    // Filter valid questions
    const validQuestions = useMemo(() => {
        return fetchedQuestions.filter(q => 
            q && 
            typeof q.statement === 'string' && 
            q.statement.trim() !== '' &&
            typeof q.answer === 'boolean' &&
            typeof q.explanation === 'string' &&
            typeof q.legalBasis === 'string'
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
            const parsedQuestions: QuizQuestionType[] = JSON.parse(cleanedText);
            
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

    const handleDifficultySelect = (difficulty: Difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    const handleAnswer = (answer: boolean) => {
        if (showResult) return;
        setSelectedAnswer(answer);
        setShowResult(true);
        if (answer === currentQuestion.answer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setShowResult(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
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

        // Handlers
        handleStartQuiz,
        handleDifficultySelect,
        handleAnswer,
        handleNextQuestion,
        handleResetQuiz,
    };
}; 