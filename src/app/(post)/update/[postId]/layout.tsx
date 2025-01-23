export default async function UpdateLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <main className="w-full h-dvh mx-auto overflow-auto">
                {children}
            </main>
        </>
    )
}
