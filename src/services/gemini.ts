import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

if (!API_KEY) {
    console.warn('Gemini API key is not set. Please check your environment variables.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateContent = async (prompt: string): Promise<string> => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
};

export type QuizQuestion = {
    id: number;
    statement: string;
    answer: boolean;
    explanation: string;
    legalBasis: string;
}; 