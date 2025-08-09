
import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Select, Checkbox, Divider, Rate, Spin } from 'antd';
import ProductCard from './ProductCard';
const { Option } = Select;

export default function ProductGrid() {
    const baseProducts = [
        {
            id: 1,
            title: 'Sách - Lão Tử Đạo Đức Kinh (Bách Gia Tinh Hoa) - SBOOKS',
            author: 'NGÔ TẤT TỐ',
            price: 69000,
            originalPrice: 99000,
            discount: 30,
            rating: 4,
            sold: 128,
            image: '/placeholder.svg?height=200&width=200',
            hasAd: true,
            isTopDeal: true,
            isFreeshipXtra: true
        },
        {
            id: 2,
            title: 'CỔ HỌC TINH HOA - Ôn Như Nguyễn Văn Ngọc + Từ An Trần Lê Nhân',
            author: '',
            price: 119000,
            originalPrice: 168000,
            discount: 29,
            rating: 4,
            sold: 87,
            image: '/placeholder.svg?height=200&width=200',
            hasAd: true,
            isTopDeal: true,
            isFreeshipXtra: true
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
            hasAd: true,
            isFreeshipXtra: true,
            isAuthentic: true
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
            hasAd: true,
            isFreeshipXtra: true
        },
        {
            id: 5,
            title: 'Sách - Sự Kỳ Diệu Của Ngôn Từ (Vintage Lover KP) - SBOOKS',
            author: '',
            price: 79000,
            originalPrice: 118000,
            discount: 33,
            rating: 4,
            sold: 312,
            image: '/placeholder.svg?height=200&width=200',
            hasAd: true,
            isTopDeal: true
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

    // Expand mock data to simulate many pages
    const allProducts = useMemo(() => {
        const repeatTimes = 8; // ~8 * 8 = 64 items
        const expanded = Array.from({ length: repeatTimes }).flatMap((_, idx) =>
            baseProducts.map((p) => ({
                ...p,
                id: p.id + idx * 1000,
            }))
        );
        return expanded;
    }, []);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN');
    };

    // Sorting
    const [sort, setSort] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
    const sortedProducts = useMemo(() => {
        const cloned = [...allProducts];
        switch (sort) {
            case 'price-asc':
                cloned.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                cloned.sort((a, b) => b.price - a.price);
                break;
            default:
                // Popular: sort by sold desc, then rating desc
                cloned.sort((a, b) => (b.sold || 0) - (a.sold || 0) || (b.rating || 0) - (a.rating || 0));
        }
        return cloned;
    }, [allProducts, sort]);

    // Infinite scroll state
    const PAGE_SIZE = 12;
    const [displayed, setDisplayed] = useState<typeof sortedProducts>([]);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const hasMore = displayed.length < sortedProducts.length;

    // Reset when sort changes
    useEffect(() => {
        setDisplayed(sortedProducts.slice(0, PAGE_SIZE));
    }, [sortedProducts]);

    const loadMore = () => {
        if (loading || !hasMore) return;
        setLoading(true);
        // Simulate async fetch
        setTimeout(() => {
            const next = sortedProducts.slice(displayed.length, displayed.length + PAGE_SIZE);
            setDisplayed((prev) => [...prev, ...next]);
            setLoading(false);
        }, 300);
    };

    // Intersection observer
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    loadMore();
                }
            },
            { root: null, rootMargin: '200px', threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sentinelRef.current, loading, hasMore, displayed.length, sortedProducts]);

    return (
        <Card bodyStyle={{ padding: 0 }}>
            <div className="px-4 pt-4 mb-4">
                <h3 className="text-[16px] leading-6 font-semibold text-[#27272A]">Tất cả sản phẩm</h3>
            </div>

            {/* Filter tags */}
            <div className="filter-bar flex items-center flex-wrap gap-4 px-4 mb-4">
                <Checkbox>
                    <span className="flex items-center gap-2 text-sm">
                        <img src="src/assets/now.png" alt="NOW" className="h-[18px]" />
                        <span>Giao siêu tốc 2H</span>
                    </span>
                </Checkbox>
                <Divider type="vertical" className="!h-6" style={{ borderInlineStartColor: '#EBEBF0' }} />
                <Checkbox>
                    <span className="flex items-center gap-2 text-sm">
                        <img src="src/assets/top-deal.png" alt="TOP DEAL" className="h-4" />
                        <span>Siêu rẻ</span>
                    </span>
                </Checkbox>
                <Divider type="vertical" className="!h-6" style={{ borderInlineStartColor: '#EBEBF0' }} />
                <Checkbox>
                    <img src="src/assets/freeship-extra.png" alt="FREESHIP XTRA" className="h-4" />
                </Checkbox>
                <Divider type="vertical" className="!h-6" style={{ borderInlineStartColor: '#EBEBF0' }} />
                <Checkbox>
                    <span className="flex items-center gap-2 text-sm">
                        <Rate disabled defaultValue={4} className="text-xs" />
                        <span>từ 4 sao</span>
                    </span>
                </Checkbox>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3 px-4 mb-6">
                <span className="text-[14px] leading-[21px] text-[#808089]">Sắp xếp</span>
                <Select
                    size="middle"
                    value={sort}
                    onChange={(val) => setSort(val as typeof sort)}
                    className="sort-select"
                    style={{ width: 140 }}
                >
                    <Option value="popular">Phổ biến</Option>
                    <Option value="price-asc">Giá thấp đến cao</Option>
                    <Option value="price-desc">Giá cao đến thấp</Option>
                </Select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pb-2 pt-2"
            style={{ background: '#F7F7FA' }}
            >
                {displayed.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-lg pt-2"
                    >
                        <ProductCard product={product} formatPrice={formatPrice} />
                    </div>
                ))}
            </div>

            {/* Sentinel + Loading */}
            <div ref={sentinelRef} className="h-2" />
            <div className="flex justify-center py-4">
                {loading && <Spin />}
                {!loading && !hasMore && (
                    <span className="text-xs text-gray-400">Đã hiển thị tất cả sản phẩm</span>
                )}
            </div>
        </Card>
    );
}
