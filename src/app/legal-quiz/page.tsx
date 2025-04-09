'use client'

import React, { useState } from 'react';

// --- Quiz Data ---
const quizQuestions = [
  {
    id: 1,
    statement: "CCTV로 몰래 녹화된 영상도 증거로 인정될 수 있다.",
    answer: false, // ❌ is correct
    explanation: "통신비밀보호법 등에 따라 당사자 간 동의 없는 녹화는 일반적으로 증거 능력이 부정됩니다.",
    legalBasis: "통신비밀보호법 제14조 등"
  },
  {
    id: 2,
    statement: "임대차 계약 만료 1개월 전까지 갱신 거절 통지를 하지 않으면 자동으로 계약이 연장된다.",
    answer: true, // ⭕ is correct
    explanation: "주택임대차보호법에 따라 임대인이 계약 만료 6개월 전부터 2개월 전까지 갱신 거절 통지를 하지 않으면 묵시적으로 갱신됩니다.",
    legalBasis: "주택임대차보호법 제6조"
  },
  {
    id: 3,
    statement: "온라인 쇼핑몰에서 구매한 상품은 어떤 경우에도 7일 이내에 청약 철회가 가능하다.",
    answer: false, // ❌ is correct
    explanation: "전자상거래법상 청약 철회가 가능하지만, 상품 훼손, 사용, 복제 가능한 상품의 포장 개봉 등 예외 사유가 존재합니다.",
    legalBasis: "전자상거래 등에서의 소비자보호에 관한 법률 제17조"
  },
  // Add more questions here...
];

// --- Main Quiz Component ---
const LegalQuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // State to control intro/quiz view

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isQuizFinished = currentQuestionIndex >= quizQuestions.length;

  const handleStartQuiz = () => {
    setShowIntro(false);
  };

  const handleAnswer = (answer: boolean) => {
    if (showResult) return; // Prevent answering again

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
    setShowIntro(true); // Show intro again on reset
  };

  const progressPercentage = isQuizFinished ? 100 : ((currentQuestionIndex) / quizQuestions.length) * 100;

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
            <p>⏱️ **예상 소요 시간:** 약 3~5분</p>
            <p>🤖 **AI 해설:** 각 문제의 정답 여부와 함께 Gemini AI가 관련 법률 조항 또는 판례를 바탕으로 명쾌한 해설을 제공합니다.</p>
            <p>🎯 **목표:** 재미있게 법 상식을 넓히고, 실생활에 도움이 되는 지식을 얻어가세요!</p>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full max-w-xs px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors text-lg"
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  // Render Quiz Finished screen
  if (isQuizFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">퀴즈 완료!</h1>
        <p className="text-xl mb-8">총 {quizQuestions.length}문제 중 <span className="font-bold text-purple-600">{score}</span>문제를 맞혔습니다.</p>
        <button
          onClick={handleResetQuiz} // Use updated reset handler
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-colors"
        >
          다시 시작하기
        </button>
      </div>
    );
  }

  // Render Main Quiz UI
  return (
    // Outer container to center the content vertically and horizontally
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
      {/* White container box for all quiz elements - Added min-h and flex layout */}
      <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 w-full max-w-2xl flex flex-col min-h-[700px]">

        {/* Progress Bar - Moved inside the white box */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        {/* Question Statement - Removed card styles, using container's padding */}
        <div className="mb-8 text-center min-h-[100px]">
          <p className="text-lg md:text-xl font-medium text-gray-800">{currentQuestion.statement}</p>
        </div>

        {/* O/X Buttons - Moved inside, centered */}
        <div className="flex space-x-4 justify-center mb-8">
          <button
            onClick={() => handleAnswer(true)} // true for ⭕
            disabled={showResult}
            // Added border for default state
            className={`w-24 h-24 md:w-32 md:h-32 rounded-full text-4xl md:text-5xl font-bold flex items-center justify-center transition-all duration-200 ease-in-out shadow-md disabled:opacity-60 border ${showResult && currentQuestion.answer === true ? 'bg-green-500 text-white scale-110 border-green-600' : 'bg-white text-green-600 hover:bg-green-50 active:scale-95 border-gray-300'} ${showResult && selectedAnswer === true && currentQuestion.answer === false ? 'bg-red-500 text-white border-red-600' : ''}`}
          >
            ⭕
          </button>
          <button
            onClick={() => handleAnswer(false)} // false for ❌
            disabled={showResult}
            // Added border for default state
            className={`w-24 h-24 md:w-32 md:h-32 rounded-full text-4xl md:text-5xl font-bold flex items-center justify-center transition-all duration-200 ease-in-out shadow-md disabled:opacity-60 border ${showResult && currentQuestion.answer === false ? 'bg-green-500 text-white scale-110 border-green-600' : 'bg-white text-red-600 hover:bg-red-50 active:scale-95 border-gray-300'} ${showResult && selectedAnswer === false && currentQuestion.answer === true ? 'bg-red-500 text-white border-red-600' : ''}`}
          >
            ❌
          </button>
        </div>

        {/* Result/Explanation Area - Moved inside, adjusted style */}
        {showResult && (
          // Use a slightly different background and border inside the white card
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
      </div> {/* End of the white container box */}
    </div> // End of the outer flex container
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
