import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { usePostStore } from '@/store/usePostStore'
import { useToast } from '@/hooks/use-toast'

interface SavePostProps {
    postId?: number
    title: string
    content: string
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    type: 'POST' | 'UPDATE'
}

export default function SavePost({
    postId,
    title,
    content,
    onChangeContent,
    onChangeTitle,
    type,
}: SavePostProps) {
    const { toast } = useToast()
    const router = useRouter()

    // zustand 상태에서 게시물 목록 가져오기
    const posts = usePostStore((state) => state.posts)

    const addPost = usePostStore((state) => state.addPost)
    const updatePost = usePostStore((state) => state.updatePost)

    const handleSave = (type: 'POST' | 'UPDATE') => {
        // 제목과 내용이 비어있는지 확인
        const showToastAndReset = (message: string, resetFn: () => void) => {
            toast({
                title: message,
                duration: 2000,
                variant: 'warning',
            })
            resetFn()
        }
        if (!title.trim() || !content.trim()) {
            showToastAndReset('제목과 내용을 모두 작성해주세요', () => {
                if (!title.trim()) {
                    onChangeTitle({
                        target: { value: '' },
                    } as React.ChangeEvent<HTMLInputElement>)
                }
                if (!content.trim()) {
                    onChangeContent({
                        target: { value: '' },
                    } as React.ChangeEvent<HTMLTextAreaElement>)
                }
            })
            return
        }

        // 게시물 포스팅
        if (type === 'POST') {
            addPost({
                id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1, // posts 배열이 비어있는 경우 대비
                title,
                content,
                created_at: new Date().toLocaleString(),
            })

            // 성공 메시지 표시
            toast({
                title: '게시물 등록 완료',
                description: '게시물이 성공적으로 추가되었습니다.',
                duration: 3000,
                variant: 'success',
            })

            // 약간의 지연 후 홈으로 이동
            setTimeout(() => {
                router.push('/')
            }, 500) // 500ms 후 페이지 이동
        }
        // 게시물 업데이트
        else if (type === 'UPDATE' && postId) {
            updatePost(postId, {
                id: postId,
                title,
                content,
                created_at: new Date().toLocaleString(),
            })

            // 성공 메시지 표시
            toast({
                title: '게시물 수정 완료',
                description: '게시물이 성공적으로 수정되었습니다.',
                duration: 3000,
                variant: 'success',
            })

            // 약간의 지연 후 홈으로 이동
            setTimeout(() => {
                router.push('/')
            }, 500) // 500ms 후 페이지 이동
        }
    }
    return (
        <div className="px-5 py-2">
            <Button
                onClick={() => handleSave(type)}
                className="w-full h-[50px] text-lg font-bold"
            >
                {type}
            </Button>
        </div>
    )
}
