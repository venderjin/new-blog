import Image from 'next/image'
import { Button } from '@/components/ui/button'
import backgrounImage from '../../../../public/assets/blog_background_image.jpg'
import Link from 'next/link'

export default function HomeMainImage() {
    const src = backgrounImage

    return (
        <div className="w-full h-[250px] relative bg-white overflow-hidden">
            <Image
                src={src}
                alt="Blog Background"
                fill
                className="object-scale-down"
                priority
            />
            <div className="absolute inset-0 flex flex-row items-end justify-between p-5 bg-black bg-opacity-50">
                <Button className="rounded-full w-[80px] h-[40px] text-white ">
                    <Link href="/write">글쓰기</Link>
                </Button>
                <div className="w-[250px] text-end text-white font-bold text-3xl lg:text-4xl tracking-wide">
                    My Blog
                </div>
            </div>
        </div>
    )
}
