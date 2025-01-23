'use client'
import { useEffect, useState } from 'react'

import { usePostStore } from '@/store/usePostStore'
import WritePost from '@/components/pages/post/write/WritePost'
import SavePost from '@/components/pages/post/write/SavePost'

export default function EditPost({ postId }: { postId: number }) {
    const [title, setTitle] = useState<string>('...로딩중')
    const [content, setContent] = useState<string>('...로딩중')

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    // zustand 상태에서 게시물 목록 가져오기
    const post = usePostStore((state) => state.posts).filter(
        (post) => post.id === postId,
    )[0]

    useEffect(() => {
        if (post) {
            setTitle(post.title || '...로딩중')
            setContent(post.content || '...로딩중')
        }
    }, [postId, post])

    return (
        <>
            <WritePost
                title={title}
                content={content}
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent}
            />
            <SavePost
                postId={postId}
                title={title}
                content={content}
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent}
                type="UPDATE"
            />
        </>
    )
}
