'use client';

import React, { useState, useEffect } from 'react';
import { generateContent } from '@/services/gemini';
import Link from 'next/link';

const prompt = `
    다음 상황에 대한 사용자의 선택에 따른 결과를 예측해주세요. 반드시 반환값은 JSON 형식이어야 합니다.
    
    상황 생성 시 주의사항:
    1. 도덕적, 윤리적 딜레마가 있는 극단적인 상황을 제시
    2. 선택의 결과가 명확하지 않은 복잡한 상황
    3. 개인적, 사회적, 직업적 차원에서 중대한 영향을 미칠 수 있는 상황
    4. 감정적으로 어려운 결정을 요구하는 상황
    
    예시 응답:
    {
        "situation": "당신은 의료진으로서, 한정된 수의 생명을 구할 수 있는 치료제를 가지고 있습니다. 한쪽에는 5명의 중증 환자가, 다른 쪽에는 1명의 어린 아이가 있습니다. 누구를 먼저 치료해야 할까요?",
        "prediction": "당신의 선택으로 인해 생명을 구할 수 있지만, 동시에 다른 생명을 잃게 될 것입니다. 이 선택은 당신의 인생에 깊은 상처를 남길 것입니다.",
        "logic": "이 선택은 다음과 같은 논리적 흐름을 가집니다: 1) 어떤 선택을 하든 생명을 잃게 됨 2) 선택의 결과는 영원히 당신의 양심에 남을 것 3) 이 경험은 당신의 가치관과 직업관에 큰 영향을 미칠 것",
        "comparison": "이러한 상황에서는 완벽한 선택은 없습니다. 당신의 선택은 어쩔 수 없는 상황에서의 최선의 선택이 될 것입니다."
    }
    
    요구사항:
    1. situation: 극단적이고 도전적인 상황을 구체적으로 설명
    2. prediction: 선택에 따른 예상 결과를 상세히 설명
    3. logic: 예측의 근거가 되는 논리적 흐름을 단계별로 설명
    4. comparison: 선택의 장단점을 비교 분석
    5. 응답은 반드시 JSON 형식으로만 제공
    6. JSON 형식 외의 추가 텍스트는 포함하지 않음
    7. 상황에 대한 선택지는 절대 주어지지 않음. 사용자가 자유롭게 선택해야 함.
`;

export default function ChoicePredictionPage() {
    const [situation, setSituation] = useState<string | null>(null);
    const [userChoice, setUserChoice] = useState('');
    const [result, setResult] = useState<{
        situation: string;
        prediction: string;
        logic: string;
        comparison: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // 페이지 로드 시 새로운 상황 생성
        generateNewSituation();
    }, []);

    const generateNewSituation = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        setUserChoice('');

        try {
            const response = await generateContent(prompt);
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('JSON 형식의 응답을 찾을 수 없습니다.');
            }

            const parsedResponse = JSON.parse(jsonMatch[0]);
            setSituation(parsedResponse.situation);
        } catch (err) {
            console.error('Error details:', err);
            setError('상황 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userChoice.trim() || !situation) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await generateContent(
                prompt + 
                `\n현재 상황: "${situation}"` +
                `\n사용자의 선택: "${userChoice}"`
            );
            
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('JSON 형식의 응답을 찾을 수 없습니다.');
            }

            const parsedResponse = JSON.parse(jsonMatch[0]);
            setResult(parsedResponse);
        } catch (err) {
            console.error('Error details:', err);
            setError('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">선택 후 결과 예측 테스트 🔮</h1>
                    </div>
                    <p className="text-gray-600 mb-6">
                        AI가 제시하는 상황에서 당신의 선택에 따른 결과를 예측해드립니다.
                        <br />
                        <span className="text-sm text-gray-500">
                            새로운 상황을 받아보고, 당신의 선택을 자유롭게 입력해보세요.
                        </span>
                    </p>

                    {isLoading && !situation ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-purple-50 rounded-lg animate-pulse">
                                <div className="h-4 bg-purple-200 rounded w-1/4 mb-2"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-purple-200 rounded w-full"></div>
                                    <div className="h-4 bg-purple-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-purple-200 rounded w-4/6"></div>
                                </div>
                            </div>
                            <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
                            <div className="flex gap-4">
                                <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {situation && (
                                <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                                    <h3 className="font-semibold text-purple-800 mb-2">현재 상황</h3>
                                    <p className="text-purple-700">{situation}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <textarea
                                        value={userChoice}
                                        onChange={(e) => setUserChoice(e.target.value)}
                                        placeholder="이 상황에서 당신의 선택은 무엇인가요? 자유롭게 입력해주세요."
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        rows={4}
                                        maxLength={500}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={generateNewSituation}
                                        disabled={isLoading}
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        새로운 상황 받기
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading || !userChoice.trim()}
                                        className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? '분석 중...' : '결과 예측하기'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className="mt-6 space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">예상 결과</h3>
                                <p className="text-gray-700">{result.prediction}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">예측의 근거</h3>
                                <p className="text-gray-700">{result.logic}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">선택 분석</h3>
                                <p className="text-gray-700">{result.comparison}</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-6">
                        <Link 
                            href="/"
                            className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                        >
                            홈으로 가기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 