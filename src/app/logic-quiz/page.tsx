'use client';

import React from 'react';
import { useLocalMCQuiz } from '@/hooks/useLocalMCQuiz';
import MCQuizIntro from '@/components/MCQuizLayout/MCQuizIntro';
import LocalMCQuizQuestion from '@/components/MCQuizLayout/LocalMCQuizQuestion';
import LocalMCQuizResult from '@/components/MCQuizLayout/LocalMCQuizResult';
import easyQuestions from './easy.json';
import hardQuestions from './hard.json';

const logicQuizConfig = {
    title: '🧠 추론 실력 진단 퀴즈',
    description: '논리적 관계를 파악하고 다음 단계를 추론해보세요!',
    subtitle: '당신의 추론 능력을 테스트해보세요!',
    highlightText: '다양한 논리적 관계를 분석해보세요!',
    features: {
        time: '약 5분',
        aiExplanation: 'AI가 생성한 논리 추론 문제',
        goal: '논리적 사고력과 추론 능력 향상'
    },
    startButtonText: '퀴즈 시작하기',
    aiWarning: {
        title: 'AI 생성 컨텐츠 안내',
        description: '본 퀴즈의 모든 문제와 해설은 AI가 생성한 컨텐츠입니다. 정확한 정보를 위해 추가적인 검증이 필요할 수 있습니다. 본 컨텐츠는 참고용으로만 사용하시기 바랍니다.',
        additionalInfo: ''
    }
};

interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    'correct correctAnswer'?: number;
}

export default function LogicQuizPage() {
    const {
        currentQuestionIndex,
        score,
        selectedAnswer,
        showResult,
        showIntro,
        selectedDifficulty,
        validQuestions,
        isQuizFinished,
        currentQuestion,
        handleStartQuiz,
        handleDifficultySelect,
        handleAnswer,
        handleNextQuestion,
        handleResetQuiz,
        handleShowExplanation,
    } = useLocalMCQuiz({
        easyQuestions: (easyQuestions.questions as Question[]).map((q, i) => ({ 
            ...q, 
            id: i + 1,
            correctAnswer: q.correctAnswer ?? q['correct correctAnswer']
        })),
        hardQuestions: (hardQuestions.questions as Question[]).map((q, i) => ({ 
            ...q, 
            id: i + 1,
            correctAnswer: q.correctAnswer ?? q['correct correctAnswer']
        })),
        numberOfQuestions: 20,
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4">
                {showIntro ? (
                    <MCQuizIntro
                        config={logicQuizConfig}
                        selectedDifficulty={selectedDifficulty}
                        onDifficultySelect={handleDifficultySelect}
                        onStart={handleStartQuiz}
                        isLoading={false}
                        error={null}
                    />
                ) : isQuizFinished ? (
                    <LocalMCQuizResult
                        score={score}
                        totalQuestions={validQuestions.length}
                        onReset={handleResetQuiz}
                        quizTitle={logicQuizConfig.title}
                        image="logic.jpg"
                    />
                ) : (
                    <div className="space-y-8">
                        <LocalMCQuizQuestion
                            question={currentQuestion}
                            selectedAnswer={selectedAnswer}
                            showResult={showResult}
                            showExplanation={showResult}
                            onAnswer={handleAnswer}
                            onShowExplanation={handleShowExplanation}
                            onNext={handleNextQuestion}
                            currentIndex={currentQuestionIndex}
                            totalQuestions={validQuestions.length}
                            score={score}
                        />
                    </div>
                )}
            </div>
        </div>
    );
} 