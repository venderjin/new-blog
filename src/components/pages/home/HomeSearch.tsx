import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'
import searchImage from '../../../../public/assets/searchIcon.png'
import deleteIcon from '../../../../public/assets/deleteIcon.png'

interface HomeSearchProps {
    search: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function HomeSearch({ search, onChange }: HomeSearchProps) {
    const src = searchImage
    const { toast } = useToast()

    const onClickDelete = () => {
        if (search === '') {
            toast({
                description: '검색어를 입력하세요.',
                duration: 3000,
                variant: 'warning',
            })
            return
        } else {
            toast({
                description: '검색어가 삭제되었습니다.',
                duration: 3000,
            })
            onChange({
                target: { value: '' },
            } as React.ChangeEvent<HTMLInputElement>)
        }
    }

    return (
        <div className="h-[70px] relative w-full flex items-center justify-center px-4">
            <div className="relative w-full">
                <input
                    type="text"
                    className="h-[45px] w-full rounded-full bg-white px-12 text-gray-700 text-sm focus:outline-none shadow-md "
                    placeholder="제목을 입력하세요"
                    value={search}
                    onChange={onChange}
                />
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <Image
                        src={src}
                        alt="Search"
                        width={22}
                        height={22}
                        className="cursor-pointer"
                    />
                </div>
                <div
                    className="absolute inset-y-0 right-3 flex items-center px-3"
                    onClick={onClickDelete}
                >
                    <Image
                        src={deleteIcon}
                        alt="Delete"
                        width={22}
                        height={22}
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}
