import { useState, useEffect } from 'react';

interface Question {
    id: number;
    statement: string;
    answer: boolean;
    explanation: string;
    legalBasis: string;
}

interface UseLocalQuizProps {
    numberOfQuestions: number;
    quizType: 'tax' | 'legal' | 'animal';
}

export function useLocalQuiz({ numberOfQuestions, quizType }: UseLocalQuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'hard' | null>(null);
    const [validQuestions, setValidQuestions] = useState<Question[]>([]);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [questions, setQuestions] = useState<{ easy: Question[], hard: Question[] }>({ easy: [], hard: [] });

    const currentQuestion = validQuestions[currentQuestionIndex];

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const easyQuestions = await import(`@/app/${quizType}-quiz/easy.json`);
                const hardQuestions = await import(`@/app/${quizType}-quiz/hard.json`);
                setQuestions({
                    easy: easyQuestions.default,
                    hard: hardQuestions.default
                });
            } catch {
                setError('퀴즈 데이터를 불러오는 중 오류가 발생했습니다.');
            }
        };
        loadQuestions();
    }, [quizType]);

    const handleDifficultySelect = (difficulty: 'easy' | 'hard') => {
        setSelectedDifficulty(difficulty);
    };

    const handleStartQuiz = () => {
        if (!selectedDifficulty) return;

        setIsLoading(true);
        try {
            const selectedQuestions = selectedDifficulty === 'easy' ? questions.easy : questions.hard;
            // Randomly select questions
            const shuffled = [...selectedQuestions].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, numberOfQuestions);
            setValidQuestions(selected);
            setShowIntro(false);
        } catch {
            setError('퀴즈 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswer = (answer: boolean) => {
        setSelectedAnswer(answer);
        setShowResult(true);
        if (answer === currentQuestion.answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex + 1 >= validQuestions.length) {
            setIsQuizFinished(true);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    const handleResetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowIntro(true);
        setIsLoading(false);
        setError(null);
        setSelectedDifficulty(null);
        setValidQuestions([]);
        setIsQuizFinished(false);
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
} 