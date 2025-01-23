'use client'

import React, { useState } from 'react'

import HomeSearch from '@/components/pages/home/HomeSearch'
import PostList from '@/components/pages/post/blog/PostList'
import Home from '@/components/images/Home'

export default function PostHeader({ postId }: { postId: number }) {
    const [search, setSearch] = useState<string>('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className="flex flex-col justify-center h-[310px]">
            <div className="flex flex-row items-center justify-center">
                <Home />
                <HomeSearch search={search} onChange={onChange} />
            </div>
            <PostList search={search} postId={postId} />
        </div>
    )
}
