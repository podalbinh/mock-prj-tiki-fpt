import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Card, Select, Checkbox, Rate, Spin } from "antd";
import ProductCard from "./ProductCard";
import { Request } from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import { useLoading } from "@/hooks/useLoading";
import type { Product, ProductSearchResponse } from "@/constant/interfaces";
import { FilterOutlined } from "@ant-design/icons";

const { Option } = Select;

export interface ProductGridRef {
  handleCategorySelect: (categoryId: number | null) => void;
}

const tabs = [
  { id: "popular", label: "Phổ biến" },
  { id: "bestselling", label: "Bán chạy" },
  { id: "new", label: "Hàng mới" },
  { id: "price", label: "Giá" },
];

const ProductGrid = forwardRef<ProductGridRef>((props, ref) => {
  // Loading context
  const { showLoading, hideLoading } = useLoading();

  // API state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Category filter
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  // Sorting
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc">(
    "popular"
  );

  // Filters
  const [filters, setFilters] = useState({
    minRating: 0,
    hasTikiNow: false,
    isTopDeal: false,
    isFreeshipXtra: false,
  });

  // Pagination
  const PAGE_SIZE = 8;

  // Infinite scroll ref
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Sử dụng ref để theo dõi page hiện tại
  const currentPageRef = useRef(0);

  // Flag để kiểm tra xem có đang reset pagination hay không
  const isResettingRef = useRef(false);
  const [activeTab, setActiveTab] = useState("popular");
  const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    handleCategorySelect: (categoryId: number | null) => {
      setSelectedCategoryId(categoryId);

      // Reset pagination when category changes
      resetPagination();

      // Call fetchProducts directly with the categoryId parameter
      fetchProductsWithCategory(0, sort, false, categoryId);
    },
  }));

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  // Fetch products from API with specific categoryId
  const fetchProductsWithCategory = async (
    page: number,
    sortBy: string,
    append: boolean = false,
    categoryId: number | null = null
  ) => {
    try {
      setLoading(true);

      // Tạo params object
      const params: any = {
        page: page,
        size: PAGE_SIZE,
        sortBy:
          sortBy === "popular"
            ? "popular"
            : sortBy === "price-asc"
            ? "price_asc"
            : "price_desc",
      };

      // Chỉ thêm minRating khi người dùng chọn filter này (minRating > 0)
      if (filters.minRating > 0) {
        params.minRating = filters.minRating;
      }

      // Thêm categoryId nếu có category được chọn
      if (categoryId !== null) {
        params.categoryId = categoryId;
      }

      const response = await Request.get<ProductSearchResponse>(
        API_ENDPOINTS.SEARCH_PRODUCTS,
        { params }
      );

      if (response && response.content) {
        let filteredProducts = response.content;

        // Apply client-side filters - chỉ áp dụng khi filter được bật (true)
        if (filters.hasTikiNow === true) {
          filteredProducts = filteredProducts.filter(
            (product) => product.hasTikiNow === true
          );
        }
        if (filters.isTopDeal === true) {
          filteredProducts = filteredProducts.filter(
            (product) => product.isTopDeal === true
          );
        }
        if (filters.isFreeshipXtra === true) {
          filteredProducts = filteredProducts.filter(
            (product) => product.isFreeshipXtra === true
          );
        }

        if (append) {
          setProducts((prev) => [...prev, ...filteredProducts]);
        } else {
          setProducts(filteredProducts);
        }

        // Cập nhật hasMore dựa trên số lượng sản phẩm thực tế sau khi filter
        const actualPageSize = filteredProducts.length;
        setHasMore(!response.last && actualPageSize === PAGE_SIZE);
        setTotalElements(response.totalElements);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products from API (uses selectedCategoryId from state)
  const fetchProducts = async (
    page: number,
    sortBy: string,
    append: boolean = false
  ) => {
    return fetchProductsWithCategory(page, sortBy, append, selectedCategoryId);
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
  const handleFilterChange = async (
    filterName: keyof typeof filters,
    value: boolean | number
  ) => {
    // Hiển thị loading overlay khi thay đổi filter
    showLoading("Đang tải sản phẩm...");

    // Reset pagination và đợi state cập nhật
    resetPagination();

    // Cập nhật filter state
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));

    try {
      // Thêm delay nhỏ để người dùng nhìn thấy loading
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Luôn gọi API với page 0 sau khi thay đổi filter
      await fetchProducts(0, sort, false);
    } finally {
      // Ẩn loading overlay
      hideLoading();
    }
  };

  // Handle sort change with loading overlay
  const handleSortChange = async (
    value: "popular" | "price-asc" | "price-desc"
  ) => {
    // Hiển thị loading overlay khi thay đổi sort
    showLoading("Đang sắp xếp sản phẩm...");

    // Reset pagination và đợi state cập nhật
    resetPagination();

    setSort(value);

    try {
      // Thêm delay nhỏ để người dùng nhìn thấy loading
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Luôn gọi API với page 0 sau khi thay đổi sort
      await fetchProducts(0, value, false);
    } finally {
      // Ẩn loading overlay
      hideLoading();
    }
  };

  const handleTabClick = (tabId: string) => {
    if (tabId === "price") {
      setPriceSort((prev) => (prev === "desc" ? "asc" : "desc"));
      setActiveTab(tabId);
      handleSortChange(`price-${priceSort === "asc" ? "desc" : "asc"}`);
      return;
    }
    setActiveTab(tabId);
    handleSortChange(tabId as "popular" | "price-asc" | "price-desc");
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
        if (
          entry.isIntersecting &&
          hasMore &&
          !loading &&
          !isResettingRef.current
        ) {
          loadMore();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <Card
      className="bg-[#F5F5FA] !border-none !shadow-none !bg-transparent"
      classNames={{ body: "!p-0" }}
      style={{
        backgroundColor: "#F5F5FA",
      }}
    >
      {/* Filter and Sort Section */}
      <div className="p-1 sm:p-4 bg-white sm:rounded-lg shadow-sm border">
        <h2 className="text-lg font-bold text-gray-900 mb-4 hidden sm:block">
          Tất cả sản phẩm
        </h2>

        {/* Category Filter Display
        {selectedCategoryId && (
          <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-blue-700 text-sm">
              Đang lọc theo danh mục ID: <strong>{selectedCategoryId}</strong>
            </span>
          </div>
        )} */}

        {/* Filter Options */}
        <div className="hidden sm:flex flex-wrap gap-4 mb-4">
          <Checkbox
            checked={filters.hasTikiNow}
            onChange={(e) => handleFilterChange("hasTikiNow", e.target.checked)}
            className="flex items-center"
          >
            <span className="text-red-500 font-bold mr-1">NOW</span>
            <span className="text-gray-700">Giao siêu tốc 2H</span>
          </Checkbox>

          <Checkbox
            checked={filters.isTopDeal}
            onChange={(e) => handleFilterChange("isTopDeal", e.target.checked)}
            className="flex items-center"
          >
            <span className="text-red-500 mr-1">👍</span>
            <span className="text-red-500 font-bold mr-1">TOP DEAL</span>
            <span className="text-gray-700">Siêu rẻ</span>
          </Checkbox>

          <Checkbox
            checked={filters.isFreeshipXtra}
            onChange={(e) =>
              handleFilterChange("isFreeshipXtra", e.target.checked)
            }
            className="flex items-center"
          >
            <span className="text-blue-500 font-bold mr-1">FREESHIP</span>
            <span className="text-green-500 font-bold">XTRA</span>
          </Checkbox>

          <Checkbox
            checked={filters.minRating > 0}
            onChange={(e) =>
              handleFilterChange("minRating", e.target.checked ? 4 : 0)
            }
            className="flex items-center"
          >
            <Rate disabled defaultValue={4} className="mr-2" />
            <span className="text-gray-700">từ 4 sao</span>
          </Checkbox>
        </div>
        <div className="w-full bg-white sm:hidden">
          {/* Navigation Tabs */}
          <div className="flex mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b transition-colors ${
                  activeTab === tab.id
                    ? " text-blue-600"
                    : " text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {tab.label}
                  {tab.id === "price" && (
                    <span
                      className={`text-xs transition-transform ${
                        activeTab === tab.id ? "text-blue-600" : "text-gray-400"
                      }`}
                    >
                      {priceSort === "desc" ? "↓" : "↑"}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap items-center gap-1">
            {/* Filter Icon */}
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
              <FilterOutlined />
              <span className="text-sm">Lọc</span>
            </button>

            {/* NOW Filter */}
            <button
              onClick={() =>
                handleFilterChange("hasTikiNow", !filters.hasTikiNow)
              }
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold transition-all ${
                filters.hasTikiNow
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-slate-100 text-red-500"
              }`}
            >
              NOW
            </button>

            {/* TOP DEAL Filter */}
            <button
              onClick={() =>
                handleFilterChange("isTopDeal", !filters.isTopDeal)
              }
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold transition-all ${
                filters.isTopDeal
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-slate-100 text-red-500"
              }`}
            >
              <span className="text-xs">👍</span>
              TOP DEAL
            </button>

            {/* FREESHIP XTRA Filter */}
            <button
              onClick={() =>
                handleFilterChange("isFreeshipXtra", !filters.isFreeshipXtra)
              }
              className={`flex items-center px-2 py-1 rounded-full text-sm font-bold transition-all ${
                filters.isFreeshipXtra
                  ? "bg-blue-200 shadow-md"
                  : "bg-slate-100"
              }`}
            >
              <span className="text-blue-600">FREESHIP</span>
              <span className={`ml-1 text-green-600`}>XTRA</span>
            </button>
          </div>
        </div>

        {/* Sort Section */}
        <div className="sm:flex items-center hidden">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pb-2 pt-4 bg-[#F5F5FA] sm:mt-4 px-2 sm:px-0">
        {products.map((product) => (
          <div key={product.id} className="rounded-lg">
            <ProductCard product={product} formatPrice={formatPrice} />
          </div>
        ))}
      </div>

      {/* Sentinel + Loading */}
      <div ref={sentinelRef} className="h-2 bg-[#F5F5FA]" />
      <div className="flex justify-center py-2 bg-[#F5F5FA]">
        {loading && <Spin />}
        {!hasMore && products.length > 0 && (
          <span className="text-gray-500">Đã hiển thị tất cả sản phẩm</span>
        )}
      </div>
    </Card>
  );
});

ProductGrid.displayName = "ProductGrid";

export default ProductGrid;
