import { useState, useEffect } from 'react';
import easyQuestions from '@/app/tax-quiz/easy.json';
import hardQuestions from '@/app/tax-quiz/hard.json';

interface Question {
    id: number;
    statement: string;
    answer: boolean;
    explanation: string;
    legalBasis: string;
}

interface UseLocalQuizProps {
    numberOfQuestions: number;
}

export function useLocalQuiz({ numberOfQuestions }: UseLocalQuizProps) {
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

    const currentQuestion = validQuestions[currentQuestionIndex];

    const handleDifficultySelect = (difficulty: 'easy' | 'hard') => {
        setSelectedDifficulty(difficulty);
    };

    const handleStartQuiz = () => {
        if (!selectedDifficulty) return;

        setIsLoading(true);
        try {
            const questions = selectedDifficulty === 'easy' ? easyQuestions : hardQuestions;
            // Randomly select questions
            const shuffled = [...questions].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, numberOfQuestions);
            setValidQuestions(selected);
            setShowIntro(false);
        } catch (err) {
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