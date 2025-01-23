import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Toaster } from '@/components/ui/toaster'
import { LoadPostsOnMount } from '@/store/usePostStore'
import './globals.css'

//모바일 input 확대 방지
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

//글꼴 PretendardVariable.woff2를 사용
const pretendard = localFont({
    src: '../../public/font/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
})

export const metadata: Metadata = {
    title: 'NEW BLOG',
    description: '일상을 기록하다',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ko" className={`${pretendard.variable}`}>
            <body className={pretendard.className}>
                <LoadPostsOnMount />
                {children}
                <Toaster />
            </body>
        </html>
    )
}
