import { useState, useEffect, useCallback } from 'react';
import promptData from '@/app/typo-battle/prompt.json';

interface TypoQuestion {
    sentence: string;
    typo: string;
    correct: string;
}

const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const useTypoBattle = () => {
    const [gameState, setGameState] = useState<'intro' | 'question' | 'result'>('intro');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState<TypoQuestion[]>(promptData);

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    const nextQuestion = useCallback(() => {
        if (mistakes >= 5) {
            setGameState('result');
            return;
        }

        setCurrentQuestionIndex(prev => {
            if (prev + 1 >= shuffledQuestions.length) {
                setGameState('result');
                return prev;
            }
            return prev + 1;
        });
        
        setUserAnswer('');
        setShowResult(false);
        setShowExplanation(false);
        setTimeLeft(5);
        setIsTimeUp(false);
    }, [mistakes, shuffledQuestions.length]);

    const handleAnswer = useCallback((answer: string) => {
        setUserAnswer(answer);
        setShowResult(true);
        
        const isCorrect = answer === currentQuestion.correct;
        if (isCorrect) {
            setScore(prev => prev + 1);
        } else {
            setMistakes(prev => prev + 1);
        }

        setShowExplanation(true);
        setTimeout(() => {
            nextQuestion();
        }, 1500);
    }, [currentQuestion, nextQuestion]);

    const handleTimeUp = useCallback(() => {
        if (!showResult) {
            setTimeLeft(0);
            handleAnswer(userAnswer);
        }
    }, [showResult, handleAnswer, userAnswer]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'question' && !showResult && timeLeft > 0) {
            const startTime = Date.now();
            const endTime = startTime + (timeLeft * 1000);
            
            timer = setInterval(() => {
                const now = Date.now();
                const remainingTime = Math.max(0, Math.ceil((endTime - now) / 1000));
                
                if (remainingTime === 0) {
                    setIsTimeUp(true);
                    clearInterval(timer);
                    handleTimeUp();
                    setTimeLeft(0);
                    return;
                }
                
                setTimeLeft(remainingTime);
            }, 50);
        }
        return () => {
            clearInterval(timer);
            if (showResult) {
                setTimeLeft(5);
            }
        };
    }, [gameState, showResult, timeLeft, handleTimeUp]);

    const startGame = useCallback(() => {
        setShuffledQuestions(shuffleArray(promptData));
        setGameState('question');
        setCurrentQuestionIndex(0);
        setScore(0);
        setMistakes(0);
        setUserAnswer('');
        setShowResult(false);
        setShowExplanation(false);
        setTimeLeft(5);
        setIsTimeUp(false);
    }, []);

    const resetGame = useCallback(() => {
        setGameState('intro');
    }, []);

    return {
        gameState,
        currentQuestion,
        currentQuestionIndex,
        score,
        mistakes,
        userAnswer,
        setUserAnswer,
        showResult,
        showExplanation,
        timeLeft,
        isTimeUp,
        startGame,
        handleAnswer,
        nextQuestion,
        resetGame
    };
}; 