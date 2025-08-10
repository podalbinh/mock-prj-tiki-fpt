import { useEffect, useRef, useState, useCallback } from 'react';
import { Card, Select, Checkbox, Divider, Rate, Spin } from 'antd';
import ProductCard from './ProductCard';
import { Request } from '@/config/api';
import { API_ENDPOINTS } from '@/constant/endpoint';
import { useLoading } from '@/hooks/useLoading';
import type { Product, ProductSearchResponse } from '@/constant/interfaces';

const { Option } = Select;

export default function ProductGrid() {
    // Loading context
    const { showLoading, hideLoading } = useLoading();
    
    // API state
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    
    // Sorting
    const [sort, setSort] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
    
    // Filters
    const [filters, setFilters] = useState({
        minRating: 0,
        hasTikiNow: false,
        isTopDeal: false,
        isFreeshipXtra: false
    });
    
    // Pagination
    const PAGE_SIZE = 8;
    
    // Infinite scroll ref
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    
    // Sử dụng ref để theo dõi page hiện tại
    const currentPageRef = useRef(0);
    
    // Flag để kiểm tra xem có đang reset pagination hay không
    const isResettingRef = useRef(false);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN');
    };

    // Fetch products from API
    const fetchProducts = async (page: number, sortBy: string, append: boolean = false) => {
        try {
            setLoading(true);
            
            // Tạo params object
            const params: any = {
                page: page,
                size: PAGE_SIZE,
                sortBy: sortBy === 'popular' ? 'popular' : sortBy === 'price-asc' ? 'price_asc' : 'price_desc'
            };
            
            // Chỉ thêm minRating khi người dùng chọn filter này (minRating > 0)
            if (filters.minRating > 0) {
                params.minRating = filters.minRating;
            }
            
            const response = await Request.get<ProductSearchResponse>(
                API_ENDPOINTS.SEARCH_PRODUCTS,
                { params }
            );
            
            console.log('Products API Response:', response);
            
            if (response && response.content) {
                let filteredProducts = response.content;
                
                // Apply client-side filters - chỉ áp dụng khi filter được bật (true)
                if (filters.hasTikiNow === true) {
                    filteredProducts = filteredProducts.filter(product => product.hasTikiNow === true);
                }
                if (filters.isTopDeal === true) {
                    filteredProducts = filteredProducts.filter(product => product.isTopDeal === true);
                }
                if (filters.isFreeshipXtra === true) {
                    filteredProducts = filteredProducts.filter(product => product.isFreeshipXtra === true);
                }
                
                if (append) {
                    setProducts(prev => [...prev, ...filteredProducts]);
                } else {
                    setProducts(filteredProducts);
                }
                
                // Cập nhật hasMore dựa trên số lượng sản phẩm thực tế sau khi filter
                const actualPageSize = filteredProducts.length;
                setHasMore(!response.last && actualPageSize === PAGE_SIZE);
                setTotalElements(response.totalElements);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Reset pagination when filters or sort change
    const resetPagination = () => {
        isResettingRef.current = true; // Set flag
        setCurrentPage(0);
        currentPageRef.current = 0;
        setProducts([]);
        setHasMore(true);
        
        // Reset flag sau một khoảng thời gian ngắn
        setTimeout(() => {
            isResettingRef.current = false;
        }, 100);
    };

    // Handle filter changes with loading overlay
    const handleFilterChange = async (filterName: keyof typeof filters, value: boolean | number) => {
        // Hiển thị loading overlay khi thay đổi filter
        showLoading('Đang tải sản phẩm...');
        
        // Reset pagination và đợi state cập nhật
        resetPagination();
        
        // Cập nhật filter state
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
        
        try {
            // Thêm delay nhỏ để người dùng nhìn thấy loading
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Luôn gọi API với page 0 sau khi thay đổi filter
            await fetchProducts(0, sort, false);
        } finally {
            // Ẩn loading overlay
            hideLoading();
        }
    };

    // Handle sort change with loading overlay
    const handleSortChange = async (value: 'popular' | 'price-asc' | 'price-desc') => {
        // Hiển thị loading overlay khi thay đổi sort
        showLoading('Đang sắp xếp sản phẩm...');
        
        // Reset pagination và đợi state cập nhật
        resetPagination();
        
        setSort(value);
        
        try {
            // Thêm delay nhỏ để người dùng nhìn thấy loading
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Luôn gọi API với page 0 sau khi thay đổi sort
            await fetchProducts(0, value, false);
        } finally {
            // Ẩn loading overlay
            hideLoading();
        }
    };

    // Initial load
    useEffect(() => {
        resetPagination();
        fetchProducts(0, sort, false);
    }, []); // Chỉ chạy 1 lần khi component mount

    // Load more function
    const loadMore = () => {
        // Kiểm tra xem có đang reset pagination hay không
        if (loading || !hasMore || isResettingRef.current) return;
        
        const nextPage = currentPageRef.current + 1;
        setCurrentPage(nextPage);
        currentPageRef.current = nextPage;
        fetchProducts(nextPage, sort, true);
    };

    // Intersection observer for infinite scroll
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasMore && !loading && !isResettingRef.current) {
                    loadMore();
                }
            },
            { root: null, rootMargin: '200px', threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasMore, loading]);

    return (
        <Card 
            className="bg-[#F7F7FA] !border-none !shadow-none !bg-transparent"
            classNames={{ body: '!p-0' }}
            style={{
                backgroundColor: '#F7F7FA',
            }}
        >
            {/* Filter and Sort Section */}
            <div className="p-4 bg-white rounded-lg shadow-sm border">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Tất cả sản phẩm</h2>
                
                {/* Filter Options */}
                <div className="flex flex-wrap gap-4 mb-4">
                    <Checkbox
                        checked={filters.hasTikiNow}
                        onChange={(e) => handleFilterChange('hasTikiNow', e.target.checked)}
                        className="flex items-center"
                    >
                        <span className="text-red-500 font-bold mr-1">NOW</span>
                        <span className="text-gray-700">Giao siêu tốc 2H</span>
                    </Checkbox>
                    
                    <Checkbox
                        checked={filters.isTopDeal}
                        onChange={(e) => handleFilterChange('isTopDeal', e.target.checked)}
                        className="flex items-center"
                    >
                        <span className="text-red-500 mr-1">👍</span>
                        <span className="text-red-500 font-bold mr-1">TOP DEAL</span>
                        <span className="text-gray-700">Siêu rẻ</span>
                    </Checkbox>
                    
                    <Checkbox
                        checked={filters.isFreeshipXtra}
                        onChange={(e) => handleFilterChange('isFreeshipXtra', e.target.checked)}
                        className="flex items-center"
                    >
                        <span className="text-blue-500 font-bold mr-1">FREESHIP</span>
                        <span className="text-green-500 font-bold">XTRA</span>
                    </Checkbox>
                    
                    <Checkbox
                        checked={filters.minRating > 0}
                        onChange={(e) => handleFilterChange('minRating', e.target.checked ? 4 : 0)}
                        className="flex items-center"
                    >
                        <Rate disabled defaultValue={4} className="mr-2" />
                        <span className="text-gray-700">từ 4 sao</span>
                    </Checkbox>
                </div>
                
                {/* Sort Section */}
                <div className="flex items-center">
                    <span className="text-gray-600 mr-3">Sắp xếp</span>
                    <Select
                        value={sort}
                        onChange={handleSortChange}
                        className="w-32"
                        size="middle"
                    >
                        <Option value="popular">Phổ biến</Option>
                        <Option value="price-asc">Giá tăng dần</Option>
                        <Option value="price-desc">Giá giảm dần</Option>
                    </Select>
                </div>
            </div>
            
            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pb-2 pt-4 bg-[#F7F7FA] mt-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-lg"
                    >
                        <ProductCard product={product} formatPrice={formatPrice} />
                    </div>
                ))}
            </div>

            {/* Sentinel + Loading */}
            <div ref={sentinelRef} className="h-2 bg-[#F7F7FA]" />
            <div className="flex justify-center py-2 bg-[#F7F7FA]">
                {loading && <Spin />}
                {!hasMore && products.length > 0 && (
                    <span className="text-gray-500">Đã hiển thị tất cả sản phẩm</span>
                )}
            </div>
        </Card>
    );
}
