import { create } from 'zustand'

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

// 초기 데이터 설정 및 로컬스토리지에서 불러오기
const loadInitialPosts = (): Post[] => {
    if (typeof window !== 'undefined') {
        const savedPosts = localStorage.getItem('posts')
        if (savedPosts) {
            return JSON.parse(savedPosts)
        }
    }

    // 기본 게시물 설정 (초기 데이터)
    const initialPosts: Post[] = [
        {
            id: 1,
            title: '첫번째 블로그를 써보았습니다.',
            content: '이것은 첫 번째 게시물입니다.',
            created_at: '2024년 12월 28일 20:47:11',
            // 현재 날짜와 시간을 'YYYY년 MM월 DD일 HH:MM:SS' 형식으로 저장
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

    localStorage.setItem('posts', JSON.stringify(initialPosts))
    return initialPosts
}

// Zustand 스토어 생성
export const usePostStore = create<PostStore>((set) => ({
    posts: loadInitialPosts(),
    // posts: [],

    // 게시물 추가
    addPost: (post: Post) =>
        set((state) => {
            const updatedPosts = [...state.posts, post]
            localStorage.setItem('posts', JSON.stringify(updatedPosts))
            return { posts: updatedPosts }
        }),

    // 게시물 삭제
    removePost: (id: number) =>
        set((state) => {
            const updatedPosts = state.posts.filter((post) => post.id !== id)
            localStorage.setItem('posts', JSON.stringify(updatedPosts))
            return { posts: updatedPosts }
        }),

    // 게시물 불러오기 (새로고침 시)
    loadPosts: () => set(() => ({ posts: loadInitialPosts() })),
}))
