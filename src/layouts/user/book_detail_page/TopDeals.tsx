import type {Book} from "@/constant/interfaces.ts";
import {useEffect, useState} from "react";
import {useBook} from "@/hooks/useBook.ts";
import CarouselCustom from "@/layouts/user/book_detail_page/CarouselCustom";
import { useMediaQuery } from "react-responsive";


export default function TopDeals() {
    const [books, setBooks] = useState<Book[]>([]);
    const { getTopSellingBooks } = useBook();
    const isLg = useMediaQuery({ minWidth: 1024 });
    const isMd = useMediaQuery({ minWidth: 768 });

    // Chỉ chạy 1 lần để lấy toàn bộ sách
    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getTopSellingBooks();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div>
                <p className={"text-md font-semibold mb-0"} >Top Deals</p>
            </div>
            <CarouselCustom books={books} columns={isLg ? 4 : isMd ? 3 : 2} rows={1}/>
        </div>
    );
}