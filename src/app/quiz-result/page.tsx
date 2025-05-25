import { Metadata } from 'next';
import Script from 'next/script';

export async function generateMetadata(
    props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
): Promise<Metadata> {
    const searchParams = await props.searchParams;
    const title = searchParams.title as string || '퀴즈';
    const percentile = searchParams.percentile as string || '0';
    const user = searchParams.user as string || '익명';
    const image = searchParams.image as string || 'animal-ox.jpg';

    return {
        title: `${user}님의 ${title} 결과`,
        description: title === '🤔 당신은 어느 쪽?' ? `본인의 성향은 어떨까요?` : 
                        title === '문장 온도 측정기' ? `${user}님은 온도는 ${percentile}도 입니다! 나는 몇도일까요?` : 
                            `${user}님은 ${title}에서 상위 ${percentile}%입니다! 나는 몇퍼일까요?`,
        openGraph: {
            title: `${user}님의 ${title} 결과`,
            description: title === '🤔 당신은 어느 쪽?' ? `본인의 성향은 어떨까요?` : 
                        title === '문장 온도 측정기' ? `${user}님은 온도는 ${percentile}도 입니다! 나는 몇도일까요?` : 
                            `${user}님은 ${title}에서 상위 ${percentile}%입니다! 나는 몇퍼일까요?`,
            type: 'website',
            images: [
                {
                    url: `https://ai-playzone.com/images/banners/${image}`,
                    width: 1200,
                    height: 630,
                    alt: `${user}님의 ${title} 결과`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${user}님의 ${title} 결과`,
            description: title === '🤔 당신은 어느 쪽?' ? `본인의 성향은 어떨까요?` : 
                        title === '문장 온도 측정기' ? `${user}님은 온도는 ${percentile}도 입니다! 나는 몇도일까요?` : 
                            `${user}님은 ${title}에서 상위 ${percentile}%입니다! 나는 몇퍼일까요?`,
            images: [`https://ai-playzone.com/images/banners/${image}`],
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