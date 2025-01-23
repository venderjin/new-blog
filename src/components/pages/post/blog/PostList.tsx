import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePostStore } from '@/store/usePostStore'
import { LoadPostsOnMount } from '@/components/pages/LoadPostsOnMount'

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

// 게시물 타입 정의
interface Post {
    id: number
    title: string
    content: string
    created_at: string
}

export default function PostList({
    search,
    postId,
}: {
    search: string
    postId: number
}) {
    // 제목의 최대 길이를 조절하는 상태
    const [maxLength, setMaxLength] = useState<number>(30)
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

    // 게시물 목록을 가져오는 함수
    const isLoading = LoadPostsOnMount()

    // zustand 상태에서 게시물 목록 가져오기
    const posts = usePostStore((state) => state.posts)

    // 검색어를 포함하는 게시물 필터링
    useEffect(() => {
        if (posts.length > 0 && search.trim() !== '') {
            console.log('filtering')
            setFilteredPosts(
                posts.filter((post) =>
                    post.title
                        .toLowerCase()
                        .includes(search.trim().toLowerCase()),
                ),
            )
        } else {
            setFilteredPosts(posts) // 검색어가 비어있으면 전체 리스트 반환
        }
    }, [search, posts])

    // Pagination 관련 상태
    const [currentPage, setCurrentPage] = useState<number>(1)
    const postsPerPage = 3 // 페이지당 게시물 수 설정

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleResize = () => {
            setMaxLength(window.innerWidth > 768 ? 100 : 30)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // postId가 있는 페이지를 찾고 이동
    useEffect(() => {
        if (postId && filteredPosts.length > 0) {
            const targetIndex = filteredPosts.findIndex(
                (post) => post.id === postId,
            )
            if (targetIndex !== -1) {
                setCurrentPage(Math.floor(targetIndex / postsPerPage) + 1)
            }
        }
    }, [postId, posts])

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

    // 현재 페이지에서 보여줄 게시물 추출
    const startIndex = (currentPage - 1) * postsPerPage
    const currentPosts = filteredPosts.slice(
        startIndex,
        startIndex + postsPerPage,
    )

    // 페이지네이션 버튼 로직
    const pageNumbers =
        totalPages <= 3
            ? Array.from({ length: totalPages }, (_, index) => index + 1)
            : currentPage === 1
            ? [1, 2, 3]
            : currentPage === totalPages
            ? [totalPages - 2, totalPages - 1, totalPages]
            : [currentPage - 1, currentPage, currentPage + 1]

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    return (
        <div className="flex flex-col justify-start h-[240px]">
            {/* 테이블 영역 */}
            <div className="h-[185px] bg-muted shadow-sm">
                <Table className="bg-white">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center w-[55%] md:w-[70%] h-[50px]">
                                제목
                            </TableHead>
                            <TableHead className="text-center w-[30%] md:w-[20%] h-[50px]">
                                작성일
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {!isLoading ? (
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    colSpan={2}
                                    className="text-center bg-gray-100 text-gray-500"
                                >
                                    게시물 로딩중입니다.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : filteredPosts.length > 0 ? (
                        <TableBody>
                            {currentPosts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell
                                        className={`${
                                            post.id === postId
                                                ? 'underline font-medium'
                                                : ''
                                        } h-[45px] p-1`}
                                    >
                                        <Link
                                            href={`/blog/${post.id}`}
                                            shallow
                                            className="w-full h-full flex items-center justify-center"
                                        >
                                            {post.title.length > maxLength
                                                ? post.title.slice(
                                                      0,
                                                      maxLength,
                                                  ) + '...'
                                                : post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-center h-[45px] p-1">
                                        {post.created_at
                                            .split(' ')
                                            .slice(0, 3)
                                            .join(' ')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    colSpan={2}
                                    className="text-center bg-gray-100 text-gray-500"
                                >
                                    게시물이 없습니다.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </div>

            {/* 페이지네이션 영역 */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center h-[50px] my-[5px]">
                    <Pagination>
                        <PaginationContent>
                            {/* 이전 페이지 버튼 */}
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    className={`cursor-pointer ${
                                        currentPage === 1
                                            ? 'opacity-30 cursor-not-allowed'
                                            : ''
                                    }`}
                                />
                            </PaginationItem>

                            {/* 페이지 번호 버튼 */}
                            {pageNumbers.map((pageNumber) => (
                                <PaginationItem key={pageNumber}>
                                    <button
                                        onClick={() =>
                                            handlePageChange(pageNumber)
                                        }
                                        className={`${
                                            currentPage === pageNumber
                                                ? 'bg-muted-foreground text-white shadow-sm h-7 w-7 text-sm text-center'
                                                : 'bg-muted shadow-sm hover:bg-muted-foreground hover:text-foreground hover:text-white h-7 w-7 text-sm text-center'
                                        } rounded-md transition-colors duration-300 ease-in-out`}
                                    >
                                        {pageNumber}
                                    </button>
                                </PaginationItem>
                            ))}

                            {/* 다음 페이지 버튼 */}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    className={`cursor-pointer ${
                                        currentPage === totalPages
                                            ? 'opacity-30 cursor-not-allowed'
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
