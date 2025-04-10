'use client'

import React, { useState } from 'react';
import { generateContent } from '@/services/gemini';

// --- Type Definition ---
type QuizQuestion = {
    id: number;
    statement: string;
    answer: boolean;
    explanation: string;
    legalBasis: string;
};

type Difficulty = 'easy' | 'hard';

// --- Constants ---
const NUMBER_OF_QUESTIONS = 10; // Generate 5 questions at a time
// const TOTAL_QUESTIONS = 10; // Total number of questions for the quiz

// --- Main Quiz Component ---
const LegalQuizPage = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fetchedQuestions, setFetchedQuestions] = useState<QuizQuestion[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

    // Filter valid questions
    const validQuestions = React.useMemo(() => {
        return fetchedQuestions.filter(q => 
            q && 
            typeof q.statement === 'string' && 
            q.statement.trim() !== '' &&
            typeof q.answer === 'boolean' &&
            typeof q.explanation === 'string' &&
            typeof q.legalBasis === 'string'
        );
    }, [fetchedQuestions]);

    // Load initial questions when intro page is shown and difficulty is selected
    React.useEffect(() => {
        // Remove auto-loading logic
    }, []);

    const isQuizFinished = currentQuestionIndex >= validQuestions.length;
    const currentQuestion = validQuestions[currentQuestionIndex];

    // --- API Call Function ---
    const fetchQuizData = async () => {
        setIsLoading(true);
        setError(null);

        const easyPrompt = `
            한국 법률 OX 퀴즈 ${NUMBER_OF_QUESTIONS}개를 생성해주세요.
            각 문제는 다음 형식의 JSON 객체여야 합니다:
            {
                "id": 숫자,
                "statement": "법 관련 O/X 문장",
                "answer": boolean,
                "explanation": "간단한 설명",
                "legalBasis": "관련 법률"
            }
            ${NUMBER_OF_QUESTIONS}개의 JSON 객체를 배열로 반환하세요.
            다른 텍스트 없이 JSON 배열만 반환하세요.
            
            반드시 실제 존재하는 한국 법률에 기반한 문제만 생성하세요.
            허구나 잘못된 법률 정보를 포함하지 마세요.
            모든 설명과 법적 근거는 현행 법령에 기반해야 합니다.

            문제의 난이도는 일반인이 이해하기 쉬운 수준으로 출제해주세요.
            일상생활에서 자주 접할 수 있는 법적 상황이나
            기본적인 법률 상식을 테스트하는 문제를 포함해주세요.
        `;

        const hardPrompt = `
            한국 법률 OX 퀴즈 ${NUMBER_OF_QUESTIONS}개를 생성해주세요.
            각 문제는 다음 형식의 JSON 객체여야 합니다:
            {
                "id": 숫자,
                "statement": "법 관련 O/X 문장",
                "answer": boolean,
                "explanation": "간단한 설명",
                "legalBasis": "관련 법률"
            }
            ${NUMBER_OF_QUESTIONS}개의 JSON 객체를 배열로 반환하세요.
            다른 텍스트 없이 JSON 배열만 반환하세요.
            
            반드시 실제 존재하는 한국 법률에 기반한 문제만 생성하세요.
            허구나 잘못된 법률 정보를 포함하지 마세요.
            모든 설명과 법적 근거는 현행 법령에 기반해야 합니다.

            문제의 난이도는 법학적 지식이 필요한 수준으로 출제해주세요.
            단순한 상식 수준이 아닌, 법조문의 세부적인 내용이나 
            법률 해석이 필요한 고난도 문제를 포함해주세요.
            법학 전공자나 법률 실무자들도 도전적으로 느낄 수 있는 수준으로 만들어주세요.
        `;

        const prompt = selectedDifficulty === 'easy' ? easyPrompt : hardPrompt;

        try {
            const responseText = await generateContent(prompt);
            const cleanedText = responseText.trim().replace(/^```json|```$/g, '').trim();
            const parsedQuestions: QuizQuestion[] = JSON.parse(cleanedText);
            
            if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
                throw new Error("API 응답 형식이 올바르지 않습니다.");
            }

            const questionsWithIds = parsedQuestions.map((q, index) => ({
                ...q,
                id: fetchedQuestions.length + index + 1
            }));
            setFetchedQuestions(prev => [...prev, ...questionsWithIds]);
            
        } catch (e) {
            console.error("Error fetching quiz data:", e);
            let errorMessage = "퀴즈 데이터를 가져오는 중 오류가 발생했습니다.";
            if (e instanceof Error) {
                if (e.message.includes('API key not valid') || e.message.includes('API_KEY_INVALID')) {
                    errorMessage = "API 키가 유효하지 않습니다. 확인해주세요.";
                } else if (e instanceof SyntaxError) {
                    errorMessage = "API 응답을 파싱하는 중 오류가 발생했습니다. 응답 형식을 확인하세요.";
                } else {
                    errorMessage = `오류 발생: ${e.message}`;
                }
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Event Handlers ---
    const handleStartQuiz = async () => {
        if (!selectedDifficulty) return;
        setIsLoading(true);
        setFetchedQuestions([]); // Reset questions
        await fetchQuizData(); // Load first batch
        setShowIntro(false);
        setIsLoading(false);
        // Load additional questions immediately after first batch
        fetchQuizData();
    };

    const handleDifficultySelect = (difficulty: Difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    const handleAnswer = (answer: boolean) => {
        if (showResult) return;
        setSelectedAnswer(answer);
        setShowResult(true);
        if (answer === currentQuestion.answer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
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
        setFetchedQuestions([]);
        setError(null);
        setIsLoading(false);
        setSelectedDifficulty(null);
    };

    // --- Calculated Values ---
    const progressPercentage = ((currentQuestionIndex) / validQuestions.length) * 100;

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
                        <p>⏱️ **예상 소요 시간:** 약 3~5분 (문제 수: {validQuestions.length}개)</p>
                        <p>🤖 **AI 해설:** 각 문제의 정답 여부와 함께 Gemini AI가 관련 법률 조항 또는 판례를 바탕으로 명쾌한 해설을 제공합니다.</p>
                        <p>🎯 **목표:** 재미있게 법 상식을 넓히고, 실생활에 도움이 되는 지식을 얻어가세요!</p>
                    </div>
                    <div className="mb-8">
                        <p className="text-lg font-semibold mb-4">난이도를 선택하세요</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => handleDifficultySelect('easy')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                    selectedDifficulty === 'easy'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                쉬움
                            </button>
                            <button
                                onClick={() => handleDifficultySelect('hard')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                    selectedDifficulty === 'hard'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                어려움
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <button
                            onClick={handleStartQuiz}
                            disabled={isLoading || !selectedDifficulty}
                            className={`w-full max-w-xs px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden`}
                        >
                            <span className="relative z-10">{isLoading ? '로딩 중...' : '시작하기'}</span>
                            {isLoading && (
                                <div className="absolute inset-0 bg-purple-700 loading-fill"></div>
                            )}
                        </button>
                    </div>
                    {error && <p className="mt-4 text-red-600">{error}</p>}
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
                        onClick={handleResetQuiz}
                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-colors"
                    >
                        돌아가기
                    </button>
                </div>
            </div>
        );
    }

    // Render Quiz Finished screen (using validQuestions.length)
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
                            총 <span className="font-bold text-purple-600">{validQuestions.length}</span>문제 중
                            <span className="font-bold text-purple-600"> {score}</span>문제를 맞혔습니다!
                        </p>
                        <p className="text-gray-600">
                            정답률: <span className="font-bold text-purple-600">{Math.round((score / validQuestions.length) * 100)}%</span>
                        </p>
                    </div>

                    <button
                        onClick={handleResetQuiz}
                        disabled={isLoading}
                        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    if (validQuestions.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <p className="text-gray-600 text-lg">퀴즈 데이터를 불러오는 중입니다...</p>
                    <button
                        onClick={handleResetQuiz}
                        className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-colors"
                    >
                        돌아가기
                    </button>
                </div>
            </div>
        );
    }

    // Check if current question exists
    if (!currentQuestion) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <p className="text-gray-600 text-lg">문제를 불러오는 중입니다...</p>
                    <button
                        onClick={handleResetQuiz}
                        className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-colors"
                    >
                        돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 w-full max-w-2xl flex flex-col min-h-[650px]">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                    <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="mb-8 text-center h-[150px]">
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
                <div className="mt-auto text-center py-4">
                    <p className="text-lg text-gray-600">
                        <span className="font-bold text-purple-600">{currentQuestionIndex + 1}</span> / {validQuestions.length} 
                        <span className="ml-2">(남은 문제: {validQuestions.length - (currentQuestionIndex + 1)}개)</span>
                    </p>
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
