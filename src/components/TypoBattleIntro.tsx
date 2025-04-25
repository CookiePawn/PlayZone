import React from 'react';

interface TypoBattleConfig {
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
}

interface TypoBattleIntroProps {
    config: TypoBattleConfig;
    onStart: () => void;
}

export default function TypoBattleIntro({ config, onStart }: TypoBattleIntroProps) {
    return (
        <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <h1 className="text-3xl font-bold text-purple-600 mb-4">{config.title}</h1>
            <p className="text-gray-600 mb-6">{config.description}</p>
            <p className="text-gray-700 mb-8">{config.subtitle}</p>
            
            <div className="bg-purple-50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-purple-700 mb-4">{config.highlightText}</h2>
                <div className="space-y-2 text-left">
                    <p className="text-gray-700">⏱️ {config.features.time}</p>
                    <p className="text-gray-700">🤖 {config.features.aiExplanation}</p>
                    <p className="text-gray-700">🎯 {config.features.goal}</p>
                </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-lg font-semibold text-yellow-700 mb-2">{config.aiWarning.title}</h3>
                <p className="text-gray-700">{config.aiWarning.description}</p>
                {config.aiWarning.additionalInfo && (
                    <p className="text-gray-700 mt-2">{config.aiWarning.additionalInfo}</p>
                )}
            </div>

            <button
                onClick={onStart}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
                {config.startButtonText}
            </button>
        </div>
    );
} 