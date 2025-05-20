'use client'

import React from 'react';
import { useLocalQuiz } from '@/hooks/useLocalQuiz';
import {
    LocalOXQuizIntro,
    LocalOXQuizQuestion,
    LocalOXQuizResult,
    LocalOXQuizError,
    LocalOXQuizLoading
} from '@/components/OXQuizLayout';

// --- Constants ---
const NUMBER_OF_QUESTIONS = 20; // Total number of questions for the quiz
const TOTAL_QUESTIONS = 20; // Total number of questions for the quiz

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
    } = useLocalQuiz({
        numberOfQuestions: NUMBER_OF_QUESTIONS,
        quizType: 'animal'
    });

    // --- Render Logic ---
    if (showIntro) {
        return (
            <LocalOXQuizIntro
                selectedDifficulty={selectedDifficulty}
                isLoading={isLoading}
                error={error}
                onDifficultySelect={handleDifficultySelect}
                onStart={handleStartQuiz}
                title="🦁 동물 OX 퀴즈"
                description="당신은 동물에 대해 얼마나 알고 있을까?"
                subtitle="OX 하나로 가려지는 당신의 동물 지식 테스트!"
                highlightText="알고 있다고 생각했던 동물의 진실"
                features={{
                    time: `**예상 소요 시간:** 약 3~5분 (문제 수: ${TOTAL_QUESTIONS}개)`,
                    aiExplanation: "**AI 해설:** 각 문제의 정답 여부와 함께 관련 동물학적 사실을 바탕으로 명쾌한 해설을 제공합니다.",
                    goal: "**목표:** 재미있게 동물 상식을 넓히고, 자연의 신비로움을 알아가세요!"
                }}
                startButtonText="시작하기"
            />
        );
    }

    if (error) {
        return <LocalOXQuizError error={error} onReset={handleResetQuiz} />;
    }

    if (isQuizFinished) {
        return (
            <LocalOXQuizResult
                score={score}
                totalQuestions={validQuestions.length}
                onReset={handleResetQuiz}
                isLoading={isLoading}
                quizTitle="동물 OX 퀴즈"
                image="animal-ox.png"
            />
        );
    }

    if (validQuestions.length === 0) {
        return <LocalOXQuizLoading message="퀴즈 데이터를 불러오는 중입니다..." onReset={handleResetQuiz} />;
    }

    if (!currentQuestion) {
        return <LocalOXQuizLoading message="문제를 불러오는 중입니다..." onReset={handleResetQuiz} />;
    }

    return (
        <LocalOXQuizQuestion
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