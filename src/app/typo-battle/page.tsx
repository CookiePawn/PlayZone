'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateContent } from '@/services/gemini';

const prompt = `
    한국어 문장을 생성해주세요. 반드시 반환값은 JSON 형식이어야 합니다.
    
    요구사항:
    1. 다양한 주제와 상황의 문장을 생성
       - 일상 대화
       - 뉴스 기사
       - 소설 문장
       - 기술 문서
       - 게임 대사
       - 영화 대사
       - 시 문장
    2. 문장 내에 한 개의 타이핑 오타가 포함되어야 함
    3. 오타는 키보드에서 인접한 자판을 잘못 눌러서 단어가 완전히 다른 의미로 바뀌는 경우만 허용
       - 예: 'ㅉ'을 'ㅊ'으로 잘못 눌러서 '짜장면' → '차장면'
       - 예: 'ㅁ'을 'ㅎ'으로 잘못 눌러서 '맑다' → '핡다'
    4. 응답은 반드시 JSON 형식으로만 제공
    
    예시 응답:
    {
        "sentence": "차장면이 먹고 싶어요.",
        "typo": "차장면",
        "correct": "짜장면"
    }
`;

export default function TypoBattlePage() {
    const [currentSentence, setCurrentSentence] = useState<string>('');
    const [currentTypo, setCurrentTypo] = useState<string>('');
    const [currentCorrect, setCurrentCorrect] = useState<string>('');
    const [userAnswer, setUserAnswer] = useState('');
    const [showSentence, setShowSentence] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [round, setRound] = useState(1);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [sentences, setSentences] = useState<Array<{
        sentence: string;
        typo: string;
        correct: string;
        category: string;
    }>>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (round <= 10) {
            generateNewSentence();
        } else {
            setGameOver(true);
        }
    }, [round]);

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

    const generateNewSentence = async () => {
        setIsLoading(true);
        setShowSentence(false);
        setShowInput(false);
        setUserAnswer('');
        setMessage('');
        setCountdown(5);

        try {
            const response = await generateContent(prompt);
            console.log(response);
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('JSON 형식의 응답을 찾을 수 없습니다.');
            }

            const parsedResponse = JSON.parse(jsonMatch[0]);
            if (parsedResponse.sentences && Array.isArray(parsedResponse.sentences)) {
                setSentences(parsedResponse.sentences);
                setCurrentIndex(0);
                setCurrentSentence(parsedResponse.sentences[0].sentence);
                setCurrentTypo(parsedResponse.sentences[0].typo);
                setCurrentCorrect(parsedResponse.sentences[0].correct);
                setShowSentence(true);
            } else {
                throw new Error('올바른 형식의 문장 데이터가 없습니다.');
            }
        } catch (err) {
            console.error('Error details:', err);
            setMessage('문장 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (userAnswer.trim() === currentTypo) {
            setScore(score + 1);
            setMessage(`정답입니다! 🎉 (올바른 표현: "${currentCorrect}")`);
        } else {
            setMessage(`틀렸습니다. 정답은 "${currentTypo}" 입니다. (올바른 표현: "${currentCorrect}")`);
        }

        setTimeout(() => {
            if (currentIndex < sentences.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setCurrentSentence(sentences[currentIndex + 1].sentence);
                setCurrentTypo(sentences[currentIndex + 1].typo);
                setCurrentCorrect(sentences[currentIndex + 1].correct);
                setShowSentence(true);
                setShowInput(false);
                setUserAnswer('');
                setMessage('');
                setCountdown(5);
            } else {
                setRound(round + 1);
            }
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">오타 찾기 배틀 🎯</h1>
                        <div className="text-lg font-semibold">점수: {score}/10</div>
                    </div>
                    <p className="text-gray-600 mb-6">
                        제한시간 5초 동안 문장을 보고 오타를 찾아보세요!
                        <br />
                        <span className="text-sm text-gray-500">
                            {round}/10 라운드
                        </span>
                    </p>

                    {isLoading ? (
                        <div className="space-y-4">
                            <div className="p-8 bg-purple-50 rounded-lg animate-pulse">
                                <div className="h-6 bg-purple-200 rounded w-full mb-2"></div>
                                <div className="h-6 bg-purple-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    ) : !gameOver ? (
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
                                게임 종료! 최종 점수: {score}/10
                            </div>
                            <p className="text-gray-600">
                                {score >= 8 ? '🎉 훌륭합니다! 거의 모든 오타를 찾았네요!' :
                                 score >= 5 ? '👍 잘했어요! 더 연습하면 더 잘할 수 있을 거예요!' :
                                 '😊 다음에는 더 잘할 수 있을 거예요! 계속 도전해보세요!'}
                            </p>
                            <button
                                onClick={() => {
                                    setScore(0);
                                    setRound(1);
                                    setGameOver(false);
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