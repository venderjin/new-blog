export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full md:max-w-[1000px] mx-auto overflow-x-auto">
            {children}
        </div>
    )
}
