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

export default function PostList({
    search,
    postId,
}: {
    search: string
    postId: string
}) {
    // 제목의 최대 길이를 조절하는 상태
    const [maxLength, setMaxLength] = useState(20)

    // zustand 상태에서 게시물 목록 가져오기
    const posts = usePostStore((state) => state.posts)

    // 검색어를 포함하는 게시물 필터링
    const filteredPosts = posts.filter((post) =>
        post.title.includes(search.trim()),
    )

    // postId가 있는 페이지를 찾는 함수
    useEffect(() => {
        console.log('postId:', postId)
        if (postId) {
            const targetIndex = filteredPosts.findIndex(
                (post) => post.id === Number(postId),
            )
            if (targetIndex !== -1) {
                setCurrentPage(Math.floor(targetIndex / postsPerPage) + 1)
            }
        }
    }, [postId, posts])

    // Pagination 관련 상태
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 3 // 페이지당 게시물 수 설정

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleResize = () =>
            setMaxLength(window.innerWidth > 768 ? 50 : 20)

        // 윈도우 크기에 따른 제목 길이 조정
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

    // 현재 페이지에서 보여줄 게시물 추출
    const startIndex = (currentPage - 1) * postsPerPage
    const currentPosts = filteredPosts.slice(
        startIndex,
        startIndex + postsPerPage,
    )

    // 페이지네이션 버튼 로직
    let pageNumbers: number[] = []
    if (totalPages <= 3) {
        // 페이지가 3개 이하일 경우 전체 표시
        pageNumbers = Array.from(
            { length: totalPages },
            (_, index) => index + 1,
        )
    } else {
        if (currentPage === 1) {
            pageNumbers = [1, 2, 3]
        } else if (currentPage === totalPages) {
            pageNumbers = [totalPages - 2, totalPages - 1, totalPages]
        } else {
            pageNumbers = [currentPage - 1, currentPage, currentPage + 1]
        }
    }

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    return (
        <div className="flex flex-col justify-start h-[210px]">
            {/* 테이블 영역 */}
            <div className="h-[165px] bg-muted shadow-sm">
                <Table className="bg-white">
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
                    {filteredPosts.length > 0 ? (
                        <TableBody>
                            {currentPosts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell
                                        className={`${
                                            post.id === Number(postId)
                                                ? 'underline font-medium'
                                                : ''
                                        } text-center w-3/5 md:w-4/5 h-[40px]`}
                                    >
                                        <Link href={`/blog/${post.id}`} shallow>
                                            {post.title.length > maxLength
                                                ? post.title.slice(
                                                      0,
                                                      maxLength,
                                                  ) + '...'
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
                <div className="flex justify-center items-center h-[40px] mt-[5px]">
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
