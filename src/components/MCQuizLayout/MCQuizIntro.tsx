import React from 'react';
import { MCQuizConfig } from '@/models/MCQuiz';
import LoadingButton from '@/components/OXQuixLayout/LoadingButton';

interface MCQuizIntroProps {
    config: MCQuizConfig;
    selectedDifficulty: 'easy' | 'hard' | null;
    onDifficultySelect: (difficulty: 'easy' | 'hard') => void;
    onStart: () => void;
    isLoading: boolean;
}

const MCQuizIntro: React.FC<MCQuizIntroProps> = ({
    config,
    selectedDifficulty,
    onDifficultySelect,
    onStart,
    isLoading
}) => {
    return (
        <div className="bg-white p-8 md:p-12 rounded-lg border border-gray-200 max-w-2xl w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{config.title}</h1>
            <p className="text-lg md:text-xl mb-4 text-center">
                {config.description}
            </p>
            <p className="text-gray-600 mb-4 text-center">
                {config.subtitle}
                <br />
                <span className="block mt-2 font-semibold text-purple-600">{config.highlightText}</span>
            </p>
            <div className="text-gray-500 text-sm mb-8 space-y-2 bg-gray-50 p-4 rounded-md border">
                <p>⏱️ {config.features.time}</p>
                <p>🤖 {config.features.aiExplanation}</p>
                <p>🎯 {config.features.goal}</p>
            </div>
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h3 className="text-yellow-800 font-semibold mb-2">
                    <span className="mr-2">⚠️</span>
                    {config.aiWarning?.title}
                </h3>
                <p className="text-yellow-700 text-sm">
                    {config.aiWarning?.description}
                    {config.aiWarning?.additionalInfo && (
                        <span className="block mt-2">{config.aiWarning.additionalInfo}</span>
                    )}
                </p>
            </div>
            <div className="mb-8">
                <p className="text-lg font-semibold mb-4 text-center">난이도를 선택하세요</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => onDifficultySelect('easy')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                            selectedDifficulty === 'easy'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        쉬움
                    </button>
                    <button
                        onClick={() => onDifficultySelect('hard')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                            selectedDifficulty === 'hard'
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        어려움
                    </button>
                </div>
            </div>
            <div className="relative mt-8 flex justify-center">
                <LoadingButton
                    onClick={onStart}
                    disabled={isLoading || !selectedDifficulty}
                    isLoading={isLoading}
                    text={config.startButtonText}
                />
            </div>
        </div>
    );
};

export default MCQuizIntro; 