import React from 'react';
import { MCQuizQuestion as QuestionType } from '@/models/MCQuiz';

interface LocalMCQuizQuestionProps {
    question: QuestionType;
    selectedAnswer: number | null;
    showResult: boolean;
    showExplanation: boolean;
    onAnswer: (answerIndex: number) => void;
    onShowExplanation: () => void;
    onNext: () => void;
    currentIndex: number;
    totalQuestions: number;
    score: number;
}

export default function LocalMCQuizQuestion({
    question,
    selectedAnswer,
    showResult,
    onAnswer,
    onNext,
    currentIndex,
    totalQuestions,
    score,
}: LocalMCQuizQuestionProps) {
    const isCorrect = selectedAnswer === question.correctAnswer;

    // 질문에 \n이 있을 경우 <br /> 태그로 변환
    const formattedQuestion = question.question.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < question.question.split('\n').length - 1 && <br />}
        </React.Fragment>
    ));

    return (
        <div className="bg-white rounded-lg p-6 h-screen">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-32 mb-16">
                <div
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
            </div>

            {/* Question Number and Score */}
            <div className="flex justify-between items-center mb-6">
                <div className="text-gray-600">
                    <span className="text-purple-600 font-semibold">{currentIndex + 1}</span>
                    <span> / {totalQuestions}</span>
                </div>
                <div className="text-purple-600 font-semibold">점수: {score}</div>
            </div>

            {/* Question */}
            <h2 className="text-xl font-semibold mb-6 text-gray-800 whitespace-pre-line">
                {formattedQuestion}
            </h2>

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

            {/* Explanation and Next Button */}
            {showResult && (
                <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${
                        isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}>
                        <p className="font-medium">
                            {isCorrect ? '정답입니다! 🎉' : '틀렸습니다.'}
                        </p>
                        <p className="mt-2">
                            {question.explanation}
                        </p>
                    </div>
                    <button
                        onClick={onNext}
                        className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                    >
                        다음 문제
                    </button>
                </div>
            )}
        </div>
    );
} 