import type { Metadata, Viewport } from 'next'
import './globals.css'

//모바일 input 확대 방지
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

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
        <html lang="ko">
            <body>{children}</body>
        </html>
    )
}
