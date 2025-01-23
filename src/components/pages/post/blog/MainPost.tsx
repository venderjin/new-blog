'use client'

import Link from 'next/link'
import { usePostStore } from '@/store/usePostStore'
import { LoadPostsOnMount } from '@/components/pages/LoadPostsOnMount'
import DeletePost from '@/components/pages/post/DeletePost'
import UpdatePost from '@/components/pages/post/UpdatePost'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export default function MainPost({ postId }: { postId: number }) {
    // 게시물 목록을 가져오는 함수
    const isLoading = LoadPostsOnMount()

    // zustand 상태에서 게시물 목록 가져오기
    const post = usePostStore((state) => state.posts).filter(
        (post) => post.id === postId,
    )[0]

    return (
        <div className="flex flex-col">
            {!isLoading ? (
                <div>loading...</div>
            ) : (
                <>
                    <Card className="m-2 mb-5">
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>{post.created_at}</CardDescription>
                        </CardHeader>
                        <CardContent>{post.content}</CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <div className="flex flex-row space-x-5">
                                <UpdatePost
                                    postId={postId}
                                    buttonClassName="w-[50px] h-[40px] bg-muted rounded-md flex justify-center items-center md:opacity-60 hover:opacity-100"
                                />
                                <DeletePost
                                    postId={postId}
                                    buttonClassName="w-[50px] h-[40px] bg-muted rounded-md flex justify-center items-center md:opacity-60 hover:opacity-100"
                                />
                            </div>
                            <div className="">
                                <Button className="rounded-full w-[100px] h-[40px] text-white">
                                    <Link href="/write">새 글쓰기</Link>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </>
            )}
        </div>
    )
}
