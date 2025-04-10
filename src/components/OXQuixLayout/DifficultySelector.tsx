import React from 'react';
import { Difficulty } from '../../models/OXQuiz';

interface DifficultySelectorProps {
    selectedDifficulty: Difficulty | null;
    onSelect: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
    selectedDifficulty,
    onSelect
}) => {
    return (
        <div className="mb-8">
            <p className="text-lg font-semibold mb-4">난이도를 선택하세요</p>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => onSelect('easy')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        selectedDifficulty === 'easy'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    쉬움
                </button>
                <button
                    onClick={() => onSelect('hard')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        selectedDifficulty === 'hard'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    어려움
                </button>
            </div>
        </div>
    );
};

export default DifficultySelector; 