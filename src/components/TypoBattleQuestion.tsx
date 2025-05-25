'use client';

import React, { useRef, useEffect } from 'react';
import { TypoBattleQuestionProps } from '@/models';

export default function TypoBattleQuestion({
    question,
    userAnswer,
    setUserAnswer,
    showResult,
    showExplanation,
    timeLeft,
    isTimeUp,
    onAnswer,
    mistakes
}: TypoBattleQuestionProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!showResult && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showResult, question]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!showResult) {
            setUserAnswer(e.target.value);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !showResult) {
            onAnswer(userAnswer);
        }
    };

    return (
        <div className="bg-white rounded-lg p-8 text-center h-screen">
            <div className="flex justify-between items-center mb-6 gap-6">
                <div className="w-full mt-32 mb-16">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-purple-600"
                            style={{ 
                                width: `${(timeLeft / 5) * 100}%`,
                                transition: timeLeft === 5 ? 'none' : `width ${timeLeft}s linear`
                            }}
                        />
                    </div>
                </div>
                <div className="text-2xl font-bold text-red-600 whitespace-nowrap mt-16">
                    목숨: {5 - mistakes}/5
                </div>
            </div>
            {isTimeUp && !showResult && (
                <div className="text-red-500 font-semibold mb-4">
                    시간이 다 되었습니다!
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {question.sentence}
                </h2>
                <input
                    ref={inputRef}
                    type="text"
                    value={userAnswer}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={showResult}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="오타를 입력하고 Enter를 눌러주세요"
                />
            </div>

            {showResult && (
                <div className="mb-6">
                    <div className={`text-xl font-semibold mb-2 ${
                        userAnswer === question.correct ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {userAnswer === question.correct ? '정답입니다!' : '오답입니다!'}
                    </div>
                    {showExplanation && (
                        <div className="text-gray-600">
                            올바른 표현은 [{question.correct}]입니다. [{question.typo}]는 잘못된 표현입니다.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
} 