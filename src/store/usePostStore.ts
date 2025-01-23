'use client'
import { create } from 'zustand'
import { useEffect } from 'react'

// 게시물 타입 정의
interface Post {
    id: number
    title: string
    content: string
    created_at: string // 날짜를 문자열로 저장
}

// Zustand 상태 정의
interface PostStore {
    posts: Post[]
    addPost: (post: Post) => void
    removePost: (id: number) => void
    loadPosts: () => void
}

// 초기 데이터 설정
const initialPosts: Post[] = [
    {
        id: 1,
        title: '첫번째 블로그를 써보았습니다.',
        content: '이것은 첫 번째 게시물입니다.',
        created_at: '2024년 12월 28일 20:47:11',
    },
    {
        id: 2,
        title: 'ㅎㅎ 을사년 새해 복 많이 받으세요',
        content: '이것은 두 번째 게시물입니다.',
        created_at: '2025년 01월 01일 01:01:01',
    },
    {
        id: 3,
        title: '1월 둘째주 블로그',
        content: '이것은 세 번째 게시물입니다.',
        created_at: '2025년 01월 11일 12:00:00',
    },
    {
        id: 4,
        title: '1월 셋째주 블로그',
        content: '이것은 네 번째 게시물입니다.',
        created_at: '2025년 01월 18일 12:00:00',
    },
]

// Zustand 스토어 생성
export const usePostStore = create<PostStore>((set) => ({
    posts: [], // 초기 상태는 빈 배열

    // 게시물 추가
    addPost: (post: Post) =>
        set((state) => {
            const updatedPosts = [...state.posts, post]
            if (typeof window !== 'undefined') {
                localStorage.setItem('posts', JSON.stringify(updatedPosts))
            }
            return { posts: updatedPosts }
        }),

    // 게시물 삭제
    removePost: (id: number) =>
        set((state) => {
            const updatedPosts = state.posts.filter((post) => post.id !== id)
            if (typeof window !== 'undefined') {
                localStorage.setItem('posts', JSON.stringify(updatedPosts))
            }
            return { posts: updatedPosts }
        }),

    // 게시물 불러오기 (클라이언트 환경에서만 실행)
    loadPosts: () => {
        if (typeof window !== 'undefined') {
            const savedPosts = localStorage.getItem('posts')
            if (savedPosts) {
                set({ posts: JSON.parse(savedPosts) })
            } else {
                localStorage.setItem('posts', JSON.stringify(initialPosts))
                set({ posts: initialPosts })
            }
        }
    },
}))

// 클라이언트 사이드에서 초기 데이터 로드
export function LoadPostsOnMount() {
    const loadPosts = usePostStore((state) => state.loadPosts)

    useEffect(() => {
        loadPosts()
    }, [loadPosts])

    return null
}
