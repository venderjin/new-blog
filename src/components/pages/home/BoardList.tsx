import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import Link from 'next/link'

const invoices = [
    {
        invoice: 'INV001',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV002',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV003',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV004',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV005',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV006',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV007',
        paymentMethod: 'Credit Card',
    },
]

export default function BoardList() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center w-4/5">제목</TableHead>
                    <TableHead className="text-right w-1/5 pr-5">
                        작성일
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium text-center hover:cursor-pointer hover:font-bold">
                            <Link href={`/blog/${invoice.invoice}`}>
                                {invoice.paymentMethod}
                            </Link>
                        </TableCell>
                        <TableCell className="text-right pr-5">
                            {invoice.invoice}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
