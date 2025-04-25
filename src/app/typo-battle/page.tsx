'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import prompts from './prompt.json';
import GameIntro from '@/components/GameIntro/GameIntro';

const gameInfo = {
    title: "오타 찾기 배틀 🎯",
    description: "한국어 문장에서 오타를 찾는 게임입니다.",
    subtitle: "제한시간 5초 동안 문장을 보고 오타를 찾아보세요!",
    highlightText: "목숨이 0이 되면 게임 오버!",
    features: {
        time: "제한시간: 5초",
        aiExplanation: "AI가 생성한 다양한 문장들",
        goal: "목표: 최대한 많은 오타 찾기"
    },
    startButtonText: "게임 시작하기",
    aiWarning: {
        title: "AI 생성 컨텐츠 안내",
        description: "본 게임의 모든 문장은 AI가 생성한 컨텐츠입니다. 정확한 정보를 위해 추가적인 검증이 필요할 수 있습니다. 본 컨텐츠는 참고용으로만 사용하시기 바랍니다."
    }
};

export default function TypoBattlePage() {
    const [currentSentence, setCurrentSentence] = useState<string>('');
    const [currentTypo, setCurrentTypo] = useState<string>('');
    const [currentCorrect, setCurrentCorrect] = useState<string>('');
    const [userAnswer, setUserAnswer] = useState('');
    const [showSentence, setShowSentence] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    const [round, setRound] = useState(1);
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(5);
    const [questions, setQuestions] = useState<Array<{
        sentence: string;
        typo: string;
        correct: string;
    }>>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showExplanation, setShowExplanation] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized && !showExplanation) {
            initializeGame();
        }
    }, [showExplanation, isInitialized]);

    useEffect(() => {
        if (isInitialized && !gameOver) {
            generateNewSentence();
        }
    }, [round, isInitialized, gameOver]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showSentence && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setShowSentence(false);
            setShowInput(true);
        }
        return () => clearInterval(timer);
    }, [showSentence, countdown]);

    const initializeGame = () => {
        const shuffled = [...prompts].sort(() => 0.5 - Math.random());
        setQuestions(shuffled);
        setIsInitialized(true);
    };

    const generateNewSentence = () => {
        setShowSentence(false);
        setShowInput(false);
        setUserAnswer('');
        setMessage('');
        setCountdown(5);

        setCurrentSentence(questions[currentIndex].sentence);
        setCurrentTypo(questions[currentIndex].typo);
        setCurrentCorrect(questions[currentIndex].correct);
        setShowSentence(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (userAnswer.trim() === currentTypo) {
            setScore(score + 1);
            setMessage(`정답입니다! 🎉 (올바른 표현: "${currentCorrect}")`);
        } else {
            setLives(lives - 1);
            setMessage(`틀렸습니다. 정답은 "${currentTypo}" 입니다. (올바른 표현: "${currentCorrect}")`);
            
            if (lives <= 1) {
                setGameOver(true);
            }
        }

        setTimeout(() => {
            if (currentIndex < questions.length - 1 && !gameOver) {
                setCurrentIndex(currentIndex + 1);
                setCurrentSentence(questions[currentIndex + 1].sentence);
                setCurrentTypo(questions[currentIndex + 1].typo);
                setCurrentCorrect(questions[currentIndex + 1].correct);
                setShowSentence(true);
                setShowInput(false);
                setUserAnswer('');
                setMessage('');
                setCountdown(5);
                setRound(round + 1);
            }
        }, 2000);
    };

    if (showExplanation) {
        return <GameIntro gameInfo={gameInfo} onStart={() => setShowExplanation(false)} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">{gameInfo.title}</h1>
                        <div className="text-lg font-semibold">
                            점수: {score}&nbsp;&nbsp;&nbsp;&nbsp;목숨: {lives}/5
                        </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                        {gameInfo.subtitle}
                        <br />
                        <span className="text-sm text-gray-500">
                            {round}번째 문제
                        </span>
                    </p>

                    {!gameOver ? (
                        <div className="space-y-6">
                            {showSentence && (
                                <div className="space-y-4">
                                    <div className="text-center p-8 bg-purple-50 rounded-lg">
                                        <p className="text-xl font-medium text-purple-800">{currentSentence}</p>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
                                            style={{ width: `${(countdown / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-center text-sm text-gray-500">
                                        남은 시간: {countdown}초
                                    </div>
                                </div>
                            )}

                            {showInput && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            placeholder="오타를 입력하세요"
                                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            autoFocus
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                                    >
                                        정답 제출
                                    </button>
                                </form>
                            )}

                            {message && (
                                <div className={`p-4 rounded-lg text-center ${
                                    message.includes('정답') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                                }`}>
                                    {message}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="text-2xl font-bold text-purple-800">
                                게임 종료! 최종 점수: {score}
                            </div>
                            <p className="text-gray-600">
                                {score >= 20 ? '🎉 훌륭합니다! 정말 많은 오타를 찾았네요!' :
                                 score >= 10 ? '👍 잘했어요! 더 연습하면 더 잘할 수 있을 거예요!' :
                                 '😊 다음에는 더 잘할 수 있을 거예요! 계속 도전해보세요!'}
                            </p>
                            <button
                                onClick={() => {
                                    setScore(0);
                                    setLives(5);
                                    setRound(1);
                                    setGameOver(false);
                                    setCurrentIndex(0);
                                    setIsInitialized(false);
                                }}
                                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                            >
                                다시 시작하기
                            </button>
                        </div>
                    )}

                    <div className="mt-6">
                        <Link 
                            href="/"
                            className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                        >
                            홈으로 가기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 