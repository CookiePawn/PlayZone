export interface TypoBattleQuestion {
    id: number;
    question: string;
    correctAnswer: string;
    explanation: string;
} 

export interface TypoQuestion {
    sentence: string;
    typo: string;
    correct: string;
}

export interface TypoBattleQuestionProps {
    question: TypoQuestion;
    userAnswer: string;
    setUserAnswer: (answer: string) => void;
    showResult: boolean;
    showExplanation: boolean;
    timeLeft: number;
    isTimeUp: boolean;
    onAnswer: (answer: string) => void;
    onNext: () => void;
}