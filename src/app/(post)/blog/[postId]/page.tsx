// import { Suspense } from 'react'
import PostHeader from '@/components/pages/post/PostHeader'

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ postId: string }>
}) {
    const { postId } = await params

    return (
        <div className="flex flex-col pt-3">
            <PostHeader postId={postId} />
            <h1>Post ID: {postId}</h1>
        </div>
    )
}
