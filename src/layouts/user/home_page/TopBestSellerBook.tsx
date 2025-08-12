import {Link} from "react-router-dom";
import {useBook} from "@/hooks/useBook.ts";
import {useEffect, useState} from "react";
import type {Book} from "@/constant/interfaces.ts";
import usePrice from "@/hooks/usePrice.ts";

export default function TopBestSellerBook() {
    const { getTopSellingBooks } = useBook();
    const [books, setBooks] = useState<Book[]>([]);
    const { formattedPrice } = usePrice();

    useEffect(() => {
        const fetchTopSellingBooks = async () => {
            try {
                const result = await getTopSellingBooks();
                setBooks(result); // gán vào state
            } catch (error) {
                console.error("Failed to fetch top selling books:", error);
            }
        };

        fetchTopSellingBooks().then(r => console.log(r));
    }, []);

    return <div className="flex flex-col my-2 p-4 bg-white">
        <h2 className="text-xl font-medium">
            Top Bán Chạy Sản Phẩm Nhà Sách Tiki
        </h2>
        <div>
            <ol className={ "list-decimal pl-8 flex flex-col gap-2.5"}>
                {books.map((book) => (
                    <li key={book.id}>
                        <Link to={""} className="flex gap-2.5 text-sm">
                            <span className="text-[#0B74E5] font-[400] hover:text-[#0B74E5]">{book.name}</span>
                            <div className="flex-1"></div>
                            <span className="text-black hover:text-black">{formattedPrice(book.list_price)}<sup>₫</sup></span>
                        </Link>
                    </li>
                ))}

            </ol>
        </div>
    </div>
}