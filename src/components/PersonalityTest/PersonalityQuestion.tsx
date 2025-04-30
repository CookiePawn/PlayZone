import React, { useState, useEffect } from 'react';
import { PersonalityQuestion as QuestionType } from '@/types/personalityTest';

interface PersonalityQuestionProps {
    question: QuestionType;
    currentIndex: number;
    totalQuestions: number;
    onAnswer: (optionIndex: number) => void;
}

const PersonalityQuestion: React.FC<PersonalityQuestionProps> = ({
    question,
    currentIndex,
    totalQuestions,
    onAnswer
}) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const progress = ((currentIndex + 1) / totalQuestions) * 100;

    useEffect(() => {
        setSelectedOption(null);
    }, [currentIndex]);

    const handleOptionClick = (index: number) => {
        setSelectedOption(index);
        onAnswer(index);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                />
            </div>
            
            <div className="text-sm text-gray-500">
                질문 {currentIndex + 1} / {totalQuestions}
            </div>
            
            <h2 className="text-xl font-semibold text-center">
                {question.question}
            </h2>

            <div className="space-y-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        className={`w-full p-4 border-2 rounded-lg transition-colors text-left ${
                            selectedOption === index
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PersonalityQuestion;