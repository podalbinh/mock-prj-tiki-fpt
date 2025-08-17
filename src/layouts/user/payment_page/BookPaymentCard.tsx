import type {Book} from "@/constant/interfaces.ts";
import {formattedPrice} from "@/utils/priceHelper.ts";

interface BookPaymentCardProps {
    book: Book;
    quantity: number;
}

export default function BookPaymentCard({book, quantity}: BookPaymentCardProps) {
    return <div className="flex gap-2 w-2/4">
        <div
            style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#ffffff",
                borderRadius: 8,
                overflow: "hidden"
            }}

            className={"border border-gray-200 rounded-lg"}
        >
            <img
                src={book.images[0].baseUrl || ""}
                alt="Book"
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                }}
            />
        </div>
        <div className="flex-1 flex flex-col">
            <div className="text-sm text-gray-400 line-clamp-1">
                {book.name}
            </div>
            <div className="flex items-center gap-1">
                <div className={"flex-1 text-gray-400"}>
                    SL: x{quantity}
                </div>
                <div className="text-gray-400 line-through text-xs">
                    {formattedPrice(quantity * book.originalPrice)} ₫
                </div>
                <div className="text-red-500 text-sm font-medium">
                    {formattedPrice(quantity * book.listPrice)} ₫
                </div>
            </div>
        </div>
    </div>
}