import { Button, InputNumber, Card } from "antd";
import type {Book} from "@/constant/interfaces.ts";
import {useState} from "react";
import {formattedPrice} from "@/utils/priceHelper.ts";

interface PurchaseActionsProps {
    book: Book | undefined;
}


export default function PurchaseActions({ book }: PurchaseActionsProps) {
    const [quantity, setQuantity] = useState(1);
    const totalPrice = book ? book.listPrice * quantity : 0;

    const onClickBuyNow = () => {
        return
    }

    const onClickAddToCart = () => {
        return
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
