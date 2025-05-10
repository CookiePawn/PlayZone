import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '플레이존 - AI 컨텐츠 놀이터',
    description: '플레이존은 AI 컨텐츠 놀이터로, 다양한 AI 컨텐츠를 즐길 수 있는 공간입니다.',
    keywords: 'AI, 컨텐츠, 놀이터, 플레이존, GEMINI, 챗봇, 챗GPT, 챗봇 놀이터, 퀴즈',
    openGraph: {
        title: '플레이존 - AI 컨텐츠 놀이터',
        description: '플레이존은 AI 컨텐츠 놀이터로, 다양한 AI 컨텐츠를 즐길 수 있는 공간입니다.',
        url: 'https://ai-playzone.com',
        siteName: '플레이존 - AI 컨텐츠 놀이터',
        type: 'website',
        images: [
            {
                url: 'https://ai-playzone.com/images/og-image.jpeg',
                width: 1200,
                height: 630,
                alt: '플레이존 - AI 컨텐츠 놀이터',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '플레이존 - AI 컨텐츠 놀이터',
        description: '플레이존은 AI 컨텐츠 놀이터로, 다양한 AI 컨텐츠를 즐길 수 있는 공간입니다.',
        images: ['https://ai-playzone.com/images/og-image.jpeg'],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <head>
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-KR3WJCRT');
                    `}
                </Script>
                <Script
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4743705134165634"
                    strategy="afterInteractive"
                    crossOrigin="anonymous"
                />
                <meta name="google-adsense-account" content="ca-pub-4743705134165634" />
            </head>
            <body className={inter.className}>
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-KR3WJCRT"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                {children}
            </body>
        </html>
    );
}
