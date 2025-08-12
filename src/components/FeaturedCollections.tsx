import React, { useEffect, useState } from "react";
import { useBook } from "@/hooks/useBook";
import type { FeaturedCollectionData } from "@/constant/interfaces";
import { Button } from "antd";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";

const FeaturedCollections: React.FC = () => {
  const { getBookFeaturedCollections } = useBook();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allCards, setAllCards] = useState<FeaturedCollectionData[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const totalPages = Math.ceil(allCards.length / itemsPerPage);

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
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        // sm: tailwind breakpoint
        setItemsPerPage(1);
      } else {
        setItemsPerPage(2);
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
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
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
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

  const renderCard = (cardData: FeaturedCollectionData, index: number) => (
    <div
      key={index}
      className="relative flex bg-white box-border border border-black/5 rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] aspect-ratio-[3/1] w-[1/2]"
    >
      {/* Logo section bên trái */}
      <div className="w-[186px] h-[186px] flex items-center justify-center">
        <img
          src={cardData.logo}
          alt="Logo"
          className="object-contain w-[186px] h-[186px]"
        />
      </div>
      {/* Content section bên phải */}
      <div className="flex-1 flex flex-col justify-between p-3">
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-0.5">
            {cardData.title}
          </h3>
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

  // If no data, show empty state
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
    <div className="relative w-full">
      <div className="overflow-hidden bg-white py-2 rounded-md relative group">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {allCards.map((cardData, index) => (
            <div key={index} className="flex-shrink-0 w-full sm:w-1/2 px-2">
              {renderCard(cardData, index)}
            </div>
          ))}
        </div>
        {/* Nút Previous */}
        <Button
          onClick={handlePrevious}
          icon={<CaretLeftFilled />}
          shape="circle"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center
               opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />

        {/* Nút Next */}
        <Button
          onClick={handleNext}
          shape="circle"
          icon={<CaretRightFilled color="blue" />}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center
               opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-[24px] h-[2px] mb-3 rounded transition-colors ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollections;
