'use client';

import React from 'react';
import { Difficulty } from '../../models/OXQuiz';
import LoadingButton from '../OXQuizLayout/LoadingButton';
import DifficultySelector from '../OXQuizLayout/DifficultySelector';

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
        aiWarning?: {
            title?: string;
            description: string;
            additionalInfo?: string;
        };
    };
    selectedDifficulty: Difficulty | null;
    onDifficultySelect: (difficulty: Difficulty) => void;
    onStart: () => void;
    isLoading: boolean;
    error: string | null;
}

export default function MCQuizIntro({
    config,
    selectedDifficulty,
    onDifficultySelect,
    onStart,
    isLoading,
    error
}: MCQuizIntroProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 text-center">
            <div className="bg-white p-8 md:p-12 rounded-lg border border-gray-200 max-w-2xl w-full">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">{config.title}</h1>
                <p className="text-lg md:text-xl mb-4">
                    {config.description}
                </p>
                <p className="text-gray-600 mb-4">
                    {config.subtitle}
                    <br />
                    <span className="block mt-2 font-semibold text-purple-600">{config.highlightText}</span>
                </p>
                <div className="text-left text-gray-500 text-sm mb-8 space-y-2 bg-gray-50 p-4 rounded-md border">
                    <p>⏱️ {config.features.time}</p>
                    <p>🤖 {config.features.aiExplanation}</p>
                    <p>🎯 {config.features.goal}</p>
                </div>
                <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-left">
                    <h3 className="text-yellow-800 font-semibold mb-2 flex items-center">
                        <span className="mr-2">⚠️</span>
                        {config.aiWarning?.title || "AI 생성 컨텐츠 안내"}
                    </h3>
                    <p className="text-yellow-700 text-sm">
                        {config.aiWarning?.description || "본 퀴즈의 모든 문제와 해설은 AI가 생성한 컨텐츠입니다. 정확한 정보를 위해 추가적인 검증이 필요할 수 있습니다. 본 컨텐츠는 참고용으로만 사용하시기 바랍니다."}
                        {config.aiWarning?.additionalInfo && (
                            <span className="block mt-2">{config.aiWarning.additionalInfo}</span>
                        )}
                    </p>
                </div>
                <DifficultySelector
                    selectedDifficulty={selectedDifficulty}
                    onSelect={onDifficultySelect}
                />
                <div className="relative mt-8">
                    <LoadingButton
                        onClick={onStart}
                        disabled={isLoading || !selectedDifficulty}
                        isLoading={isLoading}
                        text={config.startButtonText}
                    />
                </div>
                {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
        </div>
    );
} 