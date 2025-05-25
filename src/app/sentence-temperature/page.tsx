'use client';

import React, { useState } from 'react';
import { generateContent } from '@/services/gemini';
import Link from 'next/link';

const prompt = `
    다음 문장의 감정 온도를 분석해주세요. 반드시 반환값은 JSON 형식이어야 합니다.
    
    온도 측정 기준:
    1. 0-20℃: 극도로 부정적, 혐오, 증오, 심한 욕설
    2. 21-40℃: 부정적, 불만, 실망, 경멸
    3. 41-60℃: 중립적, 무감정, 관심 없음
    4. 61-80℃: 긍정적, 호의적, 친근함
    5. 81-100℃: 극도로 긍정적, 열정적, 감동적, 진심 어린 감정
    
    주의사항:
    1. 단순한 칭찬은 80℃를 넘지 않음
    2. 진심 어린 감정 표현이 있어야 90℃ 이상 가능
    3. 극도로 긍정적인 표현(100℃)은 매우 드물게 사용
    4. 일상적인 대화는 60-70℃ 범위
    5. 진심과 열정이 담긴 표현만 높은 온도 부여
    
    예시:
    - "정말 싫어" → 25℃
    - "그냥 그러네" → 45℃
    - "좋아요" → 65℃
    - "잘생겼어" → 70℃
    - "당신의 존재가 나에게 큰 행복이에요" → 95℃
    - "당신과 함께한 순간들이 내 인생의 가장 빛나는 순간이었어요. 당신이 있어서 정말 감사하고, 앞으로도 영원히 함께하고 싶어요." → 100℃
    - "당신의 미소가 내 하루의 모든 어려움을 녹여내요. 당신이 있어서 나는 더 나은 사람이 될 수 있었어요. 이 세상에서 가장 소중한 사람이에요." → 100℃
    
    응답 형식:
    {
        "temperature": 32,
        "explanation": "이 문장은 무감정한 상태를 나타냅니다. [그냥]이라는 표현이 무관심이나 냉담함을 보여줍니다."
    }
    
    요구사항:
    1. 응답은 반드시 JSON 형식으로만 제공
    2. JSON 형식 외의 추가 텍스트는 포함하지 않음
    3. temperature는 숫자 타입이어야 함
    4. explanation은 문자열 타입이어야 함
    5. explanation에는 온도가 결정된 이유를 자세히 설명
`;

export default function SentenceTemperaturePage() {
    const [sentence, setSentence] = useState('');
    const [result, setResult] = useState<{ temperature: number; explanation: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sentence.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await generateContent(prompt + `\n분석할 문장: "${sentence}"`);
            console.log('AI Response:', response);
            
            // 응답에서 JSON 부분만 추출
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('JSON 형식의 응답을 찾을 수 없습니다.');
            }

            const jsonString = jsonMatch[0];
            console.log('Extracted JSON:', jsonString);

            const parsedResponse = JSON.parse(jsonString);
            console.log('Parsed Response:', parsedResponse);
            
            // 응답 형식 검증
            if (typeof parsedResponse.temperature !== 'number' || typeof parsedResponse.explanation !== 'string') {
                throw new Error('응답 형식이 올바르지 않습니다.');
            }

            setResult(parsedResponse);
        } catch (err) {
            console.error('Error details:', err);
            setError('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">문장 온도 측정기 🌡️</h1>
                    </div>
                    <p className="text-gray-600 mb-6">
                        문장을 입력하면 AI가 감정의 [온도(℃)]를 수치화해드립니다.
                        <br />
                        <span className="text-sm text-gray-500">
                            0℃: 매우 부정적, 50℃: 중립적, 100℃: 매우 긍정적
                        </span>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <textarea
                                value={sentence}
                                onChange={(e) => setSentence(e.target.value)}
                                placeholder="분석할 문장을 입력하세요..."
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                rows={4}
                                maxLength={500}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !sentence.trim()}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? '분석 중...' : '온도 측정하기'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className="mt-6 space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">온도 분석</h3>
                                <p className="text-gray-700">{result.temperature}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">분석 근거</h3>
                                <p className="text-gray-700">{result.explanation}</p>
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