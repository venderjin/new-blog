import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import Image from 'next/image'
import deleteIcon from '../../../../../public/assets/deleteIcon.png'

interface WritePostProps {
    title: string
    content: string
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function WritePost({
    title,
    content,
    onChangeContent,
    onChangeTitle,
}: WritePostProps) {
    const onClickDelete = (type: string) => {
        if (type === 'title') {
            onChangeTitle({
                target: { value: '' },
            } as React.ChangeEvent<HTMLInputElement>)
        } else if (type === 'content') {
            onChangeContent({
                target: { value: '' },
            } as React.ChangeEvent<HTMLTextAreaElement>)
        }
    }

    return (
        <div className="p-5 flex flex-col space-y-5 md:max-w-[1200px] w-full">
            <div className="relative flex flex-row items-center justify-between">
                <div className="space-y-2 w-full">
                    <Label htmlFor="title" className="font-medium text-lg pl-2">
                        제목
                    </Label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="제목"
                        onChange={onChangeTitle}
                        value={title}
                        className={`pr-10 focus:outline-none bg-muted ${
                            title && title === '...로딩중'
                                ? 'cursor-not-allowed text-muted-foreground text-sm'
                                : ''
                        }`}
                    />
                </div>
                <div
                    className="absolute h-9 bottom-0 right-0 flex items-center px-3"
                    onClick={() => {
                        onClickDelete('title')
                    }}
                >
                    <Image
                        src={deleteIcon}
                        alt="Delete"
                        width={22}
                        height={22}
                        className="cursor-pointer"
                        priority
                    />
                </div>
            </div>
            <div className="relative flex flex-row items-center justify-between">
                <div className="space-y-2 w-full">
                    <Label
                        htmlFor="content"
                        className="font-medium text-lg pl-2"
                    >
                        내용
                    </Label>
                    <Textarea
                        placeholder="내용을 입력해주세요"
                        id="content"
                        onChange={onChangeContent}
                        value={content}
                        className={`h-[300px] pr-10 focus:outline-none bg-muted ${
                            content && content === '...로딩중'
                                ? 'cursor-not-allowed text-muted-foreground text-sm'
                                : ''
                        }`}
                    />
                </div>
                <div
                    className="absolute h-9 top-10 right-0 flex items-center px-3"
                    onClick={() => {
                        onClickDelete('content')
                    }}
                >
                    <Image
                        src={deleteIcon}
                        alt="Delete"
                        width={22}
                        height={22}
                        className="cursor-pointer"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}
