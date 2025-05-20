import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '동물 OX 퀴즈 - 플레이존',
    description: '당신은 동물에 대해 얼마나 알고 있을까? OX 하나로 가려지는 당신의 동물 지식 테스트!',
    openGraph: {
        title: '동물 OX 퀴즈 - 플레이존',
        description: '당신은 동물에 대해 얼마나 알고 있을까? OX 하나로 가려지는 당신의 동물 지식 테스트!',
        type: 'website',
        images: [
            {
                url: 'https://ai-playzone.com/images/og-image.jpeg',
                width: 1200,
                height: 630,
                alt: '동물 OX 퀴즈 - 플레이존',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '동물 OX 퀴즈 - 플레이존',
        description: '당신은 동물에 대해 얼마나 알고 있을까? OX 하나로 가려지는 당신의 동물 지식 테스트!',
        images: ['https://ai-playzone.com/images/og-image.jpeg'],
    },
};

export default function AnimalQuizLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 