import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/app/home/list';

interface MCPersonalityResultProps {
    traits: Record<string, number>;
    dominantTraits: string[];
    personalityDescription: string;
    traitPercentages: Record<string, number>;
    onReset: () => void;
    userName?: string;
    quizTitle: string;
    image?: string
}

export default function MCPersonalityResult({
    dominantTraits,
    personalityDescription,
    traitPercentages,
    onReset,
    userName = '익명',
    quizTitle,
    image = 'personality.png'
}: MCPersonalityResultProps) {

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/quiz-result?title=${encodeURIComponent(quizTitle)}&user=${encodeURIComponent(userName)}&image=${encodeURIComponent(image)}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${userName}님의 ${quizTitle} 결과`,
                    text: `본인의 성향분석 결과는?`,
                    url: shareUrl,
                });
            } catch (error) {
                console.error('공유하기 실패:', error);
                navigator.clipboard.writeText(shareUrl);
                alert('링크가 클립보드에 복사되었습니다!');
            }
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert('링크가 클립보드에 복사되었습니다!');
        }
    };

    // 랜덤 추천 퀴즈 선택
    const recommendedQuizzes = useMemo(() => {
        const shuffled = [...projects].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4);
    }, []);

    return (
        <div className="bg-white p-6 space-y-6">
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

            <div className="flex justify-center space-x-4">
                <button
                    onClick={onReset}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                    다시 시작하기
                </button>
                <button
                    onClick={handleShare}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
                >
                    결과 공유하기
                </button>
            </div>

            {/* Recommended Quizzes Section */}
            <div className="mt-12 w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">추천 퀴즈</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendedQuizzes.map((quiz) => (
                        <Link
                            href={quiz.href || '#'}
                            key={quiz.id}
                            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-500 transition-colors"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 flex-shrink-0">
                                    {quiz.thumbnail.image ? (
                                        <Image
                                            src={quiz.thumbnail.image}
                                            alt={quiz.title}
                                            className="w-full h-full object-cover rounded-lg"
                                            width={64}
                                            height={64}
                                        />
                                    ) : (
                                        <div className={`w-full h-full rounded-lg bg-gradient-to-br ${quiz.thumbnail.gradient} flex items-center justify-center text-white text-2xl`}>
                                            {quiz.thumbnail.icon}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 line-clamp-1">{quiz.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{quiz.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
} 