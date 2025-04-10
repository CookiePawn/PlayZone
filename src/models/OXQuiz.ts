export type Difficulty = 'easy' | 'hard';

export interface QuizQuestion {
    id: number;
    statement: string;
    answer: boolean;
    explanation: string;
    legalBasis: string;
} 