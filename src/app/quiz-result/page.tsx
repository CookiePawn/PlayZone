import { Metadata } from 'next';
import Script from 'next/script';

interface Props {
    searchParams: {
        title?: string;
        percentile?: string;
        user?: string;
    };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const title = searchParams.title || '퀴즈';
    const percentile = searchParams.percentile || '0';
    const user = searchParams.user || '익명';

    return {
        title: `${user}님의 ${title} 결과`,
        description: `${user}님이 ${title}에서 상위 ${percentile}%를 획득했습니다!`,
        openGraph: {
            title: `${user}님의 ${title} 결과`,
            description: `${user}님이 ${title}에서 상위 ${percentile}%를 획득했습니다!`,
            type: 'website',
            images: [
                {
                    url: 'https://ai-playzone.com/images/og-image.jpeg',
                    width: 1200,
                    height: 630,
                    alt: `${user}님의 ${title} 결과`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${user}님의 ${title} 결과`,
            description: `${user}님이 ${title}에서 상위 ${percentile}%를 획득했습니다!`,
            images: ['https://ai-playzone.com/images/og-image.jpeg'],
        },
    };
}

export default function QuizResultPage() {
    return (
        <>
            <Script id="redirect">
                {`
                    window.location.href = '/';
                `}
            </Script>
        </>
    );
} 