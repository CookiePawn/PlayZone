export interface PersonalityQuestion {
    question: string;
    options: [string, string];
    traits: {
        option1: string[];
        option2: string[];
    };
}

export interface PersonalityQuestions {
    questions: PersonalityQuestion[];
} 