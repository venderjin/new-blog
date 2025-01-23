import PostHeader from '@/components/pages/post/blog/PostHeader'
import MainPost from '@/components/pages/post/blog/MainPost'

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ postId: string }>
}) {
    const { postId } = await params

    return (
        <div className="flex flex-col w-full items-center">
            <PostHeader postId={Number(postId)} />
            <MainPost postId={Number(postId)} />
        </div>
    )
}
