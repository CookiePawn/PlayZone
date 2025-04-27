import React from 'react';

interface PersonalityIntroProps {
    config: {
        title: string;
        description: string;
        subtitle: string;
        highlightText: string;
        features: {
            time: string;
            questions: string;
            analysis: string;
        };
        startButtonText: string;
        aiWarning: {
            title: string;
            description: string;
            additionalInfo: string;
        };
    };
    onStart: () => void;
}

export default function PersonalityIntro({ config, onStart }: PersonalityIntroProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center">{config.title}</h1>
            
            <div className="text-center space-y-2">
                <p className="text-lg text-gray-700">{config.description}</p>
                <p className="text-gray-600">{config.subtitle}</p>
                <p className="text-blue-600 font-medium">{config.highlightText}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="font-semibold">소요 시간</p>
                    <p className="text-gray-600">{config.features.time}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="font-semibold">질문 수</p>
                    <p className="text-gray-600">{config.features.questions}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="font-semibold">분석 방식</p>
                    <p className="text-gray-600">{config.features.analysis}</p>
                </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800">{config.aiWarning.title}</h3>
                <p className="text-yellow-700 mt-2">{config.aiWarning.description}</p>
                {config.aiWarning.additionalInfo && (
                    <p className="text-yellow-700 mt-2">{config.aiWarning.additionalInfo}</p>
                )}
            </div>

            <button
                onClick={onStart}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                {config.startButtonText}
            </button>
        </div>
    );
} 