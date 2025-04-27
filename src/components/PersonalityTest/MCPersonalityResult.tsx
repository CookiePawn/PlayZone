import React from 'react';

interface MCPersonalityResultProps {
    traits: Record<string, number>;
    dominantTraits: string[];
    personalityDescription: string;
    traitPercentages: Record<string, number>;
    onReset: () => void;
}

export default function MCPersonalityResult({
    dominantTraits,
    personalityDescription,
    traitPercentages,
    onReset
}: MCPersonalityResultProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">당신의 성향 분석 결과</h2>
            
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">주요 성향</h3>
                <div className="grid grid-cols-2 gap-4">
                    {dominantTraits.map((trait, index) => (
                        <div key={index} className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-medium">{trait}</p>
                            <p className="text-blue-600 font-bold mt-1">{traitPercentages[trait]}%</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">성향 분포</h3>
                <div className="space-y-2">
                    {Object.entries(traitPercentages).map(([trait, percentage]) => (
                        <div key={trait} className="space-y-1">
                            <div className="flex justify-between">
                                <span>{trait}</span>
                                <span>{percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">성향 설명</h3>
                <p className="text-gray-700">{personalityDescription}</p>
            </div>

            <button
                onClick={onReset}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
                다시 테스트하기
            </button>
        </div>
    );
} 