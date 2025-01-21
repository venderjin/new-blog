import Image from 'next/image'
import backgrounImage from '../../../../public/assets/blog_background_image.jpg'

export default function HomeMainImage() {
    const src = backgrounImage

    return (
        <div className="w-full h-[250px] relative bg-white overflow-hidden">
            <Image
                src={src}
                alt="Blog Background"
                fill
                className="object-scale-down"
            />
            <div className="absolute inset-0 flex items-end justify-end bg-black bg-opacity-50">
                <div className="w-[250px] text-end p-4 text-white font-bold text-3xl lg:text-4xl tracking-wide shadow-md">
                    My Blog
                </div>
            </div>
        </div>
    )
}
