import Image from 'next/image'
import backgrounImage from '../../../../public/assets/blog_background_image.jpg'
import AddPost from '@/components/pages/post/AddPost'

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
                <AddPost />
                <div className="w-[250px] text-end text-white font-bold text-3xl lg:text-4xl tracking-wide">
                    My Blog
                </div>
            </div>
        </div>
    )
}
