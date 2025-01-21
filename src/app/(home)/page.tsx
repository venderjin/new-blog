'use client'

import React, { useState } from 'react'

import HomeMainImage from '@/components/pages/home/HomeMainImage'
import HomeSearch from '@/components/pages/home/HomeSearch'
import PostList from '@/components/pages/home/PostList'

export default function HomePage() {
    const [search, setSearch] = useState<string>('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <main className="flex flex-col">
            <HomeMainImage />
            <HomeSearch search={search} onChange={onChange} />
            <PostList search={search} />
        </main>
    )
}
