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
}

const MCQuizQuestion: React.FC<MCQuizQuestionProps> = ({
    question,
    selectedAnswer,
    showResult,
    onAnswer,
    onNext,
    currentIndex,
    totalQuestions,
}) => {
    const getOptionClass = (index: number) => {
        if (!showResult) {
            return selectedAnswer === index
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-50';
        }

        if (index === question.correctAnswer) {
            return 'bg-green-100 border-green-500';
        }

        if (selectedAnswer === index && index !== question.correctAnswer) {
            return 'bg-red-100 border-red-500';
        }

        return '';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 w-full max-w-2xl flex flex-col min-h-[650px]">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                    <div 
                        className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
                    ></div>
                </div>
                <div className="mb-8 text-center h-[150px]">
                    <p className="text-lg md:text-xl font-medium text-gray-800">{question.question}</p>
                </div>
                <div className="space-y-3 mb-8">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onAnswer(index)}
                            disabled={showResult}
                            className={`w-full p-4 text-left border rounded-lg transition-colors ${getOptionClass(index)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {showResult && (
                    <div className="w-full mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                        <h2 className="text-xl font-bold mb-3 text-center">
                            {selectedAnswer === question.correctAnswer ? (
                                <span className="text-green-600">정답입니다! 🎉</span>
                            ) : (
                                <span className="text-red-600">오답입니다. 🤔</span>
                            )}
                        </h2>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">[해설]</span> {question.explanation}</p>
                        <div className="text-center mt-6">
                            <button
                                onClick={onNext}
                                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-colors"
                            >
                                다음 문제
                            </button>
                        </div>
                    </div>
                )}
                <div className="mt-auto text-center py-4">
                    <p className="text-lg text-gray-600">
                        <span className="font-bold text-purple-600">{currentIndex + 1}</span> / {totalQuestions} 
                        <span className="ml-2">(남은 문제: {totalQuestions - (currentIndex)}개)</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MCQuizQuestion; 