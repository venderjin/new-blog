import HomeMainImage from '@/components/pages/home/HomeMainImage'
import HomeSearch from '@/components/pages/home/HomeSearch'
import BoardList from '@/components/pages/home/BoardList'

export default function HomePage() {
    return (
        <main>
            <HomeMainImage />
            <HomeSearch />
            <BoardList />
        </main>
    )
}
