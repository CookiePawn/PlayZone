'use client';

import React from 'react';
import { useMCQuiz } from '@/hooks/useMCQuiz';
import MCQuizIntro from '@/components/MCQuizLayout/MCQuizIntro';
import MCQuizQuestion from '@/components/MCQuizLayout/MCQuizQuestion';
import MCQuizResult from '@/components/MCQuizLayout/MCQuizResult';
import ErrorPage from '@/components/OXQuixLayout/ErrorPage';

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

const easyPrompt = `
    다음 형식으로 가짜 선택지 구별 퀴즈 10문제를 생성해주세요:
    {
        "questions": [
            {
                "question": "다음 중 실제로 존재하는 제도/사실은 무엇일까요?",
                "options": ["보기1", "보기2", "보기3"],
                "correctAnswer": 0,
                "explanation": "해설"
            }
        ]
    }
    
    요구사항:
    1. 각 문제는 3개의 선택지로 구성 (2개는 가짜, 1개는 진짜)
    2. 중간 난이도로 구성 (일반적인 상식 수준)
    3. 가짜 선택지는 그럴듯하게 작성
    4. 해설은 간단명료하게 작성
    5. 응답은 반드시 JSON 형식으로만 제공
    6. JSON 형식 외의 추가 텍스트는 포함하지 않음
    7. 모든 필드(question, options, correctAnswer, explanation)는 반드시 포함
    8. correctAnswer는 0부터 2 사이의 숫자로만 표시
    9. options 배열은 반드시 3개의 보기를 포함
`;

const hardPrompt = `
    다음 형식으로 가짜 선택지 구별 퀴즈 10문제를 생성해주세요:
    {
        "questions": [
            {
                "question": "다음 중 실제로 존재하는 제도/사실은 무엇일까요?",
                "options": ["보기1", "보기2", "보기3"],
                "correctAnswer": 0,
                "explanation": "해설"
            }
        ]
    }
    
    요구사항:
    1. 각 문제는 3개의 선택지로 구성 (2개는 가짜, 1개는 진짜)
    2. 어려운 난이도로 구성 (전문적인 지식 수준)
    3. 가짜 선택지는 매우 그럴듯하게 작성
    4. 해설은 자세하고 전문적으로 작성
    5. 응답은 반드시 JSON 형식으로만 제공
    6. JSON 형식 외의 추가 텍스트는 포함하지 않음
    7. 모든 필드(question, options, correctAnswer, explanation)는 반드시 포함
    8. correctAnswer는 0부터 2 사이의 숫자로만 표시
    9. options 배열은 반드시 3개의 보기를 포함
`;

export default function FakeOptionsQuizPage() {
    const {
        currentQuestionIndex,
        score,
        selectedAnswer,
        showResult,
        showIntro,
        isLoading,
        error,
        selectedDifficulty,
        validQuestions,
        isQuizFinished,
        currentQuestion,
        percentile,
        handleStartQuiz,
        handleDifficultySelect,
        handleAnswer,
        handleNextQuestion,
        handleResetQuiz,
    } = useMCQuiz({
        easyPrompt,
        hardPrompt,
        numberOfQuestions: 10,
    });

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
                <ErrorPage error={error} onReset={handleResetQuiz} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                {showIntro ? (
                    <MCQuizIntro
                        config={fakeOptionsQuizConfig}
                        selectedDifficulty={selectedDifficulty}
                        onDifficultySelect={handleDifficultySelect}
                        onStart={handleStartQuiz}
                        isLoading={isLoading}
                        error={error}
                    />
                ) : isQuizFinished ? (
                    <MCQuizResult
                        score={score}
                        totalQuestions={validQuestions.length}
                        percentile={percentile ?? 0}
                        onReset={handleResetQuiz}
                    />
                ) : (
                    <MCQuizQuestion
                        question={currentQuestion}
                        selectedAnswer={selectedAnswer}
                        showResult={showResult}
                        onAnswer={handleAnswer}
                        onNext={handleNextQuestion}
                        currentIndex={currentQuestionIndex}
                        totalQuestions={validQuestions.length}
                        score={score}
                    />
                )}
            </div>
        </div>
    );
} 