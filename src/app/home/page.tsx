'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from './list';
import { categories } from './category';
import { HeaderImage } from '@/assets/images';

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
        <div className="relative min-h-screen overflow-y-auto">
            <div className="min-h-screen p-8 max-w-[1080px] mx-auto">
                {/* <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-lg shadow-lg mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-2">플레이존</h1>
                    <p className="text-xl">AI가 준비한 심심풀이 컨텐츠!</p>
                </div> */}
                <div className="relative w-full mb-12">
                    <Image
                        src={HeaderImage}
                        alt="플레이존"
                        className="rounded-lg w-full h-auto"
                        sizes="(max-width: 1080px) 100vw, 1080px"
                        priority
                        loading="eager"
                        placeholder="blur"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className={`flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 active:scale-95 relative ${selectedCategory === category.id
                                ? 'after:absolute after:inset-[-1px] after:rounded-lg after:bg-gradient-to-r after:from-pink-500 after:to-purple-600 after:-z-10 bg-gradient-to-r from-pink-500 to-purple-600'
                                : 'after:absolute after:inset-[-1px] after:rounded-lg after:bg-gray-200 after:-z-10 bg-white'
                                }`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            <div className={`absolute inset-[2px] rounded-md ${selectedCategory === category.id ? 'bg-white' : 'bg-white'}`}></div>
                            <span className="relative z-10">{category.icon}</span>
                            <span className="text-gray-900 relative z-10 ml-2">{category.name}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.filter((project) => selectedCategory === 'all' || project.category === selectedCategory).map((project) => {
                        const ProjectCard = (
                            <div className={`bg-white rounded-lg overflow-hidden border ${project.isAd ? 'border-yellow-400' : 'border-gray-200'} h-full flex flex-col hover:border-violet-500 transition-all duration-200 relative`}>
                                {project.isAd && (
                                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                                        AD
                                    </div>
                                )}
                                {project.thumbnail?.image ? (
                                    <div className="relative w-full">
                                        <Image
                                            src={project.thumbnail.image}
                                            alt={project.title}
                                            className="w-full h-[200px] object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            quality={project.thumbnail.quality || 75}
                                            priority={project.thumbnail.priority}
                                            loading={project.thumbnail.priority ? "eager" : "lazy"}
                                            placeholder="blur"
                                        />
                                    </div>
                                ) : (
                                    <div className={`h-48 ${project.thumbnail?.type === 'gradient' ? `bg-gradient-to-br ${project.thumbnail.gradient}` : 'bg-gray-100'} flex items-center justify-center ${project.thumbnail?.type === 'gradient' ? 'text-white' : 'text-gray-500'} text-6xl`}>
                                        {project.thumbnail?.type === 'gradient' ? project.thumbnail.icon : project.thumbnail?.text || ''}
                                    </div>
                                )}
                                <div className="p-4 flex flex-col h-[150px]">
                                    <h3 className="text-xl font-semibold mb-1 text-gray-900">{project.title}</h3>
                                    <p className="text-gray-600 mb-3 text-sm line-clamp-2 h-[40px]">{project.description}</p>
                                    <div className="mt-auto">
                                        <span className={`px-3 py-1 ${project.category === 'knowledge' ? 'bg-purple-100 text-purple-800' : project.category === 'pattern' ? 'bg-yellow-100 text-yellow-800' : project.category === 'logic' ? 'bg-blue-100 text-blue-800' : project.category === 'language' ? 'bg-green-100 text-green-800' : project.category === 'simulation' ? 'bg-red-100 text-red-800' : project.category === 'psychology' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'} rounded-full text-sm font-medium`}>
                                            {project.category === 'knowledge' ? '상식퀴즈' :
                                                project.category === 'pattern' ? '패턴탐구' :
                                                    project.category === 'logic' ? '논리추론' :
                                                        project.category === 'language' ? '언어챌린지' :
                                                            project.category === 'simulation' ? '시뮬레이션' :
                                                                project.category === 'psychology' ? '심리검사' :
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

            <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
                <div className="max-w-[1080px] mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="text-gray-600">
                            <div className="text-sm">
                                <p>Email: binihaus5117@gmail.com</p>
                            </div>
                            <p className="mt-10 text-sm">© 2025 PlayZone. All rights reserved.</p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">이용약관</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home; 