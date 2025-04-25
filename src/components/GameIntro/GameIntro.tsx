import React from 'react';
import Link from 'next/link';

interface GameInfo {
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

interface GameIntroProps {
    gameInfo: GameInfo;
    onStart: () => void;
}

const GameIntro: React.FC<GameIntroProps> = ({ gameInfo, onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8 text-center">
            <div className="bg-white p-8 md:p-12 rounded-lg border border-gray-200 max-w-2xl w-full">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">{gameInfo.title}</h1>
                <p className="text-lg md:text-xl mb-4">
                    {gameInfo.description}
                </p>
                <p className="text-gray-600 mb-4">
                    {gameInfo.subtitle}
                    <br />
                    <span className="block mt-2 font-semibold text-purple-600">{gameInfo.highlightText}</span>
                </p>
                <div className="text-left text-gray-500 text-sm mb-8 space-y-2 bg-gray-50 p-4 rounded-md border">
                    <p>⏱️ {gameInfo.features.time}</p>
                    <p>🤖 {gameInfo.features.aiExplanation}</p>
                    <p>🎯 {gameInfo.features.goal}</p>
                </div>
                <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-left">
                    <h3 className="text-yellow-800 font-semibold mb-2 flex items-center">
                        <span className="mr-2">⚠️</span>
                        {gameInfo.aiWarning?.title || "AI 생성 컨텐츠 안내"}
                    </h3>
                    <p className="text-yellow-700 text-sm">
                        {gameInfo.aiWarning?.description}
                        {gameInfo.aiWarning?.additionalInfo && (
                            <span className="block mt-2">{gameInfo.aiWarning.additionalInfo}</span>
                        )}
                    </p>
                </div>
                <button
                    onClick={onStart}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 mb-4"
                >
                    {gameInfo.startButtonText}
                </button>
                <Link 
                    href="/"
                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                    홈으로 가기
                </Link>
            </div>
        </div>
    );
};

export default GameIntro; 