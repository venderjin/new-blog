import { useState, useEffect } from 'react'
import Link from 'next/link'

import DeletePost from '@/components/pages/post/DeletePost'
import SortPost from '@/components/pages/post/SortPost'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { usePostStore } from '@/store/usePostStore'
import { LoadPostsOnMount } from '@/components/pages/LoadPostsOnMount'

export default function BoardList({ search }: { search: string }) {
    const [maxLength, setMaxLength] = useState(20)
    const [sort, setSort] = useState<string>('basic')

    const isLoading = LoadPostsOnMount()

    const posts = usePostStore((state) => state.posts)
    const filteredPosts = posts.filter((post) =>
        post.title.includes(search.trim()),
    )

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleResize = () =>
            setMaxLength(window.innerWidth > 768 ? 50 : 12)

        // 초기 설정 및 리스너 추가
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    /// 날짜 문자열을 Date 객체로 변환하는 함수
    const parseDate = (dateString: string) => {
        // 날짜 문자열을 '. ' 기준으로 분할
        const parts = dateString.split('. ')

        const year = parseInt(parts[0], 10) // 연도
        const month = parseInt(parts[1], 10) - 1 // 월 (0부터 시작)
        const day = parseInt(parts[2], 10) // 일

        // 오전/오후 처리 및 시간 분리
        const timeParts = parts[3].split(' ')
        const isPM = timeParts[0] === '오후'
        const [hours, minutes, seconds] = timeParts[1].split(':').map(Number)

        // 12시간제 처리
        const formattedHours = isPM ? (hours % 12) + 12 : hours % 12

        return new Date(
            year,
            month,
            day,
            formattedHours,
            minutes,
            seconds,
        ).getTime()
    }

    // 정렬 로직
    const sortedPosts = [...filteredPosts].sort((a, b) => {
        switch (sort) {
            case 'basic':
                return a.id - b.id // 기본순 (ID 오름차순)
            case 'latest':
                return parseDate(b.created_at) - parseDate(a.created_at) // 최신순 (작성일 내림차순)
            case 'title':
                return a.title.localeCompare(b.title) // 제목순 (가나다순)
            default:
                return 0
        }
    })

    return (
        <div className="w-full max-h-[calc(100dvh-320px)] overflow-y-auto pb-10">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center w-3/5 md:w-4/5 h-[50px] pl-8">
                            <SortPost sort={sort} setSort={setSort} />
                            제목
                        </TableHead>
                        <TableHead className="text-center w-2/5 md:w-1/5 h-[50px]">
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
                ) : (
                    <>
                        {filteredPosts.length > 0 ? (
                            <TableBody>
                                {sortedPosts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell className="text-center w-3/5 md:w-4/5 h-[45px] pl-8">
                                            <DeletePost
                                                postId={post.id}
                                                buttonClassName="absolute left-3 md:left-15 px-2 hover:opacity-80 opacity-40"
                                            />
                                            <Link href={`/blog/${post.id}`}>
                                                {post.title.length > maxLength
                                                    ? post.title.slice(
                                                          0,
                                                          maxLength,
                                                      ) + '...'
                                                    : post.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-center w-2/5 md:w-1/5 h-[45px]">
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
                    </>
                )}
            </Table>
        </div>
    )
}
