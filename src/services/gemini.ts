import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export type QuizQuestion = {
    id: number;
    statement: string;
    answer: boolean;
    explanation: string;
    legalBasis: string;
};


export async function generateContent(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: prompt,
        });

        const text = response.text;
        if (!text) {
            throw new Error("API로부터 빈 응답을 받았습니다.");
        }

        return text;
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
} 