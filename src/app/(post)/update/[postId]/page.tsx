import WritePostHeader from '@/components/pages/post/write/WritePostHeader'
import EditPost from '@/components/pages/post/write/EditPost'

export default async function UpdatePostPage({
    params,
}: {
    params: Promise<{ postId: string }>
}) {
    const { postId } = await params

    return (
        <div className="flex flex-col items-center w-full h-full">
            <WritePostHeader title="글 수정하기" />
            <EditPost postId={Number(postId)} />
        </div>
    )
}
