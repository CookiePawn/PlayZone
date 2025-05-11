import React from 'react';

interface Question {
    id: number;
    statement: string;
    answer: boolean;
    explanation: string;
    legalBasis: string;
}

interface LocalOXQuizQuestionProps {
    question: Question;
    selectedAnswer: boolean | null;
    showResult: boolean;
    onAnswer: (answer: boolean) => void;
    onNext: () => void;
    currentIndex: number;
    totalQuestions: number;
}

export default function LocalOXQuizQuestion({
    question,
    selectedAnswer,
    showResult,
    onAnswer,
    onNext,
    currentIndex,
    totalQuestions
}: LocalOXQuizQuestionProps) {
    const isCorrect = selectedAnswer === question.answer;

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
                    <p className="text-lg md:text-xl font-medium text-gray-800">{question.statement}</p>
                </div>

                {!showResult ? (
                    <div className="flex justify-center space-x-8 mb-8">
                        <button
                            onClick={() => onAnswer(true)}
                            disabled={showResult}
                            className={`w-24 h-24 md:w-32 md:h-32 rounded-full text-4xl md:text-5xl font-bold flex items-center justify-center transition-all duration-200 ease-in-out shadow-md disabled:opacity-60 border ${
                                showResult && question.answer === true
                                    ? 'bg-green-500 text-white scale-110 border-green-600'
                                    : 'bg-white text-green-600 hover:bg-green-50 active:scale-95 border-gray-300'
                            } ${
                                showResult && selectedAnswer === true && question.answer === false
                                    ? 'bg-red-500 text-white border-red-600'
                                    : ''
                            }`}
                        >
                            ⭕
                        </button>
                        <button
                            onClick={() => onAnswer(false)}
                            disabled={showResult}
                            className={`w-24 h-24 md:w-32 md:h-32 rounded-full text-4xl md:text-5xl font-bold flex items-center justify-center transition-all duration-200 ease-in-out shadow-md disabled:opacity-60 border ${
                                showResult && question.answer === false
                                    ? 'bg-green-500 text-white scale-110 border-green-600'
                                    : 'bg-white text-red-600 hover:bg-red-50 active:scale-95 border-gray-300'
                            } ${
                                showResult && selectedAnswer === false && question.answer === true
                                    ? 'bg-red-500 text-white border-red-600'
                                    : ''
                            }`}
                        >
                            ❌
                        </button>
                    </div>
                ) : (
                    <div className="w-full mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                        <h2 className="text-xl font-bold mb-3 text-center">
                            {selectedAnswer === question.answer ? (
                                <span className="text-green-600">정답입니다! 🎉</span>
                            ) : (
                                <span className="text-red-600">오답입니다. 🤔</span>
                            )}
                        </h2>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">[해설]</span> {question.explanation}</p>
                        <p className="text-sm text-gray-500"><span className="font-semibold">[근거]</span> {question.legalBasis}</p>
                        <div className="text-center mt-6">
                            <button
                                onClick={onNext}
                                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-colors"
                            >
                                {currentIndex + 1 === totalQuestions ? '결과 보기' : '다음 문제'}
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
} 