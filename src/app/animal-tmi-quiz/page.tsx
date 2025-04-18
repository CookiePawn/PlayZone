'use client';

import React, { useState } from 'react';
import { useMCQuiz } from '@/hooks/useMCQuiz';
import MCQuizIntro from '@/components/MCQuizLayout/MCQuizIntro';
import MCQuizQuestion from '@/components/MCQuizLayout/MCQuizQuestion';
import MCQuizResult from '@/components/MCQuizLayout/MCQuizResult';
import ErrorPage from '@/components/OXQuixLayout/ErrorPage';
import LoadingButton from '@/components/OXQuixLayout/LoadingButton';

const animalTmiQuizConfig = {
    title: '🦁 동물 TMI 퀴즈',
    description: '동물들의 놀라운 사실과 흥미로운 TMI를 테스트해보세요!',
    subtitle: '동물들의 놀라운 사실들을 알아보세요!',
    highlightText: '동물들의 신비로운 세계를 탐험해보세요!',
    features: {
        time: '약 5분',
        aiExplanation: 'AI가 생성한 동물 관련 TMI',
        goal: '동물에 대한 지식 향상'
    },
    startButtonText: '퀴즈 시작하기',
    aiWarning: {
        title: 'AI 생성 컨텐츠 안내',
        description: '본 퀴즈의 모든 문제와 해설은 AI가 생성한 컨텐츠입니다. 정확한 정보를 위해 추가적인 검증이 필요할 수 있습니다. 본 컨텐츠는 참고용으로만 사용하시기 바랍니다.',
        additionalInfo: ''
    }
};

const easyPrompt = `
    다음 형식으로 동물 TMI 퀴즈 5문제를 생성해주세요:
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
    1. 일반적인 동물들의 흥미로운 사실 위주
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
    다음 형식으로 동물 TMI 퀴즈 5문제를 생성해주세요:
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
    1. 잘 알려지지 않은 동물들의 흥미로운 사실 위주
    2. 어려운 난이도로 구성
    3. 각 보기는 명확하고 구분되게 작성
    4. 해설은 자세하고 전문적으로 작성
    5. 응답은 반드시 JSON 형식으로만 제공
    6. JSON 형식 외의 추가 텍스트는 포함하지 않음
    7. 모든 필드(question, options, correctAnswer, explanation)는 반드시 포함
    8. correctAnswer는 0부터 3 사이의 숫자로만 표시
    9. options 배열은 반드시 4개의 보기를 포함
`;

export default function AnimalTmiQuizPage() {
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
                        config={animalTmiQuizConfig}
                        selectedDifficulty={selectedDifficulty}
                        onDifficultySelect={handleDifficultySelect}
                        onStart={handleStartQuiz}
                        isLoading={isLoading}
                    />
                ) : isQuizFinished ? (
                    <MCQuizResult
                        score={score}
                        totalQuestions={validQuestions.length}
                        percentile={percentile}
                        onReset={handleResetQuiz}
                    />
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-600">
                                문제 {currentQuestionIndex + 1} / {validQuestions.length}
                            </p>
                            <p className="text-gray-600">점수: {score}</p>
                        </div>

                        <MCQuizQuestion
                            question={currentQuestion}
                            selectedAnswer={selectedAnswer}
                            showResult={showResult}
                            onAnswer={handleAnswer}
                            onNext={handleNextQuestion}
                            currentIndex={currentQuestionIndex}
                            totalQuestions={validQuestions.length}
                        />

                        {showResult && (
                            <button
                                onClick={handleNextQuestion}
                                className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                {currentQuestionIndex + 1 === validQuestions.length
                                    ? '결과 보기'
                                    : '다음 문제'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 