import React from 'react';

interface LoadingPageProps {
    message: string;
    onReset?: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ message, onReset }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <p className="text-gray-600 text-lg">{message}</p>
                {onReset && (
                    <button
                        onClick={onReset}
                        className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-colors"
                    >
                        돌아가기
                    </button>
                )}
            </div>
        </div>
    );
};

export default LoadingPage; 