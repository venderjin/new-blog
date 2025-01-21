import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import Link from 'next/link'
import { usePostStore } from '@/store/usePostStore'

export default function BoardList({ search }: { search: string }) {
    const posts = usePostStore((state) => state.posts)
    const filteredPosts = posts.filter((post) =>
        post.title.includes(search.trim()),
    )

    return (
        <div className="w-full max-h-[calc(100dvh-320px)] overflow-y-auto">
            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
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
                                    <Link href={`/blog/${post.id}`}>
                                        {post.title}
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
