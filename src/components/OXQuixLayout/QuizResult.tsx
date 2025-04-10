import React from 'react';

interface QuizResultProps {
    score: number;
    totalQuestions: number;
    onReset: () => void;
    isLoading: boolean;
}

const QuizResult: React.FC<QuizResultProps> = ({
    score,
    totalQuestions,
    onReset,
    isLoading
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 w-full max-w-2xl flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">퀴즈 완료! 🎉</h1>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                    <div className="bg-purple-600 h-2.5 rounded-full progress-fill" style={{ width: '100%' }}></div>
                </div>

                <div className="text-center mb-8">
                    <p className="text-xl mb-4">
                        총 <span className="font-bold text-purple-600">{totalQuestions}</span>문제 중
                        <span className="font-bold text-purple-600"> {score}</span>문제를 맞혔습니다!
                    </p>
                    <p className="text-gray-600">
                        정답률: <span className="font-bold text-purple-600">{Math.round((score / totalQuestions) * 100)}%</span>
                    </p>
                </div>

                <button
                    onClick={onReset}
                    disabled={isLoading}
                    className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    다시 시작하기
                </button>
            </div>

            {/* Confetti container */}
            <div className="confetti-container">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="confetti"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animation: `confetti-fall ${Math.random() * 2 + 1}s linear forwards`,
                            animationDelay: `${Math.random() * 2}s`,
                            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                            width: `${Math.random() * 8 + 4}px`,
                            height: `${Math.random() * 8 + 4}px`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuizResult; 