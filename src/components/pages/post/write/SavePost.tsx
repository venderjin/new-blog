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

        // 게시물 포스팅팅
        if (type === 'POST') {
            addPost({
                id: posts[posts.length - 1].id + 1,
                title,
                content,
                created_at: new Date().toLocaleString(),
            })

            router.push(`/blog/${posts[posts.length - 1].id + 1}`)
        }
        // 게시물 업데이트트
        else if (type === 'UPDATE' && postId) {
            updatePost(postId, {
                id: postId,
                title,
                content,
                created_at: new Date().toLocaleString(),
            })
            router.push(`/blog/${postId}`)
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
