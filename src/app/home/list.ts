export const projects: {
    id: string | number;
    title: string;
    description: string;
    category: string;
    href?: string;
    isAd?: boolean;
    quizType?: 'ox' | 'mc';
    thumbnail: {
        type: 'gradient' | 'placeholder';
        gradient?: string;
        icon?: string;
        text?: string;
    };
}[] = [
        {
            id: 1,
            title: '⚖️ 법률 퀴즈',
            description: '일상 속 법 상식, 얼마나 알고 계신가요? OX 퀴즈로 확인해보세요.',
            category: 'Quiz',
            quizType: 'ox',
            href: '/legal-quiz',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-purple-400 to-indigo-500',
                icon: '⚖️'
            }
        },
        {
            id: 2,
            title: '💰 세금 퀴즈',
            description: '세금에 대해 얼마나 알고 있을까? OX 퀴즈로 확인해보세요.',
            category: 'Quiz',
            quizType: 'ox',
            href: '/tax-quiz',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-green-400 to-blue-500',
                icon: '💰'
            }
        },
        {
            id: 3,
            title: '🐾 반려동물 퀴즈',
            description: '반려동물에 대해 얼마나 알고 있을까? OX 퀴즈로 확인해보세요.',
            category: 'Quiz',
            quizType: 'ox',
            href: '/animal-quiz',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-orange-400 to-pink-500',
                icon: '🐾'
            }
        },
        {
            id: 4,
            title: '🔍 공통 개념 찾기 퀴즈',
            description: '주어진 단어들의 공통점을 찾아보세요! 4지선다로 테스트해보세요.',
            category: 'Quiz',
            quizType: 'mc',
            href: '/concept-quiz',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-blue-400 to-cyan-500',
                icon: '🔍'
            }
        },
        {
            id: 17,
            title: '브랜드 TMI 퀴즈',
            description: '유명 브랜드들의 놀라운 비하인드 스토리와 의외의 진실을 테스트해보세요!',
            category: 'Quiz',
            href: '/brand-tmi-quiz',
            quizType: 'mc',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-purple-500 to-pink-500',
                icon: '🏢',
                text: '브랜드 TMI 퀴즈'
            }
        },
        {
            id: 18,
            title: '🔬 과학 TMI 퀴즈',
            description: '자연 환경, 물리 법칙, 화학 등 과학의 놀라운 사실들을 테스트해보세요!',
            category: 'Quiz',
            href: '/science-tmi-quiz',
            quizType: 'mc',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-blue-500 to-cyan-500',
                icon: '🔬',
                text: '과학 TMI 퀴즈'
            }
        },
        {
            id: 19,
            title: '🌍 국가별 문화 TMI 퀴즈',
            description: '각 나라별 황당한(하지만 진짜인) 규칙들과 문화적 특이점을 테스트해보세요!',
            category: 'Quiz',
            href: '/culture-tmi-quiz',
            quizType: 'mc',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-green-500 to-teal-500',
                icon: '🌍',
                text: '국가별 문화 TMI 퀴즈'
            }
        },
        {
            id: 20,
            title: '🦁 동물 TMI 퀴즈',
            description: '동물들의 놀라운 사실과 흥미로운 TMI를 테스트해보세요!',
            category: 'Quiz',
            quizType: 'mc',
            href: '/animal-tmi-quiz',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-amber-400 to-orange-500',
                icon: '🦁'
            }
        },
        {
            id: 21,
            title: '🔢 숫자 규칙 찾기 퀴즈',
            description: '숫자들의 패턴을 찾아 다음 숫자를 예측해보세요! 4지선다로 테스트해보세요.',
            category: 'Quiz',
            quizType: 'mc',
            href: '/number-sequence-quiz',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-indigo-400 to-violet-500',
                icon: '🔢'
            }
        },
        {
            id: 22,
            title: '🧠 추론 실력 진단 퀴즈',
            description: '논리적 관계를 파악하고 다음 단계를 추론해보세요! 4지선다로 테스트해보세요.',
            category: 'Quiz',
            quizType: 'mc',
            href: '/logic-quiz',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-indigo-500 to-violet-500',
                icon: '🧠'
            }
        },
        {
            id: 23,
            title: '🌡️ 문장 온도 측정기',
            description: '문장을 쓰면 AI가 감정 "온도(℃)"를 수치화해드립니다!',
            category: '온도 측정',
            href: '/sentence-temperature',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-red-400 to-orange-500',
                icon: '🌡️'
            }
        },
        {
            id: 24,
            title: '🔮 선택 후 결과 예측 테스트',
            description: '선택을 입력하고 3일 뒤의 결과를 예측해보세요!',
            category: '결과 예측',
            href: '/choice-prediction',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-purple-400 to-pink-500',
                icon: '🔮'
            }
        },
        {
            id: 25,
            title: '🎯 오타 찾기 배틀',
            description: '제한시간 5초 동안 문장의 오타를 찾아보세요!',
            category: '오타 찾기',
            href: '/typo-battle',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-orange-400 to-red-500',
                icon: '🎯'
            }
        },
        {
            id: 26,
            title: '🎭 가짜 선택지 구별 퀴즈',
            description: '가짜 선택지를 구별해보세요!',
            category: '오답 찾기',
            href: '/fake-options-quiz',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-indigo-500 to-violet-500',
                icon: '🎭'
            }
        },
        {
            id: 27,
            title: '👤 성향 테스트',
            description: '당신의 성향을 테스트해보세요!',
            category: '테스트',
            href: '/personality-test',
            thumbnail: {
                type: 'gradient',
                gradient: 'from-cyan-400 to-sky-500',
                icon: '👤'
            }
        },
        // {
        //     id: 'ad-7',
        //     title: '🏆 최고의 선택',
        //     description: '수많은 사용자가 선택한 서비스!',
        //     category: '광고',
        //     isAd: true,
        //     thumbnail: {
        //         type: 'gradient',
        //         gradient: 'from-cyan-400 to-sky-500',
        //         icon: '🏆'
        //     }
        // },
    ];