'use client';

import React from 'react';
import { useMCQuiz } from '@/hooks/useMCQuiz';
import MCQuizIntro from '@/components/MCQuizLayout/MCQuizIntro';
import MCQuizQuestion from '@/components/MCQuizLayout/MCQuizQuestion';
import MCQuizResult from '@/components/MCQuizLayout/MCQuizResult';
import ErrorPage from '@/components/OXQuixLayout/ErrorPage';

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

const easyPrompt = `
    다음 형식으로 추론 실력 진단 퀴즈 10문제를 생성해주세요:
    {
        "questions": [
            {
                "question": "다음 관계를 분석하고 ?에 들어갈 것을 추론하세요:\nA → B: 고양이는 포유류이다.\nB → C: 포유류는 척추동물이다.\nC → ?",
                "options": ["보기1", "보기2", "보기3", "보기4"],
                "correctAnswer": 0,
                "explanation": "해설"
            }
        ]
    }
    
    요구사항:
    1. 간단한 논리적 관계(반의어, 동의어, 상하위 관계 등)를 사용
    2. 쉬운 난이도로 구성
    3. 각 보기는 명확하고 구분되게 작성
    4. 해설은 이해하기 쉽게 작성
    5. 응답은 반드시 JSON 형식으로만 제공
    6. JSON 형식 외의 추가 텍스트는 포함하지 않음
    7. 모든 필드(question, options, correctAnswer, explanation)는 반드시 포함
    8. correctAnswer는 0부터 3 사이의 숫자로만 표시
    9. options 배열은 반드시 4개의 보기를 포함
    10. 문제 유형을 명시적으로 표시 (예: 반의어, 동의어, 상하위 관계 등)
`;

const hardPrompt = `
    당신은 사용자 사고력 측정을 위한 웹 콘텐츠에 사용될 "추론 실력 진단기" 문제를 만드는 AI입니다.
    다음 형식으로 추론 실력 진단 퀴즈 10문제를 생성해주세요:
    {
        "questions": [
            {
                "question": "다음 관계를 분석하고 ?에 들어갈 것을 추론하세요:\n
                A → B: 고양이는 포유류이다.\n
                B → C: 포유류는 척추동물이다.\n
                C → D: 척추동물은 포유류이다.\n
                D → E: 포유류는 척추동물이다.\n
                E → ?",
                "options": ["보기1", "보기2", "보기3", "보기4"],
                "correctAnswer": 0,
                "explanation": "해설"
            }
        ]
    }

    문제 형식:
    - 5단계 논리 추론: A → B → C → D → E
    - 마지막 단계에서 “E → ?” 형식의 질문을 제시해야 하며, 정답도 함께 제공해야 합니다.
    - 논리적으로 타당하고, 연역적/귀납적 사고를 요하는 문제를 만들어야 합니다.
    - 문제의 주제는 철학, 사회, 과학, 시스템, 언어, 인간 심리 등 고차 사고를 유도하는 주제여야 합니다.
    - 정답은 명확하게 1개이며, 논리적 이유도 설명해야 합니다.

    예시 유형:
    - 철학: "개념 정의 → 경계 형성 → 모호성 발생 → 의사소통 오류 → ?"
    - 사회: "시스템 → 규칙 → 예측성 → 안정성 → ?"
    - 과학: "관찰 → 가설 → 실험 → 검증 → ?"

    요구사항:
    1. 복잡한 논리적 관계(인과관계, 시간적 순서, 공간적 관계 등)를 사용
    2. 어려운 난이도로 구성
    3. 각 보기는 명확하고 구분되게 작성
    4. 해설은 자세하고 전문적으로 작성
    5. 응답은 반드시 JSON 형식으로만 제공
    6. JSON 형식 외의 추가 텍스트는 포함하지 않음
    7. 모든 필드(question, options, correctAnswer, explanation)는 반드시 포함
    8. correctAnswer는 0부터 3 사이의 숫자로만 표시
    9. options 배열은 반드시 4개의 보기를 포함
    10. 문제 유형을 명시적으로 표시 (예: 인과관계, 시간적 순서, 공간적 관계 등)
`;

export default function LogicQuizPage() {
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
                        config={logicQuizConfig}
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
                    <div className="space-y-8">
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
                    </div>
                )}
            </div>
        </div>
    );
} 