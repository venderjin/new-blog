export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="w-full h-screen md:max-w-[900px] mx-auto overflow-auto">
            {children}
        </main>
    )
}
