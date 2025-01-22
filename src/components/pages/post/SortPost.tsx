import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface SortPostProps {
    sort: string
    setSort: (value: string) => void
}

export default function SortPost({ sort, setSort }: SortPostProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="absolute inset-y-0 left-3 md:left-15 top-3"
                    variant="outline"
                    size="icon"
                >
                    ▼
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                    <DropdownMenuRadioItem value="basic">
                        기본순
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="latest">
                        최신순
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="title">
                        제목순
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
