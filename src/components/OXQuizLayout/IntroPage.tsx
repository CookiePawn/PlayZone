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
    aiWarning?: {
        title?: string;
        description: string;
        additionalInfo?: string;
    };
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
    startButtonText,
    aiWarning = {
        title: "AI 생성 컨텐츠 안내",
        description: "본 퀴즈의 모든 문제와 해설은 AI가 생성한 컨텐츠입니다. 정확한 정보를 위해 추가적인 검증이 필요할 수 있습니다. 본 컨텐츠는 참고용으로만 사용하시기 바랍니다.",
        additionalInfo: ""
    }
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
                <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-left">
                    <h3 className="text-yellow-800 font-semibold mb-2 flex items-center">
                        <span className="mr-2">⚠️</span>
                        {aiWarning.title}
                    </h3>
                    <p className="text-yellow-700 text-sm">
                        {aiWarning.description}
                        {aiWarning.additionalInfo && (
                            <span className="block mt-2">{aiWarning.additionalInfo}</span>
                        )}
                    </p>
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