'use client'

import React, { useState } from 'react'

import HomeMainImage from '@/components/pages/home/HomeMainImage'
import HomeSearch from '@/components/pages/home/HomeSearch'
import HomePostList from '@/components/pages/home/HomePostList'

export default function HomePage() {
    const [search, setSearch] = useState<string>('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className="flex flex-col">
            <HomeMainImage />
            <HomeSearch search={search} onChange={onChange} />
            <HomePostList search={search} />
        </div>
    )
}
