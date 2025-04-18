import React from 'react';
import CountUp from 'react-countup';

interface MCQuizResultProps {
    score: number;
    totalQuestions: number;
    percentile: number | null;
    onReset: () => void;
}

const MCQuizResult: React.FC<MCQuizResultProps> = ({
    score,
    totalQuestions,
    percentile,
    onReset,
}) => {
    const correctRate = Math.round((score / totalQuestions) * 100);

    return (
        <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">퀴즈 결과</h2>
            
            <div className="space-y-2">
                <p className="text-gray-600">
                    정답률: <CountUp end={correctRate} duration={2} />%
                </p>
                <p className="text-gray-600">
                    맞춘 문제: {score} / {totalQuestions}
                </p>
                {percentile !== null && (
                    <p className="text-blue-600 font-semibold">
                        당신은 상위 <CountUp end={percentile} duration={2} />%입니다!
                    </p>
                )}
            </div>

            <button
                onClick={onReset}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                다시 풀기
            </button>
        </div>
    );
};

export default MCQuizResult; 