import {Button, InputNumber, Card, App} from "antd";
import type {Book} from "@/constant/interfaces.ts";
import {useState} from "react";
import {formattedPrice} from "@/utils/priceHelper.ts";
import {useNavigate} from "react-router";
import {type RootState, useAppDispatch} from "@/store";
import { addToCart } from "@/store/slices/cartSlice.ts";
import { useSelector } from "react-redux";
import {useModal} from "@/hooks/useModal.ts";
import {selectUser} from "@/store/slices/authSlice.ts";

interface PurchaseActionsProps {
    book: Book | undefined;
}


export default function PurchaseActions({ book }: PurchaseActionsProps) {
    const [quantity, setQuantity] = useState(1);
    const totalPrice = book ? book.listPrice * quantity : 0;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const items = useSelector((state: RootState) => state.cart.items);
    const { message } = App.useApp();
    const { openLoginModal } = useModal();
    const user = useSelector(selectUser);

    const onClickBuyNow = () => {
        if (!user) {
            openLoginModal();
            return;
        }

        navigate("/payment", {
            state: { bookId: book?.id, quantity: quantity}
        });
    }

    const onClickAddToCart = () => {
        if (!user) {
            openLoginModal();
            return;
        }

        if (!book?.id) return;
        const exists = items.some((item) => item.productId === book.id);

        if (exists) {
            message.error("Sản phẩm này đã có trong giỏ hàng!");
            return;
        }

        dispatch(
            addToCart({
                productId: book?.id,
                quantity: quantity
            })
        );
        message.success("Thêm sản phẩm vào giỏ hàng thành công");
    }

    return (
        <Card>
            <div className="flex flex-col gap-2 mb-4">
                <p className="text-sm font-semibold mb-0">Số lượng</p>
                <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => setQuantity(value || 1)} // đảm bảo luôn ≥ 1
                    className="w-16"
                />
            </div>
            <div className="mb-4">
                <span className="block font-semibold">Tạm tính</span>
                <span className="text-2xl font-semibold">{formattedPrice(totalPrice)}<sup>₫</sup></span>
            </div>
            <div className="flex flex-col gap-2">
                <Button
                    type={"primary"}
                    danger
                    block
                    size="large"
                    className={"rounded"}
                    onClick={onClickBuyNow}
                >
                    Mua ngay
                </Button>
                <Button
                    block size="large"
                    style={{color: "#0A68FF", borderColor: "#0A68FF"}}
                    className={"rounded"}
                    onClick={onClickAddToCart}
                >
                    Thêm vào giỏ
                </Button>
                <Button
                    block size="large"
                    style={{color: "#0A68FF", borderColor: "#0A68FF"}}
                    className={"rounded"}
                >
                    Mua trước trả sau
                </Button>
            </div>
        </Card>
    );
}
