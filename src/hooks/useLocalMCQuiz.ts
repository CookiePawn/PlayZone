import { useState, useCallback } from 'react';
import { MCQuizQuestion } from '@/models/MCQuiz';

interface UseLocalMCQuizProps {
    easyQuestions: MCQuizQuestion[];
    hardQuestions: MCQuizQuestion[];
    numberOfQuestions: number;
}

export function useLocalMCQuiz({ easyQuestions, hardQuestions, numberOfQuestions }: UseLocalMCQuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'hard' | null>(null);
    const [validQuestions, setValidQuestions] = useState<MCQuizQuestion[]>([]);
    const [isQuizFinished, setIsQuizFinished] = useState(false);

    const handleDifficultySelect = useCallback((difficulty: 'easy' | 'hard') => {
        setSelectedDifficulty(difficulty);
    }, []);

    const handleStartQuiz = useCallback(() => {
        if (!selectedDifficulty) return;

        const questions = selectedDifficulty === 'easy' ? easyQuestions : hardQuestions;
        const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, numberOfQuestions);

        setValidQuestions(selectedQuestions);
        setShowIntro(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setIsQuizFinished(false);
    }, [selectedDifficulty, easyQuestions, hardQuestions, numberOfQuestions]);

    const handleAnswer = useCallback((answerIndex: number) => {
        setSelectedAnswer(answerIndex);
        setShowResult(true);

        const currentQuestion = validQuestions[currentQuestionIndex];
        if (answerIndex === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }
    }, [currentQuestionIndex, validQuestions]);

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < validQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setIsQuizFinished(true);
        }
    }, [currentQuestionIndex, validQuestions.length]);

    const handleResetQuiz = useCallback(() => {
        setShowIntro(true);
        setSelectedDifficulty(null);
        setValidQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setIsQuizFinished(false);
    }, []);

    return {
        currentQuestionIndex,
        score,
        selectedAnswer,
        showResult,
        showIntro,
        selectedDifficulty,
        validQuestions,
        isQuizFinished,
        currentQuestion: validQuestions[currentQuestionIndex],
        handleStartQuiz,
        handleDifficultySelect,
        handleAnswer,
        handleShowExplanation: () => setShowResult(true),
        handleNextQuestion,
        handleResetQuiz,
    };
} 