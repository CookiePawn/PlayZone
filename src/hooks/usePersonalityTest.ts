import { useState } from 'react';
import { PersonalityQuestion } from '@/types/personalityTest';

interface PersonalityResult {
    traits: Record<string, number>;
    dominantTraits: string[];
    personalityDescription: string;
    traitPercentages: Record<string, number>;
}

type TraitAxis = [string, string];

interface TraitAxes {
    PLANNING: TraitAxis;
    THINKING: TraitAxis;
    ENERGY: TraitAxis;
    STABILITY: TraitAxis;
}

// 4가지 주요 성향 축 정의
const TRAIT_AXES: TraitAxes = {
    PLANNING: ['계획형', '즉흥형'],
    THINKING: ['이성형', '감성형'],
    ENERGY: ['내향형', '외향형'],
    STABILITY: ['안정형', '모험형']
};

type TraitMappingKey = 
    | '계획형' | '즉흥형'
    | '이성형' | '감성형'
    | '내향형' | '외향형'
    | '안정형' | '모험형';

// 성향 매핑 테이블
const TRAIT_MAPPING: Record<TraitMappingKey, string> = {
    // 계획 vs 즉흥
    '계획형': TRAIT_AXES.PLANNING[0],
    '즉흥형': TRAIT_AXES.PLANNING[1],

    // 이성 vs 감성
    '이성형': TRAIT_AXES.THINKING[0],
    '감성형': TRAIT_AXES.THINKING[1],

    // 내향 vs 외향
    '내향형': TRAIT_AXES.ENERGY[0],
    '외향형': TRAIT_AXES.ENERGY[1],

    // 안정 vs 모험
    '안정형': TRAIT_AXES.STABILITY[0],
    '모험형': TRAIT_AXES.STABILITY[1]
};

type TraitDescription = Record<string, string>;

export const usePersonalityTest = (questions: PersonalityQuestion[]) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [result, setResult] = useState<PersonalityResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (optionIndex: number) => {
        if (isFinished) return;

        const selectedOption = optionIndex === 0 ? 'option1' : 'option2';
        const traits = currentQuestion.traits[selectedOption];

        // Update traits in result
        setResult(prev => {
            if (!prev) {
                return {
                    traits: traits.reduce((acc: Record<string, number>, trait: string) => {
                        const mappedTrait = TRAIT_MAPPING[trait as TraitMappingKey] || trait;
                        return { ...acc, [mappedTrait]: 1 };
                    }, {}),
                    dominantTraits: [],
                    personalityDescription: '',
                    traitPercentages: {}
                };
            }

            const updatedTraits = { ...prev.traits };
            traits.forEach((trait: string) => {
                const mappedTrait = TRAIT_MAPPING[trait as TraitMappingKey] || trait;
                updatedTraits[mappedTrait] = (updatedTraits[mappedTrait] || 0) + 1;
            });

            return {
                ...prev,
                traits: updatedTraits
            };
        });

        // Move to next question or finish
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
            calculateFinalResult();
        }
    };

    const calculateFinalResult = () => {
        if (!result) return;

        // Calculate total questions answered for each trait
        const totalQuestions = questions.length;
        const traitPercentages: Record<string, number> = {};

        // Calculate percentage for each trait
        Object.entries(result.traits).forEach(([trait, count]) => {
            traitPercentages[trait] = Math.round((count / totalQuestions) * 100);
        });

        // Sort traits by percentage in descending order
        const sortedTraits = Object.entries(traitPercentages)
            .sort(([, a], [, b]) => b - a)
            .map(([trait]) => trait);

        // Generate personality description
        const personalityDescription = generatePersonalityDescription(sortedTraits);

        setResult(prev => prev ? {
            ...prev,
            dominantTraits: sortedTraits,
            personalityDescription,
            traitPercentages
        } : null);
    };

    const generatePersonalityDescription = (traits: string[]): string => {
        return `당신은 ${traits.join(', ')} 성향이 강한 사람입니다. 
        \n\n${traits.map(trait => getTraitDescription(trait)).join('\n')}`;
    };

    const getTraitDescription = (trait: string): string => {
        const descriptions: TraitDescription = {
            '계획형': '체계적이고 계획적으로 일을 처리하는 것을 선호합니다.',
            '즉흥형': '상황에 따라 유연하게 대처하는 것을 선호합니다.',
            '이성형': '논리적이고 객관적인 판단을 중시합니다.',
            '감성형': '감정과 직관을 중요하게 생각합니다.',
            '내향형': '독립적이고 신중한 성향을 가지고 있습니다.',
            '외향형': '적극적이고 사교적인 성향을 가지고 있습니다.',
            '안정형': '안정적이고 현실적인 선택을 선호합니다.',
            '모험형': '새로운 도전과 변화를 즐기는 성향입니다.'
        };
        return descriptions[trait] || '';
    };

    const resetTest = () => {
        setCurrentQuestionIndex(0);
        setIsFinished(false);
        setResult(null);
        setIsLoading(false);
    };

    return {
        currentQuestion,
        currentQuestionIndex,
        isFinished,
        result,
        isLoading,
        handleAnswer,
        resetTest
    };
}; 