export interface CommonConceptQuestion {
    id: number;
    words: string[];
    correctAnswer: string;
    options: string[];
    explanation: string;
    category?: string;
}

export type CommonConceptDifficulty = 'easy' | 'hard'; 