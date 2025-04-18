'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface MCQuizResultProps {
    score: number;
    totalQuestions: number;
    percentile: number;
    onReset: () => void;
}

export default function MCQuizResult({
    score,
    totalQuestions,
    percentile,
    onReset
}: MCQuizResultProps) {
    const router = useRouter();
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
            <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">퀴즈 완료!</h1>
            
            <div className="space-y-6 mb-8">
                <div className="text-center">
                    <p className="text-4xl font-bold text-purple-600">{score}점</p>
                    <p className="text-gray-600 mt-2">총 {totalQuestions}문제 중 {score}문제 정답</p>
                </div>

                <div className="text-center">
                    <p className="text-2xl font-semibold text-purple-600">{percentage}%</p>
                    <p className="text-gray-600 mt-2">정답률</p>
                </div>

                <div className="text-center">
                    <p className="text-2xl font-semibold text-purple-600">상위 {percentile}%</p>
                    <p className="text-gray-600 mt-2">전체 사용자 중</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onReset}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                    다시 풀기
                </button>
                <button
                    onClick={() => router.push('/')}
                    className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                    홈으로 가기
                </button>
            </div>
        </div>
    );
} 