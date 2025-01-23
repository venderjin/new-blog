'use client'
import { useState, useEffect } from 'react'
import { usePostStore } from '@/store/usePostStore'

export function LoadPostsOnMount() {
    const loadPosts = usePostStore((state) => state.loadPosts)
    const posts = usePostStore((state) => state.posts)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadPosts()
        setIsLoading(false)
    }, [loadPosts])

    if (isLoading && posts.length === 0) {
        return false
    }

    return true
}
