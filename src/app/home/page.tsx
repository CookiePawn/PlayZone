'use client'

import React from 'react';

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
    { id: 1, title: 'Project Alpha', description: 'A cutting-edge project using React.', category: 'React' },
    { id: 2, title: 'Project Beta', description: 'Next.js powered application.', category: 'Next.js' },
    { id: 3, title: 'Project Gamma', description: 'Backend service with Node.js.', category: 'Node.js' },
    { id: 4, title: 'Project Delta', description: 'Data analysis with Python.', category: 'Python' },
    { id: 5, title: 'Project Epsilon', description: 'TypeScript for type safety.', category: 'TypeScript' },
    { id: 6, title: 'Project Zeta', description: 'Another React project.', category: 'React' },
];

const Home = () => {
    return (
        <div className="min-h-screen p-8 max-w-[1080px] mx-auto">
            {/* Promotional Banner */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-lg shadow-lg mb-12 text-center">
                <h1 className="text-4xl font-bold mb-2">AI 놀이터</h1>
                <p className="text-xl">Your hub for exciting side projects!</p>
            </div>

            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                    <button
                        key={category.name}
                        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <span className="text-xl">{category.icon}</span>
                        <span>{category.name}</span>
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                        <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                            Thumbnail Placeholder
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                            <p className="text-gray-600 mb-3 text-sm">{project.description}</p>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {project.category}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home; 