'use client';

import React from 'react';

interface MCQuizQuestionProps {
    question: {
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
    };
    selectedAnswer: number | null;
    showResult: boolean;
    onAnswer: (index: number) => void;
    onNext: () => void;
    currentIndex: number;
    totalQuestions: number;
    score: number;
}

export default function MCQuizQuestion({
    question,
    selectedAnswer,
    showResult,
    onAnswer,
    onNext,
    currentIndex,
    totalQuestions,
    score
}: MCQuizQuestionProps) {
    const progress = ((currentIndex + 1) / totalQuestions) * 100;
    const remainingQuestions = totalQuestions - (currentIndex + 1);

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Question Number and Score */}
            <div className="flex justify-between items-center mb-6">
                <div className="text-gray-600">
                    <span className="text-purple-600 font-semibold">{currentIndex + 1}</span>
                    <span> / {totalQuestions}</span>
                    <span className="text-gray-400 ml-2">(남은 문제: {remainingQuestions}개)</span>
                </div>
                <div className="text-purple-600 font-semibold">점수: {score}</div>
            </div>

            {/* Question */}
            <h2 className="text-xl font-semibold mb-6 text-gray-800">{question.question}</h2>

            {/* Options */}
            <div className="space-y-4 mb-6">
                {question.options.map((option, index) => {
                    let buttonClass = "w-full p-4 rounded-lg text-left transition-colors duration-200 ";
                    
                    if (showResult) {
                        if (index === question.correctAnswer) {
                            buttonClass += "bg-green-100 text-green-800 border-2 border-green-500";
                        } else if (index === selectedAnswer && index !== question.correctAnswer) {
                            buttonClass += "bg-red-100 text-red-800 border-2 border-red-500";
                        } else {
                            buttonClass += "bg-gray-100 text-gray-800 border-2 border-gray-200";
                        }
                    } else {
                        buttonClass += selectedAnswer === index 
                            ? "bg-purple-100 text-purple-800 border-2 border-purple-500" 
                            : "bg-gray-100 text-gray-800 border-2 border-gray-200 hover:bg-gray-200";
                    }

                    return (
                        <button
                            key={index}
                            className={buttonClass}
                            onClick={() => !showResult && onAnswer(index)}
                            disabled={showResult}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {/* Feedback */}
            {showResult && (
                <div className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <p className="text-gray-800">
                        {selectedAnswer === question.correctAnswer ? (
                            <span className="text-green-600 font-semibold">정답입니다! 🎉</span>
                        ) : (
                            <span className="text-red-600 font-semibold">틀렸습니다 😢</span>
                        )}
                    </p>
                    <p className="mt-2 text-gray-600">{question.explanation}</p>
                </div>
            )}

            {/* Next Button */}
            {showResult && (
                <button
                    onClick={onNext}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                    {currentIndex + 1 === totalQuestions ? '결과 보기' : '다음 문제'}
                </button>
            )}
        </div>
    );
} 