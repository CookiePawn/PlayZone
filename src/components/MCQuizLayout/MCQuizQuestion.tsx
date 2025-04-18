import React from 'react';
import { MCQuizQuestion as Question } from '@/models/MCQuiz';

interface MCQuizQuestionProps {
    question: Question;
    selectedAnswer: number | null;
    showResult: boolean;
    onAnswer: (index: number) => void;
    onNext: () => void;
    currentIndex: number;
    totalQuestions: number;
    score: number;
}

const MCQuizQuestion: React.FC<MCQuizQuestionProps> = ({
    question,
    selectedAnswer,
    showResult,
    onAnswer,
    onNext,
    currentIndex,
    totalQuestions,
    score
}) => {
    const progress = ((currentIndex + 1) / totalQuestions) * 100;

    return (
        <div className="bg-white p-8 md:p-12 rounded-lg border border-gray-200 max-w-2xl w-full">
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <p className="text-lg text-gray-600">
                        <span className="font-bold text-purple-600">{currentIndex + 1}</span> / {totalQuestions}
                        <span className="ml-2">(남은 문제: {totalQuestions - (currentIndex)}개)</span>
                    </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-8">{question.question}</h2>
                </div>

                <div className="space-y-4">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === question.correctAnswer;
                        let buttonClass = "w-full p-4 text-left rounded-lg border transition-colors";

                        if (showResult) {
                            if (isCorrect) {
                                buttonClass += " bg-green-100 border-green-500 text-green-700";
                            } else if (isSelected && !isCorrect) {
                                buttonClass += " bg-red-100 border-red-500 text-red-700";
                            } else {
                                buttonClass += " bg-gray-50 border-gray-200 text-gray-700";
                            }
                        } else {
                            buttonClass += isSelected
                                ? " bg-purple-100 border-purple-500 text-purple-700"
                                : " bg-white border-gray-200 text-gray-700 hover:bg-gray-50";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => !showResult && onAnswer(index)}
                                className={buttonClass}
                                disabled={showResult}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {showResult && (
                    <div className="mt-8 p-4 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-bold mb-3 text-center">
                            {selectedAnswer === question.correctAnswer ? (
                                <span className="text-green-600">정답입니다! 🎉</span>
                            ) : (
                                <span className="text-red-600">오답입니다. 🤔</span>
                            )}
                        </h2>
                        <p className="text-gray-700">{question.explanation}</p>
                        <button
                            onClick={onNext}
                            className="w-full mt-4 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            {currentIndex + 1 === totalQuestions ? '결과 보기' : '다음 문제'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MCQuizQuestion; 