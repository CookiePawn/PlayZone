'use client'

import React from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import {
    IntroPage,
    QuizQuestion,
    QuizResult,
    ErrorPage,
    LoadingPage
} from '@/components/OXQuixLayout';

// --- Constants ---
const NUMBER_OF_QUESTIONS = 10; // Generate 10 questions at a time
const TOTAL_QUESTIONS = 20; // Total number of questions for the quiz

// --- Prompts ---
const EASY_PROMPT = `
    반려동물 관련 OX 퀴즈 ${NUMBER_OF_QUESTIONS}개를 생성해주세요.
    각 문제는 다음 형식의 JSON 객체여야 합니다:
    {
        "id": 숫자,
        "statement": "반려동물 관련 O/X 문장",
        "answer": boolean,
        "explanation": "간단한 설명",
        "legalBasis": "관련 근거"
    }
    ${NUMBER_OF_QUESTIONS}개의 JSON 객체를 배열로 반환하세요.
    다른 텍스트 없이 JSON 배열만 반환하세요.
    
    반드시 실제 존재하는 반려동물 관련 지식에 기반한 문제만 생성하세요.
    허구나 잘못된 정보를 포함하지 마세요.
    모든 설명과 근거는 과학적 연구나 전문가의 의견에 기반해야 합니다.

    문제의 난이도는 일반인이 이해하기 쉬운 수준으로 출제해주세요.
    일상생활에서 자주 접할 수 있는 반려동물 행동이나
    기본적인 반려동물 상식을 테스트하는 문제를 포함해주세요.
    예를 들어 반려동물의 기본적인 행동 해석, 건강 관리, 
    일상적인 돌봄 방법 등에 관한 문제를 출제해주세요.
`;

const HARD_PROMPT = `
    반려동물 관련 OX 퀴즈 ${NUMBER_OF_QUESTIONS}개를 생성해주세요.
    각 문제는 다음 형식의 JSON 객체여야 합니다:
    {
        "id": 숫자,
        "statement": "반려동물 관련 O/X 문장",
        "answer": boolean,
        "explanation": "간단한 설명",
        "legalBasis": "관련 근거"
    }
    ${NUMBER_OF_QUESTIONS}개의 JSON 객체를 배열로 반환하세요.
    다른 텍스트 없이 JSON 배열만 반환하세요.
    
    반드시 실제 존재하는 반려동물 관련 지식에 기반한 문제만 생성하세요.
    허구나 잘못된 정보를 포함하지 마세요.
    모든 설명과 근거는 과학적 연구나 전문가의 의견에 기반해야 합니다.

    문제의 난이도는 반려동물 전문가 수준의 지식이 필요한 수준으로 출제해주세요.
    반려동물 행동학, 심리학, 질병 관리, 응급처치 등 전문적인 내용을 다루어주세요.
    반려동물 훈련사나 수의사들이 도전적으로 느낄 수 있는 수준으로 만들어주세요.
`;

// --- Main Quiz Component ---
const AnimalQuizPage = () => {
    const {
        // State
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

        // Handlers
        handleStartQuiz,
        handleDifficultySelect,
        handleAnswer,
        handleNextQuestion,
        handleResetQuiz,
    } = useQuiz({
        easyPrompt: EASY_PROMPT,
        hardPrompt: HARD_PROMPT,
        numberOfQuestions: NUMBER_OF_QUESTIONS
    });

    // --- Render Logic ---
    if (showIntro) {
        return (
            <IntroPage
                selectedDifficulty={selectedDifficulty}
                isLoading={isLoading}
                error={error}
                onDifficultySelect={handleDifficultySelect}
                onStartQuiz={handleStartQuiz}
                totalQuestions={TOTAL_QUESTIONS}
                title="🐾 반려동물 OX 퀴즈"
                description="당신은 반려동물에 대해 얼마나 알고 있을까?"
                subtitle="OX 하나로 가려지는 당신의 반려동물 지식 테스트!"
                highlightText="알고 있다고 생각했던 반려동물의 진실"
                features={{
                    time: `**예상 소요 시간:** 약 3~5분 (문제 수: ${TOTAL_QUESTIONS}개)`,
                    aiExplanation: "**AI 해설:** 각 문제의 정답 여부와 함께 반려동물 전문가의 의견을 바탕으로 명쾌한 해설을 제공합니다.",
                    goal: "**목표:** 재미있게 반려동물 상식을 넓히고, 더 나은 반려동물 생활을 위한 지식을 얻어가세요!"
                }}
                startButtonText="시작하기"
            />
        );
    }

    if (error) {
        return <ErrorPage error={error} onReset={handleResetQuiz} />;
    }

    if (isQuizFinished) {
        return (
            <QuizResult
                score={score}
                totalQuestions={validQuestions.length}
                onReset={handleResetQuiz}
                percentile={0}
                isLoading={isLoading}
            />
        );
    }

    if (validQuestions.length === 0) {
        return <LoadingPage message="퀴즈 데이터를 불러오는 중입니다..." onReset={handleResetQuiz} />;
    }

    if (!currentQuestion) {
        return <LoadingPage message="문제를 불러오는 중입니다..." onReset={handleResetQuiz} />;
    }

    return (
        <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={validQuestions.length}
        />
    );
};

export default AnimalQuizPage;