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
    id: number
}

export default function DeletePost({ id }: DeletePostProps) {
    const src = trashcan
    const { toast } = useToast()
    const removePost = usePostStore((state) => state.removePost)

    const handleDeletePost = () => {
        removePost(id) // Zustand 스토어에서 게시글 삭제
        toast({
            title: '삭제 완료',
            description: '게시물이 삭제되었습니다.',
            duration: 3000,
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="absolute left-3 md:left-15 px-2 hover:opacity-80 opacity-40">
                    <Image
                        src={src}
                        alt="Delete Post"
                        width={18}
                        height={18}
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
