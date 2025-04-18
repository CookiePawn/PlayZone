import React from 'react';
import { useRouter } from 'next/navigation';

interface MCQuizResultProps {
    score: number;
    totalQuestions: number;
    percentile: number;
    onReset: () => void;
}

const MCQuizResult: React.FC<MCQuizResultProps> = ({
    score,
    totalQuestions,
    percentile,
    onReset
}) => {
    const router = useRouter();
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <div className="bg-white p-8 md:p-12 rounded-lg border border-gray-200 max-w-2xl w-full">
            <div className="text-center space-y-8">
                <h2 className="text-3xl font-bold text-purple-600">퀴즈 완료!</h2>
                
                <div className="space-y-4">
                    <p className="text-2xl">
                        최종 점수: <span className="font-bold text-purple-600">{score}</span> / {totalQuestions}
                    </p>
                    <p className="text-xl">
                        정답률: <span className="font-bold text-purple-600">{percentage}%</span>
                    </p>
                    <p className="text-lg text-gray-600">
                        상위 <span className="font-bold text-purple-600">{percentile}%</span>의 성적입니다!
                    </p>
                </div>

                <div className="flex flex-col space-y-4">
                    <button
                        onClick={onReset}
                        className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        다시 풀기
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        홈으로 가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MCQuizResult; 