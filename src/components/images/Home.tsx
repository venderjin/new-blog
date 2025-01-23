'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
    // 화면 크기 상태를 관리
    const [size, setSize] = useState<number>(30)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 클라이언트 사이드에서만 window 접근 가능
            setSize(window.innerWidth > 768 ? 40 : 30)
        }
    }, [])

    const router = useRouter()

    return (
        <div className="pl-4" onClick={() => router.push('/')}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10.3104 0.499359L0.929798 7.53483H3.27496V16.9155H7.96527V12.2252H12.6556V16.9155H17.3459V7.46448L19.6911 7.53483L10.3104 0.499359Z"
                    fill="black"
                />
            </svg>
        </div>
    )
}
