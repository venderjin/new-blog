'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePostStore } from '@/store/usePostStore'
import { LoadPostsOnMount } from '@/components/pages/LoadPostsOnMount'
import DeletePost from '@/components/pages/post/DeletePost'
import UpdatePost from '@/components/pages/post/UpdatePost'

export default function MainPost({ postId }: { postId: number }) {
    // 게시물 목록을 가져오는 함수
    const isLoading = LoadPostsOnMount()

    // zustand 상태에서 게시물 목록 가져오기
    const post = usePostStore((state) => state.posts).filter(
        (post) => post.id === postId,
    )[0]

    return (
        <div className="flex flex-col pt-3">
            {!isLoading ? (
                <div>loading...</div>
            ) : (
                <>
                    <div className="flex flex-col p-5 shadow-md bg-muted space-y-2">
                        <h1 className="font-semibold text-lg">{post.title}</h1>
                        <p className="text-xs text-muted-foreground">
                            {post.created_at}
                        </p>
                    </div>
                    <div className="flex flex-col px-5 py-10">
                        <p>{post.content}</p>
                    </div>
                    <div className="flex flex-row justify-center space-x-10 items-center w-[100%] py-4 ">
                        <UpdatePost
                            postId={postId}
                            buttonClassName="w-[50px] h-[40px] bg-muted rounded-md flex justify-center items-center md:opacity-60 hover:opacity-100"
                        />
                        <DeletePost
                            postId={postId}
                            buttonClassName="w-[50px] h-[40px] bg-muted rounded-md flex justify-center items-center md:opacity-60 hover:opacity-100"
                        />
                    </div>
                    <div className="flex flex-row justify-center space-x-10 items-center w-[100%] py-4 pb-10">
                        <Button className="rounded-full w-[100px] h-[40px] text-white ">
                            <Link href="/write">새 글쓰기</Link>
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
