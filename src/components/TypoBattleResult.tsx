import React from 'react';
import Link from 'next/link';

interface TypoBattleResultProps {
    score: number;
    totalQuestions: number;
    onReset: () => void;
    userName?: string;
    quizTitle: string;
    image?: string;
}

export default function TypoBattleResult({ score, totalQuestions, onReset, userName='익명', quizTitle, image='animal.jpg' }: TypoBattleResultProps) {
    const calculatePercentile = (score: number, totalQuestions: number) => {
        const percentage = (score / totalQuestions) * 100;
        if (percentage >= 95) return 1;
        if (percentage >= 90) return 2;
        if (percentage >= 85) return 3;
        if (percentage >= 80) return 5;
        if (percentage >= 75) return 7;
        if (percentage >= 70) return 10;
        if (percentage >= 65) return 15;
        if (percentage >= 60) return 20;
        if (percentage >= 55) return 25;
        if (percentage >= 50) return 30;
        if (percentage >= 45) return 35;
        if (percentage >= 40) return 40;
        if (percentage >= 35) return 45;
        if (percentage >= 30) return 50;
        if (percentage >= 25) return 60;
        if (percentage >= 20) return 70;
        if (percentage >= 15) return 80;
        if (percentage >= 10) return 85;
        if (percentage >= 5) return 90;
        return 95;
    };

    const getResultMessage = (percentage: number) => {
        if (percentage >= 95) return '🎉 최고의 성적입니다!';
        if (percentage >= 90) return '🎉 정말 훌륭해요!';
        if (percentage >= 85) return '🎉 대단한 성적이에요!';
        if (percentage >= 80) return '🎉 훌륭한 성적입니다!';
        if (percentage >= 75) return '👍 정말 잘했어요!';
        if (percentage >= 70) return '👍 잘했습니다!';
        if (percentage >= 65) return '👍 좋은 성적이에요!';
        if (percentage >= 60) return '👍 잘했어요!';
        if (percentage >= 55) return '😊 괜찮은 성적입니다!';
        if (percentage >= 50) return '😊 보통이에요!';
        if (percentage >= 45) return '😊 조금 더 노력해봐요!';
        if (percentage >= 40) return '😊 다음에는 더 잘할 수 있을 거예요!';
        if (percentage >= 35) return '💪 조금만 더 노력하면 좋은 성적을 낼 수 있어요!';
        if (percentage >= 30) return '💪 다음에는 더 잘할 수 있을 거예요!';
        if (percentage >= 25) return '💪 조금 더 공부해봐요!';
        if (percentage >= 20) return '💪 힘내세요!';
        if (percentage >= 15) return '💪 다음 기회를 노려봐요!';
        if (percentage >= 10) return '💪 포기하지 마세요!';
        if (percentage >= 5) return '💪 처음부터 다시 도전해보세요!';
        return '💪 다시 한번 도전해보세요!';
    };

    const percentile = calculatePercentile(score, totalQuestions);
    const percentage = Math.round((score / totalQuestions) * 100);
    const resultMessage = getResultMessage(percentage);

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/quiz-result?title=${encodeURIComponent(quizTitle)}&percentile=${percentile}&user=${encodeURIComponent(userName)}&image=${encodeURIComponent(image)}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${userName}님의 ${quizTitle} 결과`,
                    text: `${userName}님은 상위 ${percentage}%입니다! 나는 몇퍼일까요?`,
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

    return (
        <div className="bg-white rounded-lg p-8 text-center h-screen flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">게임 종료!</h2>
            
            <div className="mb-8">
                <p className="text-2xl font-semibold text-gray-800 mb-2">
                    최종 점수: {score} / {totalQuestions}
                </p>
                <p className="text-xl text-gray-600">
                    정답률: {percentage}%
                </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">결과 분석</h3>
                <p className="text-gray-700">
                    당신은 상위 {percentile}%에 해당합니다!
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    {resultMessage}
                </p>
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
        </div>
    );
} 