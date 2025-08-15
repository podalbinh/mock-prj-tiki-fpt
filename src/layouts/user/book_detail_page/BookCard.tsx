import { Card, Rate} from 'antd';
import type {Book} from '@/constant/interfaces';
import {useNavigate} from "react-router-dom";
import {formattedPrice} from "@/utils/priceHelper.ts";
import {useEffect, useState } from 'react';

interface BookCardProps {
    book: Book | undefined;
}

export default function BookCard({ book }: BookCardProps) {
    const navigate = useNavigate();
    const [showAd, setShowAd] = useState(false);

    useEffect(() => {
        setShowAd(Math.random() < 0.5);
    }, [book?.id]);

    return (
        <Card
            hoverable
            bordered
            className="rounded-lg overflow-hidden hover:shadow-md transition-shadow !border-[#EBEBF0] !bg-white"
            classNames={{ body: '!p-0' }}
            onClick={() => navigate(`/books/${book?.id}`)}
        >
            <div className="relative flex flex-col items-start gap-1 px-2 pb-4 h-[235px]">
                {/* Picture area */}
                <div
                    className="relative rounded-lg flex items-center justify-center bg-white"
                    style={{ width: 130, height: 130, overflow: "hidden" }}
                >
                    <img
                        src={book?.images?.[0]?.thumbnailUrl || '/placeholder.svg'}
                        alt={book?.name || "Book"}
                        className="max-w-full max-h-full object-contain"
                    />
                    {showAd && (
                        <span className="absolute top-2 right-2 rounded-md bg-[#F5F5FA] border border-white text-[#27272A] text-[10px] font-bold px-2 py-[2px] uppercase">
            AD
        </span>
                    )}
                </div>

                <div className="">
                    <h4 className="text-xs line-clamp-2">
                        {book?.name || '-'}
                    </h4>
                </div>

                <div className={"flex-1"}>
                    {(book?.ratingAverage || 0) > 0 && (
                        <Rate disabled value={book?.ratingAverage}
                              style={{ fontSize: 12 }}
                        />

                    )}
                </div>

                {/* Price */}
                <div className="font-medium text-sm">
                    {formattedPrice((book?.listPrice || 0))}
                    <sup>₫</sup>
                </div>

            </div>
        </Card>
    );
}
