import type {Book} from "@/constant/interfaces.ts";
import {useEffect, useState} from "react";
import {useBook} from "@/hooks/useBook.ts";
import CarouselCustom from "@/layouts/user/book_detail_page/CarouselCustom";
import { useMediaQuery } from "react-responsive";

interface SimilarProductsProps {
    book: Book | undefined;
}

export default function SimilarProducts({book}: SimilarProductsProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const { getAllBooks } = useBook();
    const isLg = useMediaQuery({ minWidth: 1024 });

    // Chỉ chạy 1 lần để lấy toàn bộ sách
    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getAllBooks();
            setAllBooks(data);
        };
        fetchBooks();
    }, []);

    // Khi allBooks thay đổi -> lọc sách tương tự
    useEffect(() => {
        if (!book?.categoriesId) {
            setBooks(allBooks);
            return;
        }
        if (allBooks.length > 0) {
            setBooks(allBooks.filter((b) => b.categoriesId === book?.categoriesId));
        }
    }, [allBooks, book?.categoriesId]);

    return (
        <div className="flex flex-col gap-4">
            <div>
                <p className={"text-md font-semibold mb-0"} >Sản phẩm tương tự</p>
            </div>
            <CarouselCustom books={books} columns={isLg ? 4 : 3} rows={2}/>
        </div>
    );
}