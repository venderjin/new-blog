import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePostStore } from '@/store/usePostStore'
import DeletePost from '@/components/pages/post/DeletePost'

export default function BoardList({ search }: { search: string }) {
    const [maxLength, setMaxLength] = useState(20)

    const posts = usePostStore((state) => state.posts)
    const filteredPosts = posts.filter((post) =>
        post.title.includes(search.trim()),
    )

    useEffect(() => {
        // 윈도우 크기에 따라 제목 길이 조정
        const handleResize = () => {
            setMaxLength(window.innerWidth > 768 ? 40 : 15)
        }

        // 초기 설정 및 리스너 추가
        handleResize()
        window.addEventListener('resize', handleResize)

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="w-full max-h-[calc(100dvh-320px)] overflow-y-auto">
            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
                // Hide scrollbar for IE, Edge and Firefox
            `}</style>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center w-3/5 md:w-4/5 py-3">
                            제목
                        </TableHead>
                        <TableHead className="text-center w-2/5 md:w-1/5 pr-5 py-3">
                            작성일
                        </TableHead>
                    </TableRow>
                </TableHeader>
                {filteredPosts.length > 0 ? (
                    <TableBody>
                        {filteredPosts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium text-center hover:cursor-pointer hover:font-bold">
                                    <DeletePost id={post.id} />
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="px-4 py-1 md:px-20"
                                    >
                                        {post.title.length > maxLength
                                            ? post.title.slice(0, maxLength) +
                                              '...'
                                            : post.title}
                                        {/* 길이가 maxLength보다 길면 maxLength만큼만 보여주고 나머지는 ...으로 표시 */}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center pr-5">
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
    )
}
