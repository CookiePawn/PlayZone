'use client'

import React from 'react';
import Link from 'next/link';

const categories = [
    { name: 'ALL', icon: '⭐' },
    { name: '성격', icon: '👤' },
    { name: '연애', icon: '❤️' },
    { name: '시뮬레이션', icon: '💬' },
    { name: '사주/운세', icon: '🔮' },
    { name: '전자책', icon: '📖' },
    { name: '프로모션', icon: '🎁' },
    { name: '기타', icon: '🌸' },
];

const projects: {
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
            id: 'ad-1',
            title: '🎯 특별한 기회!',
            description: '지금 바로 시작하세요! 최고의 서비스를 만나보세요.',
            category: '광고',
            isAd: true,
            thumbnail: {
                type: 'gradient',
                gradient: 'from-yellow-400 to-red-500',
                icon: '🎯'
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
            id: 'ad-2',
            title: '🌟 한정 기회!',
            description: '지금만 특별한 혜택을 누리세요!',
            category: '광고',
            isAd: true,
            thumbnail: {
                type: 'gradient',
                gradient: 'from-blue-400 to-indigo-500',
                icon: '🌟'
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
            id: 'ad-3',
            title: '💎 프리미엄 혜택',
            description: '최고의 서비스로 업그레이드하세요!',
            category: '광고',
            isAd: true,
            thumbnail: {
                type: 'gradient',
                gradient: 'from-emerald-400 to-teal-500',
                icon: '💎'
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
        { id: 6, title: 'Project Epsilon', description: 'TypeScript for type safety.', category: 'TypeScript', thumbnail: { type: 'placeholder', text: 'ε' } },
        {
            id: 'ad-4',
            title: '🚀 빠른 시작',
            description: '지금 시작하면 50% 할인!',
            category: '광고',
            isAd: true,
            thumbnail: {
                type: 'gradient',
                gradient: 'from-rose-400 to-pink-500',
                icon: '🚀'
            }
        },
        { id: 7, title: 'Project Zeta', description: 'Another React project.', category: 'React', thumbnail: { type: 'placeholder', text: 'ζ' } },
        { id: 8, title: 'Project Eta', description: 'Another React project.', category: 'React', thumbnail: { type: 'placeholder', text: 'η' } },
        {
            id: 'ad-5',
            title: '🎁 신규 회원 혜택',
            description: '첫 가입 시 10,000포인트 지급!',
            category: '광고',
            isAd: true,
            thumbnail: {
                type: 'gradient',
                gradient: 'from-amber-400 to-orange-500',
                icon: '🎁'
            }
        },
        { id: 9, title: 'Project Theta', description: 'Another React project.', category: 'React', thumbnail: { type: 'placeholder', text: 'θ' } },
        { id: 10, title: 'Project Iota', description: 'Another React project.', category: 'React', thumbnail: { type: 'placeholder', text: 'ι' } },
        {
            id: 'ad-6',
            title: '✨ 이벤트 진행중',
            description: '참여만 해도 경품 증정!',
            category: '광고',
            isAd: true,
            thumbnail: {
                type: 'gradient',
                gradient: 'from-violet-400 to-purple-500',
                icon: '✨'
            }
        },
        { id: 11, title: 'Project Kappa', description: 'Another React project.', category: 'React', thumbnail: { type: 'placeholder', text: 'κ' } },
        { id: 12, title: 'Project Lambda', description: 'Another React project.', category: 'React', thumbnail: { type: 'placeholder', text: 'λ' } },
        {
            id: 'ad-7',
            title: '🏆 최고의 선택',
            description: '수많은 사용자가 선택한 서비스!',
            category: '광고',
            isAd: true,
            thumbnail: {
                type: 'gradient',
                gradient: 'from-cyan-400 to-sky-500',
                icon: '🏆'
            }
        },
        { id: 13, title: 'Project Mu', description: 'Another React project.', category: 'React', thumbnail: { type: 'placeholder', text: 'μ' } },
        { id: 14, title: 'Project Nu', description: 'Another React project.', category: 'React', thumbnail: { type: 'placeholder', text: 'ν' } },
        {
            id: 'ad-8',
            title: '🎨 맞춤형 서비스',
            description: '당신만을 위한 특별한 경험!',
            category: '광고',
            isAd: true,
            thumbnail: {
                type: 'gradient',
                gradient: 'from-fuchsia-400 to-pink-500',
                icon: '🎨'
            }
        },
        { id: 15, title: 'Project Xi', description: 'Another React project.', category: 'React', thumbnail: { type: 'placeholder', text: 'ξ' } },
        { id: 16, title: 'Project Omicron', description: 'Another React project.', category: 'React', thumbnail: { type: 'placeholder', text: 'ο' } },
    ];

const Home = () => {
    return (
        <div className="relative min-h-screen">
            <div className="hidden 2xl:block fixed top-20 left-[calc(50%-540px-200px-2rem)] w-[200px] h-[600px] bg-gray-100 border border-gray-200 z-10 flex items-center justify-center">
                <span className="text-gray-500">Left Ad (200x600)</span>
            </div>

            <div className="min-h-screen p-8 max-w-[1080px] mx-auto">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-lg shadow-lg mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-2">AI 놀이터</h1>
                    <p className="text-xl">Your hub for exciting side projects!</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                            <span className="text-xl">{category.icon}</span>
                            <span className="text-gray-900">{category.name}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => {
                        const ProjectCard = (
                            <div className={`bg-white rounded-lg overflow-hidden border ${project.isAd ? 'border-yellow-400' : 'border-gray-200'} h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200 relative`}>
                                {project.isAd && (
                                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                                        AD
                                    </div>
                                )}
                                <div className={`h-48 ${project.thumbnail?.type === 'gradient' ? `bg-gradient-to-br ${project.thumbnail.gradient}` : 'bg-gray-100'} flex items-center justify-center ${project.thumbnail?.type === 'gradient' ? 'text-white' : 'text-gray-500'} text-6xl`}>
                                    {project.thumbnail?.type === 'gradient' ? project.thumbnail.icon : project.thumbnail?.text || ''}
                                </div>
                                <div className="p-4 flex flex-col h-[150px]">
                                    <h3 className="text-xl font-semibold mb-1 text-gray-900">{project.title}</h3>
                                    <p className="text-gray-600 mb-3 text-sm line-clamp-2 h-[40px]">{project.description}</p>
                                    <div className="mt-auto">
                                        <span className={`px-3 py-1 ${project.category === 'Quiz' ? 'bg-purple-100 text-purple-800' : project.category === '광고' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'} rounded-full text-sm font-medium`}>
                                            {project.category === 'Quiz' ?
                                                (project.quizType === 'ox' ? 'OX 퀴즈' :
                                                    project.quizType === 'mc' ? '4지선다 퀴즈' :
                                                        project.category) :
                                                project.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );

                        return project.href ? (
                            <Link key={project.id} href={project.href} className="block">
                                {ProjectCard}
                            </Link>
                        ) : (
                            <div key={project.id}>
                                {ProjectCard}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="hidden 2xl:block fixed top-20 left-[calc(50%+540px+2rem)] w-[200px] h-[600px] bg-gray-100 border border-gray-200 z-10 flex items-center justify-center">
                <span className="text-gray-500">Right Ad (200x600)</span>
            </div>
        </div>
    );
};

export default Home; 