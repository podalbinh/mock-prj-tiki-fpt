import { Typography, Rate } from "antd";
import 'antd/dist/reset.css';
import type {Book} from "@/constant/interfaces.ts";
import {formattedPrice} from "@/utils/priceHelper.ts";

interface BookInfoProps {
    book: Book | undefined;
}


export default function BookInfo({ book }: BookInfoProps) {
    const authors = book?.authors || [];
    const title = book?.name || "";
    const listPrice = book?.listPrice || 0;
    const originalPrice = book?.originalPrice || 0;
    const ratingAverage = book?.ratingAverage || 0.0;

    const discount =
        originalPrice > 0 && listPrice < originalPrice
            ? Math.floor(((originalPrice - listPrice) / originalPrice) * 100)
            : 0;

    return (
        <div className={"flex flex-col gap-4"}>
            {/* Hiển thị tác giả */}
            <Typography.Text >
            {"Tác giả: "}
            {authors.length > 0
                ? authors.map((author, index) => (
                    <span key={author.id || index}>
                              {author.name ? (
                                  <a
                                      href=""
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[#0B74E5] font-[400] hover:text-[#0B74E5]"
                                  >
                                      {author.name}
                                  </a>
                              ) : (
                                  author.name
                              )}
                        {index < authors.length - 1 && (
                            <span className="text-[#0B74E5]">, </span>
                        )}
                          </span>
                ))
                : "Không rõ tác giả"}
        </Typography.Text>

            {/* Tiêu đề */}
            <p className={"text-xl font-medium mb-0"} >{title}</p>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-black">{ratingAverage}</span>
                <Rate disabled value={ratingAverage} style={{ fontSize: 16}}/>
            </div>

            {/* Giá & giảm giá */}
            <div className="flex items-center gap-2">
                <span className="text-red-500 text-2xl font-bold">
                    {formattedPrice(listPrice)}
                    <sup>₫</sup>
                </span>
                {originalPrice > 0 && (
                    <>
                        {discount > 0 && (
                            <span className="text-black font-semibold bg-gray-100 rounded-full px-2 py-1 text-xs">
                                -{discount}%
                            </span>
                        )}
                        <span className="line-through text-gray-500 text-sm">
                            {formattedPrice(originalPrice)}
                            <sup>₫</sup>
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
