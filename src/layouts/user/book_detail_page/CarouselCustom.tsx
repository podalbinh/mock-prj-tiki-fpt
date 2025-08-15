import type {Book} from "@/constant/interfaces.ts";
import BookCard from "@/layouts/user/book_detail_page/BookCard.tsx";
import {useState} from "react";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

interface CarouselCustomProps {
    books: Book[];
    columns: number;
    rows: number;
}

export default function CarouselCustom({ books, columns, rows }: CarouselCustomProps) {
    const itemsPerPage = columns * rows;
    const totalPages = Math.ceil(books.length / itemsPerPage);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full">
            <div className="overflow-hidden relative group">
                {/* Dải slide */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {Array.from({ length: totalPages }).map((_, pageIndex) => {
                        const start = pageIndex * itemsPerPage;
                        const pageBooks = books.slice(start, start + itemsPerPage);

                        return (
                            <div key={pageIndex} className="flex-shrink-0 w-full">
                                <div
                                    className="grid gap-0 w-full"
                                    style={{
                                        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                                    }}
                                >
                                    {pageBooks.map((book) => (
                                        <div key={book.id} className="overflow-hidden p-2">
                                            <BookCard book={book} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Nút trái */}
                <button
                    onClick={handlePrevious}
                    style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)" }}
                    className="absolute bg-white rounded-full shadow-xl p-2 left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                    <LeftOutlined className={"text-blue-500 text-2xl font-bold"} />
                </button>

                {/* Nút phải */}
                <button
                    onClick={handleNext}
                    style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)" }}
                    className="absolute bg-white rounded-full p-2 right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                    <RightOutlined className={"text-blue-500 text-2xl font-bold"}/>
                </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-[24px] h-[2px] mb-3 rounded transition-colors ${
                            index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
