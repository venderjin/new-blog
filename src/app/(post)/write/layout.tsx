export default async function WriteLayout({
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
