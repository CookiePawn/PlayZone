export type MCQuizDifficulty = 'easy' | 'hard';

export interface MCQuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // 0-3 사이의 인덱스
    explanation: string;
    category?: string;
}

export interface MCQuizFeatures {
    time: string;
    aiExplanation: string;
    goal: string;
}

export interface MCQuizConfig {
    title: string;
    description: string;
    subtitle: string;
    highlightText: string;
    features: MCQuizFeatures;
    startButtonText: string;
    aiWarning?: {
        title?: string;
        description: string;
        additionalInfo?: string;
    };
} 