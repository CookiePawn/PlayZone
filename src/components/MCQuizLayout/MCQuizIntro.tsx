'use client';

import React from 'react';

interface MCQuizIntroProps {
    config: {
        title: string;
        description: string;
        subtitle: string;
        highlightText: string;
        features: {
            time: string;
            aiExplanation: string;
            goal: string;
        };
        startButtonText: string;
        aiWarning: {
            title: string;
            description: string;
            additionalInfo: string;
        };
    };
    selectedDifficulty: 'easy' | 'hard' | null;
    onDifficultySelect: (difficulty: 'easy' | 'hard') => void;
    onStart: () => void;
    isLoading: boolean;
}

export default function MCQuizIntro({
    config,
    selectedDifficulty,
    onDifficultySelect,
    onStart,
    isLoading
}: MCQuizIntroProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-purple-600 mb-4">{config.title}</h1>
                <p className="text-xl text-gray-600 mb-2">{config.description}</p>
                <p className="text-lg text-gray-500">{config.subtitle}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 mb-8">
                <p className="text-center text-purple-600 font-semibold">{config.highlightText}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-600">예상 시간</p>
                    <p className="font-semibold text-gray-800">{config.features.time}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-600">AI 생성</p>
                    <p className="font-semibold text-gray-800">{config.features.aiExplanation}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-600">목표</p>
                    <p className="font-semibold text-gray-800">{config.features.goal}</p>
                </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">{config.aiWarning.title}</h3>
                <p className="text-yellow-700">{config.aiWarning.description}</p>
                {config.aiWarning.additionalInfo && (
                    <p className="text-yellow-700 mt-2">{config.aiWarning.additionalInfo}</p>
                )}
            </div>

            <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-gray-800">난이도 선택</h3>
                <div className="flex gap-4">
                    <button
                        onClick={() => onDifficultySelect('easy')}
                        className={`flex-1 p-4 rounded-lg border-2 transition-colors duration-200 ${
                            selectedDifficulty === 'easy'
                                ? 'bg-purple-100 border-purple-500 text-purple-800'
                                : 'bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                        쉬움
                    </button>
                    <button
                        onClick={() => onDifficultySelect('hard')}
                        className={`flex-1 p-4 rounded-lg border-2 transition-colors duration-200 ${
                            selectedDifficulty === 'hard'
                                ? 'bg-purple-100 border-purple-500 text-purple-800'
                                : 'bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                        어려움
                    </button>
                </div>
            </div>

            <button
                onClick={onStart}
                disabled={!selectedDifficulty || isLoading}
                className={`w-full py-4 rounded-lg text-white font-semibold transition-colors duration-200 ${
                    selectedDifficulty && !isLoading
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
                {isLoading ? '로딩 중...' : config.startButtonText}
            </button>
        </div>
    );
} 