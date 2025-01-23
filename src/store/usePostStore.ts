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

// 초기 데이터 설정
const initialPosts: Post[] = [
    {
        id: 1,
        title: '첫번째 블로그를 써보았습니다.',
        content:
            '개발 블로그를 시작하면서 많은 기대와 설렘이 가득합니다. 꾸준한 학습을 통해 성장하려 합니다.',
        created_at: '2024년 12월 28일 20:47:11',
    },
    {
        id: 2,
        title: 'React 공부를 시작했어요!',
        content:
            'React의 컴포넌트와 상태 관리를 배우며 점점 프레임워크의 강력한 기능에 대해 이해하고 있습니다.',
        created_at: '2025년 01월 02일 14:20:00',
    },
    {
        id: 3,
        title: 'styled-components 사용 후기',
        content:
            '컴포넌트 기반 스타일링을 사용해보니 유지보수성이 높아지고 코드의 일관성을 유지할 수 있었습니다.',
        created_at: '2025년 01월 05일 18:45:30',
    },
    {
        id: 4,
        title: '협업 툴로 Jira를 사용해보았습니다.',
        content:
            '업무를 계획하고 추적하는 데 있어 Jira가 매우 유용하며, 효율적인 협업이 가능해졌습니다.',
        created_at: '2025년 01월 10일 10:10:10',
    },
    {
        id: 5,
        title: 'API 연동을 하며 배운 점',
        content:
            'RESTful API와의 연동을 진행하면서 에러 핸들링과 데이터 검증이 얼마나 중요한지 실감했습니다.',
        created_at: '2025년 01월 12일 09:30:50',
    },
    {
        id: 6,
        title: 'TypeScript로 마이그레이션 시작!',
        content:
            'TypeScript를 적용하니 코드의 안정성이 크게 향상되었고, 타입 추론 기능이 개발 속도를 높였습니다.',
        created_at: '2025년 01월 15일 15:15:15',
    },
    {
        id: 7,
        title: '코드 리뷰를 받으며 성장하기',
        content:
            '선배 개발자의 코드 리뷰를 통해 개발 패턴과 클린 코드를 배우며, 개선할 점을 찾을 수 있었습니다.',
        created_at: '2025년 01월 18일 22:00:00',
    },
    {
        id: 8,
        title: 'React 상태 관리 - Zustand 도입',
        content:
            'Zustand를 사용하여 전역 상태 관리를 단순화하고, 불필요한 리렌더링을 줄이는 데 성공했습니다.',
        created_at: '2025년 01월 20일 11:11:11',
    },
    {
        id: 9,
        title: 'Next.js의 SSR과 SSG 차이',
        content:
            'SSR과 SSG의 차이를 학습하면서 프로젝트 성능 최적화와 사용자 경험 향상을 위한 방향을 설정했습니다.',
        created_at: '2025년 01월 22일 17:55:00',
    },
    {
        id: 10,
        title: '마음가짐이 중요한 이유',
        content:
            '프론트엔드 개발자로서 지속적인 성장이 중요하며, 협업과 커뮤니케이션 능력을 더욱 향상하려 합니다.',
        created_at: '2025년 01월 25일 08:30:25',
    },
]

// Zustand 스토어 생성
export const usePostStore = create<PostStore>((set) => ({
    posts: [], // 초기 상태는 빈 배열

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

    // 게시물 수정
    updatePost: (id: number, updatedPost: Post) =>
        set((state) => {
            const updatedPosts = state.posts.map((post) =>
                post.id === id ? updatedPost : post,
            )
            if (typeof window !== 'undefined') {
                localStorage.setItem('posts', JSON.stringify(updatedPosts))
            }
            return { posts: updatedPosts }
        }),
}))
