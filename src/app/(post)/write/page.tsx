'use client'

import { useState } from 'react'

import WritePostHeader from '@/components/pages/post/write/WritePostHeader'
import WritePost from '@/components/pages/post/write/WritePost'
import SavePost from '@/components/pages/post/write/SavePost'

export default function WritePostPage() {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    return (
        <div className="flex flex-col items-center w-full h-full">
            <WritePostHeader title="글쓰기" />
            <WritePost
                title={title}
                content={content}
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent}
            />
            <SavePost
                title={title}
                content={content}
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent}
                type="POST"
            />
        </div>
    )
}
