'use client';

import React from 'react';
import { useLocalMCQuiz } from '@/hooks/useLocalMCQuiz';
import MCQuizIntro from '@/components/MCQuizLayout/MCQuizIntro';
import LocalMCQuizQuestion from '@/components/MCQuizLayout/LocalMCQuizQuestion';
import LocalMCQuizResult from '@/components/MCQuizLayout/LocalMCQuizResult';
import easyQuestions from './easy.json';
import hardQuestions from './hard.json';
import { MCQuizQuestion } from '@/models/MCQuiz';

const fakeOptionsQuizConfig = {
    title: '🎭 가짜 선택지 구별 퀴즈',
    description: '3개의 선택지 중 1개만 실제 제도/사실입니다. 여러분의 상식 감별력을 테스트해보세요!',
    subtitle: '진짜와 가짜를 구별하는 능력을 테스트해보세요!',
    highlightText: '상식 감별력이 낮을수록 점수가 낮아집니다!',
    features: {
        time: '약 5분',
        aiExplanation: 'AI가 생성한 가짜/진짜 선택지',
        goal: '상식 감별력 향상'
    },
    startButtonText: '퀴즈 시작하기',
    aiWarning: {
        title: 'AI 생성 컨텐츠 안내',
        description: '본 퀴즈의 모든 문제와 해설은 AI가 생성한 컨텐츠입니다. 정확한 정보를 위해 추가적인 검증이 필요할 수 있습니다. 본 컨텐츠는 참고용으로만 사용하시기 바랍니다.',
        additionalInfo: ''
    }
};

export default function FakeOptionsQuizPage() {
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
        handleShowExplanation,
        handleNextQuestion,
        handleResetQuiz,
    } = useLocalMCQuiz({
        easyQuestions: easyQuestions.questions.map((q, i) => ({ 
            id: i + 1,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation
        } as MCQuizQuestion)),
        hardQuestions: hardQuestions.questions.map((q, i) => ({ 
            id: i + 1,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation
        } as MCQuizQuestion)),
        numberOfQuestions: 20,
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                {showIntro ? (
                    <MCQuizIntro
                        config={fakeOptionsQuizConfig}
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