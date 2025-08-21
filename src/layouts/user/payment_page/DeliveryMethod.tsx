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
    const [isFast, setIsFast] = useState<boolean>(true);
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

    const showDeliveryMethod = () => {
        if (isFast) return (
            <div className="flex items-center">
                <img
                    src="../../../../public/assets/now.svg"
                    alt="Tiki"
                    className="h-4 mr-2"
                />
                <div>
                    Giao siêu tốc 2H
                </div>
            </div>
        );

        return (
            <div>
                Giao tiết kiệm
            </div>
        );
    }

    return (
        <Card className={"rounded"}>
            <p className="text-lg font-bold">Chọn hình thức giao hàng</p>
            <div className="relative flex flex-col space-y-2 bg-[#F0F8FF] border border-[#C2E1FF] rounded-lg p-4 mb-12 mt-4 w-full md:w-3/4 lg:w-2/4
            after:content-[''] after:absolute after:-bottom-[9px]
            after:left-1/2 after:-translate-x-1/2
            after:w-4 after:h-4 after:bg-[#F0F8FF] after:border-b
            after:border-r after:border-[#C2E1FF] after:rotate-45">
                <Radio.Group
                    className="flex flex-col space-y-2"
                    defaultValue={isFast ? "fast" : "save"}
                    onChange={(e) => setIsFast(e.target.value === "fast")}
                >
                    <Radio value="fast">
                        <div className="flex items-center">
                            <img
                                src="../../../../public/assets/now.svg"
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

            <div className="mt-4 border p-4 rounded-xl border-[#DDDDE3] relative">
                {/*Hiển thị thông tin giao hàng đã chọn*/}
                <div className="absolute -top-3 left-4 flex items-center bg-white">
                    <img
                        src="../../../../public/assets/package.svg"
                        alt="Tiki"
                        className="h-4 mr-2"
                    />
                    <div className="text-green-600 ">
                       Gói: {isFast ? "Giao siêu tốc 2h, trước 13h hôm nay" : "Giao tiết kiệm, trước 13h ngày mai"}
                    </div>
                </div>

                <div className="flex mt-2 items-center w-full md:w-3/4 lg:w-2/4">
                    { showDeliveryMethod() }
                    <div className={"flex-1"}></div>
                    <div className="flex items-center gap-2 justify-center">
                        <div className={"text-gray-500 line-through text-xs font-medium"}>
                            {formattedPrice(isFast ? 25000 : 16000)} ₫
                        </div>
                        <div className="text-green-600 font-medium text-sm font-medium">
                            MIỄN PHÍ
                        </div>
                    </div>
                    <img
                        src="../../../../public/assets/info.svg"
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
                    src="../../../../public/assets/discount.svg"
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
