import React from 'react';

interface ErrorPageProps {
    error: string;
    onReset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, onReset }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 text-center">
            <div className="bg-white p-8 rounded-lg border border-red-300 max-w-md w-full">
                <h2 className="text-2xl font-bold text-red-600 mb-4">오류 발생</h2>
                <p className="text-red-700 mb-6">{error}</p>
                <button
                    onClick={onReset}
                    className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-colors"
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
};

export default ErrorPage; 