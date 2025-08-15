import { Radio, Card } from "antd";
import {formattedPrice} from "@/utils/priceHelper.ts";
import BookPaymentCard from "@/layouts/user/payment_page/BookPaymentCard.tsx";
import {RightOutlined} from "@ant-design/icons";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Book} from "@/constant/interfaces.ts";
import {useBook} from "@/hooks/useBook.ts";
import {useCart} from "@/hooks/useCart.ts";

interface BookSold {
    book: Book;
    quantity: number;
}

export default function DeliveryMethod() {
    const location = useLocation();
    const { getBookById } = useBook();
    const [bookCart, setBookCart] = useState<BookSold[]>([]);
    const { cartItems } = useCart();

    useEffect(() => {
        if (location.state?.selectedCartItems) {
            // Xử lý state mới với selectedCartItems
            (async () => {
                const selectedItems = location.state.selectedCartItems;
                const books = await Promise.all(
                    selectedItems.map(async (item: any) => {
                        if (!item.productId) return;
                        const data = await getBookById(item.productId);
                        return {
                            book: data,
                            quantity: item.quantity || 1
                        };
                    })
                );

                const validBooks = books.filter(
                    (b): b is { book: Book; quantity: number } => b !== undefined
                );

                setBookCart(validBooks);
            })();
            return;
        }

        if (location.state?.bookId) {
            // Xử lý state cũ (backward compatibility)
            (async () => {
                const data = await getBookById(location.state.bookId);
                setBookCart([
                    {
                        book: data,
                        quantity: location.state.quantity || 1
                    }
                ]);
            })();
            return;
        }

        if (cartItems.length === 0) {
            setBookCart([]);
            return;
        }

        (async () => {
            const books = await Promise.all(
                cartItems.map(async (item) => {
                    if (!item.productId) return;
                    const data = await getBookById(item.productId || 0);
                    return {
                        book: data,
                        quantity: item.quantity || 1
                    };
                })
            );

            const validBooks = books.filter(
                (b): b is { book: Book; quantity: number } => b !== undefined
            );

            setBookCart(validBooks);
        })();

    }, [location.state, cartItems]);


    return (
        <Card className={"rounded"}>
            <p className="text-lg font-bold">Chọn hình thức giao hàng</p>
            <div className="flex flex-col space-y-2 bg-[#F0F8FF] border rounded-lg p-4 mt-4 w-2/4">
                <Radio.Group className="flex flex-col space-y-2">
                    <Radio value="fast">
                        <div className="flex items-center">
                            <img
                                src="src/assets/now.svg"
                                alt="Tiki"
                                className="h-4 mr-2"
                            />
                            <div>
                                Giao siêu tốc 2h <span className="text-green-600 bg-white rounded">-25K</span>
                            </div>
                        </div>
                    </Radio>
                    <Radio value="save">
                        Giao tiết kiệm <span className="text-green-600 bg-white rounded">-16K</span>
                    </Radio>
                </Radio.Group>
            </div>

            <div className="mt-4 border p-4 rounded-xl border-[#DDDDE3]">
                {/*Hiển thị thông tin giao hàng đã chọn*/}
                <div className="flex items-center">
                    <img
                        src="src/assets/package.svg"
                        alt="Tiki"
                        className="h-4 mr-2"
                    />
                    <div className="text-green-600 bg-white">
                       Gói: Giao siêu tốc 2h, trước 13h hôm nay
                    </div>
                </div>

                <div className="flex mt-2 w-2/4 items-center">
                    <div className="flex items-center">
                        <img
                            src="src/assets/now.svg"
                            alt="Tiki"
                            className="h-4 mr-2"
                        />
                        <div>
                            Giao siêu tốc 2H
                        </div>
                    </div>
                    <div className={"flex-1"}></div>
                    <div className="flex items-center gap-2 justify-center">
                        <div className={"text-gray-500 line-through text-xs font-medium"}>
                            {formattedPrice(25000)} ₫
                        </div>
                        <div className="text-green-600 font-medium text-sm font-medium">
                            MIỄN PHÍ
                        </div>
                    </div>
                    <img
                        src="src/assets/info.svg"
                        alt="Tiki"
                        className="h-3 mx-1"
                    />
                </div>

                {/*Hiển thị thông tin sách mua*/}
                <div className="flex flex-col gap-2 mt-2">
                    {
                        bookCart.map((book) => (
                            <BookPaymentCard
                                key={book.book.id}
                                book={book.book}
                                quantity={book.quantity}
                            />
                        ))
                    }
                </div>
            </div>

            <hr className={"my-3"}/>

            <div className={"flex items-center"}>
                <img
                    src="src/assets/discount.svg"
                    alt="Tiki"
                    className="h-4 mr-2"
                />
                <div className="text-sm font-normal">
                    Thêm mã khuyến mãi của Shop
                </div>
                <RightOutlined className={"text-gray-400 ml-2"}/>
            </div>

        </Card>
    );
}
