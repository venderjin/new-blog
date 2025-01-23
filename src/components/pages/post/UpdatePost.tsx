'use client'
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
                    <AlertDialogDescription>
                        게시글을 수정하시려면 &apos;수정&apos;을 클릭하세요.
                    </AlertDialogDescription>
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
