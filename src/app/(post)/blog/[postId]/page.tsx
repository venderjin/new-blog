import PostHeader from '@/components/pages/post/PostHeader'
import MainPost from '@/components/pages/post/MainPost'

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ postId: string }>
}) {
    const { postId } = await params

    return (
        <div className="flex flex-col pt-3">
            <PostHeader postId={Number(postId)} />
            <MainPost postId={Number(postId)} />
        </div>
    )
}
