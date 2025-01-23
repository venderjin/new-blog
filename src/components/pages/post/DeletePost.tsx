'use client'

import { useRouter } from 'next/navigation'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import trashcan from '../../../../public/assets/trashcan.png'
import { usePostStore } from '@/store/usePostStore'

interface DeletePostProps {
    postId: number
    buttonClassName?: string
}

export default function DeletePost({
    postId,
    buttonClassName,
}: DeletePostProps) {
    const src = trashcan
    const { toast } = useToast()
    const removePost = usePostStore((state) => state.removePost)
    const router = useRouter()

    const handleDeletePost = () => {
        router.push('/') // 1. 홈으로 즉시 이동 (에러 방지)

        setTimeout(() => {
            removePost(postId) // 2. 상태 업데이트 (지연 삭제)
            toast({
                title: '삭제 완료',
                description: '게시물이 삭제되었습니다.',
                duration: 3000,
            })
        }, 500) // 500ms 후 삭제 처리
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className={buttonClassName}>
                    <Image
                        src={src}
                        alt="Delete Post"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                    />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        게시글을 삭제하시겠습니까?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        게시글을 삭제하면 복구할 수 없습니다.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-600"
                        onClick={handleDeletePost}
                    >
                        삭제
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
