import React from 'react';

interface LocalOXQuizErrorProps {
    error: string;
    onReset: () => void;
}

export default function LocalOXQuizError({ error, onReset }: LocalOXQuizErrorProps) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg border border-gray-200 max-w-md w-full text-center">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">오류가 발생했습니다</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
                <button
                    onClick={onReset}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold"
                >
                    다시 시도
                </button>
            </div>
        </div>
    );
} 