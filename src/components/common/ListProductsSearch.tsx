import type { Product, ProductSearchResponse } from "@/constant/interfaces";
import { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import { Request } from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import { Alert, Spin } from "antd";
import NoProductsFound from "./NoProductsFound";

const ListProductsSearch: React.FC<{ keyword: string }> = ({ keyword }) => {
  // Data + UI state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Pagination config
  const PAGE_SIZE = 8;

  // Refs for infinite scroll and concurrency control
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const currentPageRef = useRef(0);
  const isResettingRef = useRef(false);

  const formatPrice = (price: number) => price.toLocaleString("vi-VN");

  // Fetch products by keyword, supports append mode
  const fetchProductsWithKeyword = async (
    page: number,
    append = false
  ): Promise<void> => {
    try {
      setLoading(true);

      const params: any = {
        page,
        size: PAGE_SIZE,
        keyword: keyword?.trim() || undefined,
      };

      const response = await Request.get<ProductSearchResponse>(
        API_ENDPOINTS.SEARCH_PRODUCTS,
        { params }
      );

      if (response && response.content) {
        const fetched: Product[] = response.content;

        // When appending, avoid duplicates by id
        if (append) {
          setProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newItems = fetched.filter((p) => !existingIds.has(p.id));
            return [...prev, ...newItems];
          });
        } else {
          setProducts(fetched);
        }

        // Update pagination flags (use response.last if available)
        if (typeof (response as any).last === "boolean") {
          setHasMore(!(response as any).last);
        } else {
          // fallback: hasMore when fetched length == page size and totalElements > current count
          setHasMore(fetched.length === PAGE_SIZE);
        }

        if (typeof response.totalElements === "number") {
          setTotalElements(response.totalElements);
        }
      } else {
        if (!append) setProducts([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products by keyword:", error);
    } finally {
      setLoading(false);
      // clear resetting flag after fetch completes
      if (isResettingRef.current) {
        setTimeout(() => {
          isResettingRef.current = false;
        }, 50);
      }
    }
  };

  const resetPagination = () => {
    isResettingRef.current = true;
    setCurrentPage(0);
    currentPageRef.current = 0;
    setProducts([]);
    setHasMore(true);

    // ensure observer won't trigger immediately
    setTimeout(() => {
      isResettingRef.current = false;
    }, 100);
  };

  const loadMore = () => {
    if (loading || !hasMore || isResettingRef.current) return;

    const nextPage = currentPageRef.current + 1;
    currentPageRef.current = nextPage;
    setCurrentPage(nextPage);
    fetchProductsWithKeyword(nextPage, true);
  };

  // Initial load and keyword change handling
  useEffect(() => {
    resetPagination();
    // fetch first page for the new keyword
    fetchProductsWithKeyword(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            hasMore &&
            !loading &&
            !isResettingRef.current
          ) {
            loadMore();
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
    // include hasMore/loading so observer reacts to changes
  }, [hasMore, loading]);

  return (
    <>
      {products && products.length > 0 ? (
        <>
          <Alert
            message={`Tìm kiếm theo từ khóa: "${keyword}"`}
            type="info"
            className="text-base"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pb-2 pt-4 bg-[#F5F5FA]">
            {products.map((product) => (
              <div key={product.id} className="rounded-lg">
                <ProductCard product={product} formatPrice={formatPrice} />
              </div>
            ))}
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="w-full flex justify-center py-4">
              <Spin />
            </div>
          )}

          {/* Sentinel for infinite scroll */}
          <div ref={sentinelRef} />

          {/* Optional: show no more items */}
          {!hasMore && products.length > 0 && (
            <div className="w-full text-center py-4 text-sm text-gray-500">
              Đã hiển thị tất cả sản phẩm ({totalElements || products.length})
            </div>
          )}
        </>
      ) : loading ? (
        <div className="w-full flex justify-center py-8">
          <Spin />
        </div>
      ) : (
        <NoProductsFound keyword={keyword} />
      )}
    </>
  );
};

export default ListProductsSearch;
