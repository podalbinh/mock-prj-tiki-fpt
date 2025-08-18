import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FeaturedCollectionData } from "@/constant/interfaces";
import { useBook } from "@/hooks/useBook.ts";
import {useLoading} from "@/hooks/useLoading.ts";

const FeaturedCollections: React.FC = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { getBookFeaturedCollections } = useBook();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allCards, setAllCards] = useState<FeaturedCollectionData[]>([]);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const totalPages = Math.max(1, Math.ceil(allCards.length / 2));

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getBookFeaturedCollections();
        setAllCards(response || []);
      } catch (err) {
        console.error("Error fetching featured collections:", err);
        setAllCards([]);
      }
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    if (totalPages > 0) {
      restartAutoSlide();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalPages]);

  const restartAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }, 3000);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    restartAutoSlide();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    restartAutoSlide();
  };

  const handleProductClick = (productId: number) => {
    showLoading("Đang chuyển hướng...");
    navigate(`/books/${productId}`);
    hideLoading()
  };

  const renderCard = (cardData: FeaturedCollectionData, index: number) => (
    <div
      key={index}
      className="relative flex bg-white box-border border border-black/5 rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] h-[186px]"
    >
      <div className="w-[186px] h-[186px] flex items-center justify-center flex-shrink-0">
        <img src={cardData.logo} alt="Logo" className="object-contain w-[186px] h-[186px]" />
      </div>
      <div className="flex-1 flex flex-col justify-between p-3">
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-0.5">{cardData.title}</h3>
          <p className="text-xs text-gray-600 flex items-center">
            Tài trợ bởi<b className="text-black">{cardData.sponsor}</b>
            <span className="ml-1 text-gray-800">{cardData.ratingText}</span>
            <span className="text-yellow-500 ml-1">⭐</span>
          </p>
        </div>
        <div className="flex gap-2 mt-2 items-end">
          {cardData.listProduct.map((product) => (
            <div key={product.id} className="relative group cursor-pointer">
              <img
                src={product.url}
                alt={`Product ${product.id}`}
                className="w-[64px] h-[64px] object-cover rounded border shadow-sm group-hover:shadow-md transition-shadow"
                onClick={() => handleProductClick(product.id)}
              />
              {product.discountPercent > 0 && (
                <div className="absolute right-[5px] bottom-[5px] bg-red-500 text-white text-[10px] px-1 pl-1 rounded-full font-semibold shadow">
                  -{product.discountPercent}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (allCards.length === 0) {
    return (
      <div className="relative w-full">
        <div className="flex justify-center items-center h-48">
          <p className="text-gray-500">Không có dữ liệu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full hidden md:block">
      <div className="overflow-hidden bg-[#F5F5FA] relative group">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => {
            const start = pageIndex * 2;
            const pageItems = allCards.slice(start, start + 2);
            
            return (
              <div key={pageIndex} className="flex-shrink-0 w-full">
                <div className="flex justify-between w-full">
                  {pageItems.map((card, idx) => (
                    <div key={start + idx} className="w-[49%]">
                      {renderCard(card, start + idx)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={handlePrevious} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <img src="/src/assets/arrow-next.svg" alt="previous" className="rotate-180" />
        </button>

        <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <img src="/src/assets/arrow-next.svg" alt="next" />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-[24px] h-[2px] mb-3 rounded transition-colors ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollections;