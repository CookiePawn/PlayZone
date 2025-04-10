import React from 'react';
import { Difficulty } from '../../models/OXQuiz';
import LoadingButton from './LoadingButton';
import DifficultySelector from './DifficultySelector';

interface IntroPageProps {
    selectedDifficulty: Difficulty | null;
    isLoading: boolean;
    error: string | null;
    onDifficultySelect: (difficulty: Difficulty) => void;
    onStartQuiz: () => void;
    totalQuestions: number;
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
}

const IntroPage: React.FC<IntroPageProps> = ({
    selectedDifficulty,
    isLoading,
    error,
    onDifficultySelect,
    onStartQuiz,
    title,
    description,
    subtitle,
    highlightText,
    features,
    startButtonText
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8 text-center">
            <div className="bg-white p-8 md:p-12 rounded-lg border border-gray-200 max-w-2xl w-full">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>
                <p className="text-lg md:text-xl mb-4">
                    {description}
                </p>
                <p className="text-gray-600 mb-4">
                    {subtitle}
                    <br />
                    <span className="block mt-2 font-semibold text-purple-600">{highlightText}</span>
                </p>
                <div className="text-left text-gray-500 text-sm mb-8 space-y-2 bg-gray-50 p-4 rounded-md border">
                    <p>⏱️ {features.time}</p>
                    <p>🤖 {features.aiExplanation}</p>
                    <p>🎯 {features.goal}</p>
                </div>
                <DifficultySelector
                    selectedDifficulty={selectedDifficulty}
                    onSelect={onDifficultySelect}
                />
                <div className="relative mt-8">
                    <LoadingButton
                        onClick={onStartQuiz}
                        disabled={isLoading || !selectedDifficulty}
                        isLoading={isLoading}
                        text={startButtonText}
                    />
                </div>
                {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
        </div>
    );
};

export default IntroPage; 