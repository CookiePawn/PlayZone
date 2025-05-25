'use client';

import { useTypoBattle } from '@/hooks/useTypoBattle';
import TypoBattleIntro from '@/components/TypoBattleIntro';
import TypoBattleQuestion from '@/components/TypoBattleQuestion';
import TypoBattleResult from '@/components/TypoBattleResult';

const gameConfig = {
    title: '✏️ 오타 찾기 배틀',
    description: '문장 속에 숨겨진 오타를 찾아보세요!',
    subtitle: '문장 속에 숨겨진 오타를 찾아보세요!',
    highlightText: '5초 안에 오타를 찾아라!',
    features: {
        time: '약 5분',
        aiExplanation: 'AI가 생성한 오타 문제',
        goal: '오타 찾기 능력 향상'
    },
    startButtonText: '게임 시작하기',
    aiWarning: {
        title: 'AI 생성 컨텐츠 안내',
        description: '본 게임의 모든 문제와 해설은 AI가 생성한 컨텐츠입니다. 정확한 정보를 위해 추가적인 검증이 필요할 수 있습니다. 본 컨텐츠는 참고용으로만 사용하시기 바랍니다.',
        additionalInfo: ''
    }
};

export default function TypoBattlePage() {
    const {
        gameState,
        currentQuestion,
        score,
        mistakes,
        userAnswer,
        showResult,
        showExplanation,
        timeLeft,
        isTimeUp,
        startGame,
        handleAnswer,
        nextQuestion,
        resetGame,
        currentQuestionIndex,
        setUserAnswer
    } = useTypoBattle();

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {gameState === 'intro' && (
                    <TypoBattleIntro
                        config={gameConfig}
                        onStart={startGame}
                    />
                )}
                {gameState === 'question' && currentQuestion && (
                    <TypoBattleQuestion
                        question={currentQuestion}
                        userAnswer={userAnswer}
                        setUserAnswer={setUserAnswer}
                        showResult={showResult}
                        showExplanation={showExplanation}
                        timeLeft={timeLeft}
                        isTimeUp={isTimeUp}
                        onAnswer={handleAnswer}
                        onNext={nextQuestion}
                        mistakes={mistakes}
                    />
                )}
                {gameState === 'result' && (
                    <TypoBattleResult
                        score={score}
                        totalQuestions={currentQuestionIndex + 1}
                        onReset={resetGame}
                        userName='익명'
                        quizTitle={gameConfig.title}
                        image='typo.png'
                    />
                )}
            </div>
        </div>
    );
} 