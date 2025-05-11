import React from 'react';

interface LocalOXQuizLoadingProps {
    message: string;
    onReset: () => void;
}

export default function LocalOXQuizLoading({ message, onReset }: LocalOXQuizLoadingProps) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
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
} 