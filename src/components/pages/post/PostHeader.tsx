'use client'

import React, { useState } from 'react'

import HomeSearch from '@/components/pages/home/HomeSearch'
import PostList from '@/components/pages/post/PostList'

export default function PostHeader() {
    const [search, setSearch] = useState<string>('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className="flex flex-col justify-center h-[300px]">
            <HomeSearch search={search} onChange={onChange} />
            <PostList search={search} />
        </div>
    )
}
