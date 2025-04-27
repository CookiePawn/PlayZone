'use client';

import React, { useState } from 'react';
import { usePersonalityTest } from '@/hooks/usePersonalityTest';
import PersonalityIntro from '@/components/PersonalityTest/PersonalityIntro';
import PersonalityQuestion from '@/components/PersonalityTest/PersonalityQuestion';
import MCPersonalityResult from '@/components/PersonalityTest/MCPersonalityResult';
import ErrorPage from '@/components/OXQuixLayout/ErrorPage';
import personalityQuestions from './personalityQuestions.json';
import { PersonalityQuestions } from '@/types/personalityTest';

const personalityTestConfig = {
    title: '🤔 당신은 어느 쪽?',
    description: '당신의 선택으로 알아보는 성향 테스트! 두 선택지 중 더 자주 하는 행동을 선택해보세요.',
    subtitle: '당신의 선택이 당신을 말해줍니다',
    highlightText: '4가지 주요 성향을 분석합니다!',
    features: {
        time: '약 10분',
        questions: `${personalityQuestions.questions.length}개의 이중선택 질문`,
        analysis: '성향 분석'
    },
    startButtonText: '테스트 시작하기',
    aiWarning: {
        title: '성향 분석 안내',
        description: '본 테스트는 4가지 주요 성향(계획/즉흥, 이성/감성, 내향/외향, 안정/모험)을 기준으로 분석합니다.',
        additionalInfo: '각 질문의 선택에 따라 성향이 결정됩니다.'
    }
};

export default function PersonalityTestPage() {
    const [isStarted, setIsStarted] = useState(false);
    const {
        currentQuestion,
        currentQuestionIndex,
        isFinished,
        result,
        isLoading,
        handleAnswer,
        resetTest
    } = usePersonalityTest((personalityQuestions as PersonalityQuestions).questions);

    const handleStart = () => {
        setIsStarted(true);
    };

    const handleReset = () => {
        setIsStarted(false);
        resetTest();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                {!isStarted ? (
                    <PersonalityIntro
                        config={personalityTestConfig}
                        onStart={handleStart}
                    />
                ) : isFinished && result ? (
                    <MCPersonalityResult
                        traits={result.traits}
                        dominantTraits={result.dominantTraits}
                        personalityDescription={result.personalityDescription}
                        traitPercentages={result.traitPercentages}
                        onReset={handleReset}
                    />
                ) : (
                    <div className="space-y-4">
                        <PersonalityQuestion
                            question={currentQuestion}
                            currentIndex={currentQuestionIndex}
                            totalQuestions={personalityQuestions.questions.length}
                            onAnswer={handleAnswer}
                        />
                    </div>
                )}
            </div>
        </div>
    );
} 