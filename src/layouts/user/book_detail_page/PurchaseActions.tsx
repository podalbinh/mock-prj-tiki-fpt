import { Button, InputNumber, Card } from "antd";

export default function PurchaseActions() {
    return (
        <Card>
            <div className="mb-4">
                <span className="block text-gray-500">Tạm tính</span>
                <span className="text-2xl font-bold text-red-500">110.000₫</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
                <span>Số lượng</span>
                <InputNumber min={1} defaultValue={1} />
            </div>
            <Button type="primary" danger block size="large">
                Mua ngay
            </Button>
            <Button block size="large" className="mt-2">
                Thêm vào giỏ
            </Button>
            <Button block size="large" className="mt-2">
                Mua trước trả sau
            </Button>
        </Card>
    );
}
