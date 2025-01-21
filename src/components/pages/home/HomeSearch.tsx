import Image from 'next/image'
import searchImage from '../../../../public/assets/searchLogo.png'

export default function HomeSearch() {
    const src = searchImage

    return (
        <div className="h-[70px] relative w-full flex items-center justify-center px-4">
            <div className="relative w-full">
                <input
                    type="text"
                    className="h-[45px] w-full rounded-full bg-white px-5 pr-12 text-gray-700 text-sm focus:outline-none shadow-md "
                    placeholder="제목을 입력하세요"
                />
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <Image
                        src={src}
                        alt="Search"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}
