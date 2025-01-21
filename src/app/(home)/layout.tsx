export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full h-screen md:max-w-[900px] mx-auto overflow-auto">
            {children}
        </div>
    )
}
