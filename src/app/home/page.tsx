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

const projects = [
    { 
        id: 1, 
        title: '⚖️ 법률 OX 퀴즈', 
        description: '일상 속 법 상식, 얼마나 알고 계신가요? OX 퀴즈로 확인해보세요.', 
        category: 'Quiz',
        href: '/legal-quiz',
        thumbnail: {
            type: 'gradient',
            gradient: 'from-purple-400 to-indigo-500',
            icon: '⚖️'
        }
    },
    { 
        id: 2, 
        title: '💰 세금 OX 퀴즈', 
        description: '세금에 대해 얼마나 알고 있을까? OX 퀴즈로 확인해보세요.', 
        category: 'Quiz',
        href: '/tax-quiz',
        thumbnail: {
            type: 'gradient',
            gradient: 'from-green-400 to-blue-500',
            icon: '💰'
        }
    },
    { 
        id: 3, 
        title: '🐾 반려동물 OX 퀴즈', 
        description: '반려동물에 대해 얼마나 알고 있을까? OX 퀴즈로 확인해보세요.', 
        category: 'Quiz',
        href: '/animal-quiz',
        thumbnail: {
            type: 'gradient',
            gradient: 'from-orange-400 to-pink-500',
            icon: '🐾'
        }
    },
    { 
        id: 4, 
        title: 'Project Gamma', 
        description: 'Backend service with Node.js.', 
        category: 'Node.js',
        thumbnail: {
            type: 'placeholder',
            text: ''
        }
    },
    { id: 5, title: 'Project Delta', description: 'Data analysis with Python.', category: 'Python' },
    { id: 6, title: 'Project Epsilon', description: 'TypeScript for type safety.', category: 'TypeScript' },
    { id: 7, title: 'Project Zeta', description: 'Another React project.', category: 'React' },
    { id: 8, title: 'Project Eta', description: 'Another React project.', category: 'React' },
    { id: 9, title: 'Project Theta', description: 'Another React project.', category: 'React' },
    { id: 10, title: 'Project Iota', description: 'Another React project.', category: 'React' },
    { id: 11, title: 'Project Kappa', description: 'Another React project.', category: 'React' },
    { id: 12, title: 'Project Lambda', description: 'Another React project.', category: 'React' },
    { id: 13, title: 'Project Mu', description: 'Another React project.', category: 'React' },
    { id: 14, title: 'Project Nu', description: 'Another React project.', category: 'React' },
    { id: 15, title: 'Project Xi', description: 'Another React project.', category: 'React' },
    { id: 16, title: 'Project Omicron', description: 'Another React project.', category: 'React' },
];

const Home = () => {
    return (
        <div className="relative min-h-screen ">
            <div className="hidden 2xl:block fixed top-20 left-[calc(50%-540px-200px-2rem)] w-[200px] h-[600px] bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-10 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Left Ad (200x600)</span>
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
                            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            <span className="text-xl">{category.icon}</span>
                            <span className="text-gray-900 dark:text-gray-100">{category.name}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => {
                        const ProjectCard = (
                            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div className={`h-48 ${project.thumbnail?.type === 'gradient' ? `bg-gradient-to-br ${project.thumbnail.gradient}` : 'bg-gray-100 dark:bg-gray-700'} flex items-center justify-center ${project.thumbnail?.type === 'gradient' ? 'text-white' : 'text-gray-500 dark:text-gray-400'} text-6xl`}>
                                    {project.thumbnail?.type === 'gradient' ? project.thumbnail.icon : project.thumbnail?.text || ''}
                                </div>
                                <div className="p-4 flex-grow">
                                    <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">{project.description}</p>
                                    <span className={`px-3 py-1 ${project.category === 'Quiz' ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'} rounded-full text-sm font-medium`}>
                                        {project.category}
                                    </span>
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

            <div className="hidden 2xl:block fixed top-20 left-[calc(50%+540px+2rem)] w-[200px] h-[600px] bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-10 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Right Ad (200x600)</span>
            </div>
        </div>
    );
};

export default Home; 