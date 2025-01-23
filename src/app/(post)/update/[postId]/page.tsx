export default async function UpdatePostPage({
    params,
}: {
    params: Promise<{ postId: string }>
}) {
    const { postId } = await params

    return (
        <div className="flex flex-col pt-3">
            <h1 className="text-2xl font-bold">Edit Post</h1>
            <p>postId : {postId}</p>
        </div>
    )
}
