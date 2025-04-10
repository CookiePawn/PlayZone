import React from 'react';

interface LoadingButtonProps {
    onClick: () => void;
    disabled: boolean;
    isLoading: boolean;
    text: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
    onClick,
    disabled,
    isLoading,
    text
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full max-w-xs px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden`}
        >
            <span className="relative z-10">{isLoading ? '로딩 중...' : text}</span>
            {isLoading && (
                <div className="absolute inset-0 bg-purple-700 loading-fill"></div>
            )}
        </button>
    );
};

export default LoadingButton; 