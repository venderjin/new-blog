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
        <div className="flex flex-col h-[310px] w-full">
            <div className="bg-black flex flex-col items-center">
                <div className="flex flex-row items-center justify-center w-full md:max-w-[1200px] bg-black h-[60px] md:h-[80px]">
                    <Home />
                    <HomeSearch search={search} onChange={onChange} />
                </div>
            </div>
            <div className="bg-white flex flex-col items-center">
                <PostList search={search} postId={postId} />
            </div>
        </div>
    )
}
