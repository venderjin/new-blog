'use client'

import React, { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

import HomeMainImage from '@/components/pages/home/HomeMainImage'
import HomeSearch from '@/components/pages/home/HomeSearch'
import PostList from '@/components/pages/home/PostList'

export default function HomePage() {
    const [search, setSearch] = useState<string>('')
    const { toast } = useToast()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onClickDelete = () => {
        if (search !== '') {
            toast({
                description: '검색어가 삭제되었습니다.',
                duration: 3000,
                variant: 'alert',
            })
        }
        setSearch('')
    }

    return (
        <main className="flex flex-col">
            <HomeMainImage />
            <HomeSearch
                search={search}
                onChange={onChange}
                onClickDelete={onClickDelete}
            />
            <PostList search={search} />
        </main>
    )
}
