import { Typography, Rate } from "antd";
import type {Book} from "@/constant/interfaces.ts";
import {useEffect} from "react";

interface BookInfoProps {
    book: Book | undefined;
}


export default function BookInfo({ book }: BookInfoProps) {
    // const authors = book.authors;
    // const title = book.name;
    // const listPrice = book.listPrice;
    // const originalPrice = book.originalPrice;
    const ratingAverage = book?.ratingAverage || 0;

    useEffect(() => {

    }, []);

    return (
        <div>
            <Typography.Text>
                Tác giả: Dịch Dương, Phan Trách Bân, Lý Thế Minh
            </Typography.Text>
            <Typography.Title level={3}>
                Chat GPT Thực Chiến
            </Typography.Title>
            <Rate disabled defaultValue={ratingAverage} />{" "}
            <span className="ml-2 text-sm text-gray-500">{ratingAverage}</span>
            <div className="mt-3">
                <span className="text-red-500 text-2xl font-bold">110.000₫</span>
                <span className="ml-2 line-through text-gray-400">169.000₫</span>
                <span className="ml-2 text-red-500 font-semibold">-35%</span>
            </div>
        </div>
    );
}
