'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import Update from '@/components/images/Update'
import { useRouter } from 'next/navigation'

export default function UpdatePost({
    postId,
    buttonClassName,
}: {
    postId: number
    buttonClassName: string
}) {
    const router = useRouter()
    const handleUpdatePost = () => {
        router.push(`/update/${postId}`)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className={buttonClassName}>
                    <Update />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        게시글을 수정하시겠습니까?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={handleUpdatePost}>
                        수정
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
