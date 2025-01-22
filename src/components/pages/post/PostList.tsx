import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePostStore } from '@/store/usePostStore'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

export default function PostList({ search }: { search: string }) {
    const [maxLength, setMaxLength] = useState(20)

    const posts = usePostStore((state) => state.posts)
    const filteredPosts = posts.filter((post) =>
        post.title.includes(search.trim()),
    )

    // Pagination 상태
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 1 // 페이지당 표시할 게시물 수

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleResize = () =>
            setMaxLength(window.innerWidth > 768 ? 50 : 20)

        // 초기 설정 및 리스너 추가
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // 페이지네이션 로직
    const totalPages = Math.ceil(posts.length / postsPerPage)
    const startIndex = (currentPage - 1) * postsPerPage
    const currentPosts = filteredPosts.slice(
        startIndex,
        startIndex + postsPerPage,
    )

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="h-[165px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center w-3/5 md:w-4/5 h-[45px]">
                                제목
                            </TableHead>
                            <TableHead className="text-center w-2/5 md:w-1/5 h-[45px]">
                                작성일
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentPosts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="text-center w-3/5 md:w-4/5 h-[40px]">
                                    <Link href={`/blog/${post.id}`}>
                                        {post.title.length > maxLength
                                            ? post.title.slice(0, maxLength) +
                                              '...'
                                            : post.title}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center w-2/5 md:w-1/5 h-[40px]">
                                    {post.created_at
                                        .split(' ')
                                        .slice(0, 3)
                                        .join(' ')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex my-2 justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    className={`cursor-pointer ${
                                        currentPage === 1
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''
                                    }`}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <PaginationItem key={i}>
                                    <button
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`${
                                            currentPage === i + 1
                                                ? 'bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 text-sm text-center'
                                                : 'bg-muted shadow-sm hover:bg-muted-foreground hover:text-foreground hover:text-white h-7 w-7 text-sm text-center'
                                        } rounded-md transition-all duration-300`}
                                    >
                                        {i + 1}
                                    </button>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    className={`cursor-pointer ${
                                        currentPage === totalPages
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''
                                    }`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}
