'use client'

import { useRouter } from 'next/navigation'
import BackArrow from '@/components/images/BackArrow'

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

export default function WritePostHeader({ title }: { title: string }) {
    const router = useRouter()

    return (
        <div className="bg-black flex p-2 items-center flex-row space-x-2">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div className="flex items-center p-3">
                        <BackArrow />
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            작성을 취소하시겠습니까?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            작성중이던 내용이 사라집니다.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>아니오</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600"
                            onClick={() => router.back()}
                        >
                            네
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>
    )
}
