'use client'

import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

// --- Type Definition ---
type QuizQuestion = {
    id: number;
    statement: string;
    answer: boolean;
    explanation: string;
    legalBasis: string;
};

// --- Constants ---
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const NUMBER_OF_QUESTIONS = 10; // Number of questions to fetch

// --- Main Quiz Component ---
const LegalQuizPage = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showIntro, setShowIntro] = useState(true); // State to control intro/quiz view
    const [isLoading, setIsLoading] = useState(false); // State for loading API data
    const [error, setError] = useState<string | null>(null); // State for API errors
    const [fetchedQuestions, setFetchedQuestions] = useState<QuizQuestion[]>([]); // State for questions from API

    const isQuizFinished = fetchedQuestions.length > 0 && currentQuestionIndex >= fetchedQuestions.length;
    const currentQuestion = fetchedQuestions[currentQuestionIndex];

    // --- API Call Function (Updated Structure) ---
    const fetchQuizData = async () => {
        setIsLoading(true);
        setError(null);
        setFetchedQuestions([]);

        if (!API_KEY) {
            setError("API 키가 설정되지 않았습니다. 환경 변수를 확인하세요.");
            setIsLoading(false);
            return;
        }

        // Instantiate using the provided example structure
        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const prompt = `
      세금과 관련된 한국 법률 OX 퀴즈 ${NUMBER_OF_QUESTIONS}개를 생성해 주세요.
      각 퀴즈는 다음 JSON 형식을 따라야 합니다:
      {
        "id": 숫자 (1부터 시작),
        "statement": "법 관련 O/X 문장 (간결하고 혼동될 수 있게)",
        "answer": boolean (true는 O, false는 X),
        "explanation": "정답/오답에 대한 간결한 설명",
        "legalBasis": "관련 법률 조항 또는 판례 (간단히 명시)"
      }
      전체 응답은 이 JSON 객체 ${NUMBER_OF_QUESTIONS}개를 포함하는 유효한 JSON 배열이어야 합니다.
      배열 앞뒤에 다른 텍스트나 설명 없이 JSON 배열만 생성해주세요.
      예시:
      [
        {
          "id": 1,
          "statement": "CCTV로 몰래 녹화된 영상도 증거로 인정될 수 있다.",
          "answer": false,
          "explanation": "통신비밀보호법 등에 따라 당사자 간 동의 없는 녹화는 일반적으로 증거 능력이 부정됩니다.",
          "legalBasis": "통신비밀보호법 제14조 등"
        },
        {
          "id": 2,
          // ... 다음 문제 ...
        }
      ]
    `;

        try {
            console.log("Sending prompt to Gemini using ai.models.generateContent...");
            // Use the generateContent structure from the provided example
            const response = await ai.models.generateContent({
                model: "gemini-1.5-flash", // Using the model previously specified
                contents: prompt,
                // Safety settings can be added here if needed, matching the structure expected by this API call
                // safety_settings: [...] 
            });

            // Access text directly based on the example
            const text = response.text;
            console.log("Gemini Response Text:", text);

            if (!text) {
                throw new Error("API로부터 빈 응답을 받았습니다.");
            }

            // Clean the response text to ensure it's valid JSON
            const cleanedText = text.trim().replace(/^```json|```$/g, '').trim();

            console.log("Cleaned Text for Parsing:", cleanedText);
            const parsedQuestions: QuizQuestion[] = JSON.parse(cleanedText);

            if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0 || !parsedQuestions[0].statement) {
                throw new Error("API 응답 형식이 올바르지 않습니다.");
            }

            const questionsWithCorrectIds = parsedQuestions.map((q, index) => ({ ...q, id: index + 1 }));
            setFetchedQuestions(questionsWithCorrectIds);
            console.log("Fetched and parsed questions:", questionsWithCorrectIds);

        } catch (error: unknown) {
            console.error("Error fetching or parsing quiz data:", error);
            let errorMessage = "퀴즈 데이터를 가져오는 중 오류가 발생했습니다.";
            if (error instanceof Error) {
                // Adjust error message check if the API throws differently
                if (error.message.includes('API key not valid') || error.message.includes('API_KEY_INVALID')) {
                    errorMessage = "API 키가 유효하지 않습니다. 확인해주세요.";
                } else if (error instanceof SyntaxError) {
                    errorMessage = "API 응답을 파싱하는 중 오류가 발생했습니다. 응답 형식을 확인하세요.";
                } else {
                    errorMessage = `오류 발생: ${error.message}`;
                }
            } else {
                errorMessage = String(error);
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Event Handlers ---
    const handleStartQuiz = () => {
        setShowIntro(false);
        fetchQuizData(); // Fetch data when starting the quiz
    };

    const handleAnswer = (answer: boolean) => {
        if (showResult || isLoading) return; // Prevent interaction during loading/result
        setSelectedAnswer(answer);
        setShowResult(true);
        if (answer === currentQuestion.answer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (isLoading) return;
        setShowResult(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleResetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowIntro(true);
        setFetchedQuestions([]); // Clear fetched questions on reset
        setError(null);
        setIsLoading(false);
    };

    // --- Calculated Values ---
    const progressPercentage = fetchedQuestions.length > 0 ? ((currentQuestionIndex) / fetchedQuestions.length) * 100 : 0;

    // --- Render Logic ---

    // Render Intro Page View
    if (showIntro) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8 text-center">
                <div className="bg-white p-8 md:p-12 rounded-lg border border-gray-200 max-w-2xl w-full">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">⚖️ 법률 OX 퀴즈</h1>
                    <p className="text-lg md:text-xl mb-4">
                        당신은 일상 속 법을 얼마나 정확히 알고 있을까?
                    </p>
                    <p className="text-gray-600 mb-4">
                        OX 하나로 가려지는 당신의 법 감별력 테스트!
                        <br />
                        <span className="block mt-2 font-semibold text-purple-600">{"몰랐다고 넘어가기엔 너무 가까운 법"}</span>
                    </p>
                    <div className="text-left text-gray-500 text-sm mb-8 space-y-2 bg-gray-50 p-4 rounded-md border">
                        <p>⏱️ **예상 소요 시간:** 약 {NUMBER_OF_QUESTIONS === 10 ? '3~5' : `${NUMBER_OF_QUESTIONS}`}분 (문제 수: {NUMBER_OF_QUESTIONS}개)</p>
                        <p>🤖 **AI 해설:** 각 문제의 정답 여부와 함께 Gemini AI가 관련 법률 조항 또는 판례를 바탕으로 명쾌한 해설을 제공합니다.</p>
                        <p>🎯 **목표:** 재미있게 법 상식을 넓히고, 실생활에 도움이 되는 지식을 얻어가세요!</p>
                    </div>
                    <button
                        onClick={handleStartQuiz}
                        disabled={isLoading} // Disable button while loading
                        className="w-full max-w-xs px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? '로딩 중...' : '시작하기'}
                    </button>
                    {error && <p className="mt-4 text-red-600">{error}</p>}
                </div>
            </div>
        );
    }

    // Update the loading state in the LegalQuizPage component
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <p className="loading-text-fill text-4xl font-bold mb-4">
                        AI 놀이터
                    </p>
                    <p className="text-gray-600 text-lg">AI가 퀴즈를 생성 중입니다...</p>
                    <p className="text-gray-500 text-sm mt-2">잠시만 기다려주세요</p>
                </div>
            </div>
        );
    }

    // Render Error State (after intro)
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 text-center">
                <div className="bg-white p-8 rounded-lg border border-red-300 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">오류 발생</h2>
                    <p className="text-red-700 mb-6">{error}</p>
                    <button
                        onClick={handleResetQuiz} // Go back to intro
                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-colors"
                    >
                        돌아가기
                    </button>
                </div>
            </div>
        );
    }

    // Render Quiz Finished screen (using fetchedQuestions.length)
    if (isQuizFinished) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
                <div className="bg-white p-8 rounded-lg border border-gray-200 w-full max-w-2xl flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-6">퀴즈 완료! 🎉</h1>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                        <div className="bg-purple-600 h-2.5 rounded-full progress-fill" style={{ width: '100%' }}></div>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-xl mb-4">
                            총 <span className="font-bold text-purple-600">{fetchedQuestions.length}</span>문제 중
                            <span className="font-bold text-purple-600"> {score}</span>문제를 맞혔습니다!
                        </p>
                        <p className="text-gray-600">
                            정답률: <span className="font-bold text-purple-600">{Math.round((score / fetchedQuestions.length) * 100)}%</span>
                        </p>
                    </div>

                    <button
                        onClick={handleResetQuiz}
                        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-colors"
                    >
                        다시 시작하기
                    </button>
                </div>

                {/* Confetti container */}
                <div className="confetti-container">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animation: `confetti-fall ${Math.random() * 2 + 1}s linear forwards`,
                                animationDelay: `${Math.random() * 2}s`,
                                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                                width: `${Math.random() * 8 + 4}px`,
                                height: `${Math.random() * 8 + 4}px`,
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Render Main Quiz UI (only if questions are fetched)
    if (fetchedQuestions.length === 0) {
        // This case should ideally be covered by loading/error states, but as a fallback:
        return (
            <div className="flex items-center justify-center min-h-screen">퀴즈 데이터가 없습니다.</div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 w-full max-w-2xl flex flex-col min-h-[650px]">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                    <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="mb-8 text-center">
                    <p className="text-lg md:text-xl font-medium text-gray-800">{currentQuestion.statement}</p>
                </div>
                <div className="flex space-x-4 justify-center mb-8">
                    <button
                        onClick={() => handleAnswer(true)}
                        disabled={showResult}
                        className={`w-24 h-24 md:w-32 md:h-32 rounded-full text-4xl md:text-5xl font-bold flex items-center justify-center transition-all duration-200 ease-in-out shadow-md disabled:opacity-60 border ${showResult && currentQuestion.answer === true ? 'bg-green-500 text-white scale-110 border-green-600' : 'bg-white text-green-600 hover:bg-green-50 active:scale-95 border-gray-300'} ${showResult && selectedAnswer === true && currentQuestion.answer === false ? 'bg-red-500 text-white border-red-600' : ''}`}
                    >
                        ⭕
                    </button>
                    <button
                        onClick={() => handleAnswer(false)}
                        disabled={showResult}
                        className={`w-24 h-24 md:w-32 md:h-32 rounded-full text-4xl md:text-5xl font-bold flex items-center justify-center transition-all duration-200 ease-in-out shadow-md disabled:opacity-60 border ${showResult && currentQuestion.answer === false ? 'bg-green-500 text-white scale-110 border-green-600' : 'bg-white text-red-600 hover:bg-red-50 active:scale-95 border-gray-300'} ${showResult && selectedAnswer === false && currentQuestion.answer === true ? 'bg-red-500 text-white border-red-600' : ''}`}
                    >
                        ❌
                    </button>
                </div>
                {showResult && (
                    <div className="w-full mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                        <h2 className="text-xl font-bold mb-3 text-center">
                            {selectedAnswer === currentQuestion.answer ? (
                                <span className="text-green-600">정답입니다! 🎉</span>
                            ) : (
                                <span className="text-red-600">오답입니다. 🤔</span>
                            )}
                        </h2>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">[해설]</span> {currentQuestion.explanation}</p>
                        <p className="text-sm text-gray-500"><span className="font-semibold">[근거]</span> {currentQuestion.legalBasis}</p>
                        <div className="text-center mt-6">
                            <button
                                onClick={handleNextQuestion}
                                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-colors"
                            >
                                다음 문제
                            </button>
                        </div>
                    </div>
                )}
                <div className="mt-auto pt-6 text-center text-lg font-semibold text-gray-700 border-t border-gray-200">
                    Score: {score} / {fetchedQuestions.length}
                </div>
            </div>
        </div>
    );
};

export default LegalQuizPage;

// Basic fade-in animation in globals.css if needed:
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
*/
