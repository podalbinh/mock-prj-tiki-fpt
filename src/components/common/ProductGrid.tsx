
import { Card, Select, Checkbox, Divider, Tag, Rate } from 'antd';
import ProductCard from './ProductCard';
const { Option } = Select;

export default function ProductGrid() {
    const products = [
        {
            id: 1,
            title: 'Sách - Lão Tử Đạo Đức Kinh (Bách Gia Tinh Hoa) - SBOOKS',
            author: 'NGÔ TẤT TỐ',
            price: 69000,
            originalPrice: 99000,
            discount: 30,
            rating: 0,
            sold: 0,
            image: '/placeholder.svg?height=200&width=200',
            hasAd: true
        },
        {
            id: 2,
            title: 'CỔ HỌC TINH HOA - Ôn Như Nguyễn Văn Ngọc + Từ An Trần Lê Nhân',
            author: '',
            price: 119000,
            originalPrice: 168000,
            discount: 29,
            rating: 0,
            sold: 0,
            image: '/placeholder.svg?height=200&width=200',
            hasAd: true
        },
        {
            id: 3,
            title: 'Sách Excel Ứng Dụng Văn Phòng ĐÀO TẠO TIN HỌC Từ Cơ Bản Đến Nâng Cao Có Kèm Video Khóa Học',
            author: 'NGUYỄN QUANG VINH',
            price: 169290,
            originalPrice: 199000,
            discount: 15,
            rating: 5,
            sold: 1518,
            image: '/placeholder.svg?height=200&width=200',
            hasAd: true
        },
        {
            id: 4,
            title: 'Sách - Binh Pháp Tôn Tử Và 36 Kế - SBOOKS',
            author: '',
            price: 69000,
            originalPrice: 99000,
            discount: 30,
            rating: 5,
            sold: 58,
            image: '/placeholder.svg?height=200&width=200',
            hasAd: true
        },
        {
            id: 5,
            title: 'Sách - Sự Kỳ Diệu Của Ngôn Từ (Vintage Lover KP) - SBOOKS',
            author: '',
            price: 79000,
            originalPrice: 118000,
            discount: 33,
            rating: 0,
            sold: 3,
            image: '/placeholder.svg?height=200&width=200',
            hasAd: true
        },
        {
            id: 6,
            title: 'NEXUS - Lược Sử Của Những Mạng Lưới Thông Tin Từ Thời Đại Đồ Đá Đến Trí Tuệ Nhân Tạo',
            author: 'YUVAL NOAH HARARI',
            price: 211363,
            originalPrice: 325000,
            discount: 35,
            rating: 5,
            sold: 0,
            image: '/placeholder.svg?height=200&width=200',
            hasAd: false,
            hasTikiNow: true
        },
        {
            id: 7,
            title: 'Chat GPT Thực Chiến',
            author: 'DỊCH DƯƠNG, PHAN TRÁCH BÂN, L…',
            price: 110000,
            originalPrice: 169000,
            discount: 35,
            rating: 5,
            sold: 2321,
            image: '/placeholder.svg?height=200&width=200',
            hasAd: false,
            hasTikiNow: true
        },
        {
            id: 8,
            title: 'Dẫn Dắt Một Bầy Sói Hay Chăn Một Đàn Cừu',
            author: 'TIFFANI BOVA',
            price: 127000,
            originalPrice: 195000,
            discount: 35,
            rating: 5,
            sold: 1988,
            image: '/placeholder.svg?height=200&width=200',
            hasAd: false,
            hasTikiNow: true
        }
    ];

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN');
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tất cả sản phẩm</h3>

                {/* Filters */}
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Sắp xếp</span>
                    <Select defaultValue="popular" style={{ width: 120 }}>
                        <Option value="popular">Phổ biến</Option>
                        <Option value="price-asc">Giá thấp đến cao</Option>
                        <Option value="price-desc">Giá cao đến thấp</Option>
                    </Select>
                </div>
            </div>

            {/* Filter tags */}
            <div className="flex items-center space-x-4 mb-6">
                <Checkbox>
                    <Tag color="blue" className="m-0">Giao siêu tốc 2H</Tag>
                </Checkbox>
                <Divider type="vertical" />
                <Checkbox>
                    <Tag color="red" className="m-0">Siêu rẻ</Tag>
                </Checkbox>
                <Divider type="vertical" />
                <Checkbox>
                    <span className="flex items-center space-x-2">
                        <span>từ 4 sao</span>
                        <Rate disabled defaultValue={4} className="text-xs" />
                    </span>
                </Checkbox>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
                ))}
            </div>
        </Card>
    );
}
