'use client';

import React from 'react';
import { useMCQuiz } from '@/hooks/useMCQuiz';
import MCQuizIntro from '@/components/MCQuizLayout/MCQuizIntro';
import MCQuizQuestion from '@/components/MCQuizLayout/MCQuizQuestion';
import MCQuizResult from '@/components/MCQuizLayout/MCQuizResult';
import ErrorPage from '@/components/OXQuixLayout/ErrorPage';

const cultureTmiQuizConfig = {
    title: '🌍 국가별 문화 TMI 퀴즈',
    description: '각 나라별 황당한(하지만 진짜인) 규칙들과 문화적 특이점을 테스트해보세요!',
    subtitle: '세계 각국의 독특한 문화를 알아보세요!',
    highlightText: '세계의 다양한 문화를 탐험해보세요!',
    features: {
        time: '약 5분',
        aiExplanation: 'AI가 생성한 문화 관련 TMI',
        goal: '세계 문화 지식 향상'
    },
    startButtonText: '퀴즈 시작하기',
    aiWarning: {
        title: 'AI 생성 컨텐츠 안내',
        description: '본 퀴즈의 모든 문제와 해설은 AI가 생성한 컨텐츠입니다. 정확한 정보를 위해 추가적인 검증이 필요할 수 있습니다. 본 컨텐츠는 참고용으로만 사용하시기 바랍니다.',
        additionalInfo: ''
    }
};

const easyPrompt = `
    다음 형식으로 국가별 문화 TMI 퀴즈 10문제를 생성해주세요:
    {
        "questions": [
            {
                "question": "질문",
                "options": ["보기1", "보기2", "보기3", "보기4"],
                "correctAnswer": 0,
                "explanation": "해설"
            }
        ]
    }
    
    요구사항:
    // TODO: 중복 제거
    1. 각 나라별 황당한 규칙이나 문화적 특이점 위주
    2. 쉬운 난이도로 구성
    3. 각 보기는 명확하고 구분되게 작성
    4. 해설은 재미있고 흥미롭게 작성
    5. 응답은 반드시 JSON 형식으로만 제공
    6. JSON 형식 외의 추가 텍스트는 포함하지 않음
    7. 모든 필드(question, options, correctAnswer, explanation)는 반드시 포함
    8. correctAnswer는 0부터 3 사이의 숫자로만 표시
    9. options 배열은 반드시 4개의 보기를 포함
`;

const hardPrompt = `
    다음 형식으로 국가별 문화 TMI 퀴즈 10문제를 생성해주세요:
    {
        "questions": [
            {
                "question": "질문",
                "options": ["보기1", "보기2", "보기3", "보기4"],
                "correctAnswer": 0,
                "explanation": "해설"
            }
        ]
    }
    
    요구사항:
    1. 잘 알려지지 않은 나라들의 독특한 문화나 규칙 위주
    2. 어려운 난이도로 구성
    3. 각 보기는 명확하고 구분되게 작성
    4. 해설은 자세하고 전문적으로 작성
    5. 응답은 반드시 JSON 형식으로만 제공
    6. JSON 형식 외의 추가 텍스트는 포함하지 않음
    7. 모든 필드(question, options, correctAnswer, explanation)는 반드시 포함
    8. correctAnswer는 0부터 3 사이의 숫자로만 표시
    9. options 배열은 반드시 4개의 보기를 포함
`;

export default function CultureTmiQuizPage() {
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
                        config={cultureTmiQuizConfig}
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