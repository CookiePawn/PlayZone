export * from './OXQuiz';
export * from './MCQuiz';
export * from './TypoBattle';
import { TypoQuestion } from './TypoBattle';

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
    mistakes: number;
}