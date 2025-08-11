import React, { useEffect, useState } from "react";

import ArrowNext from "@/assets/arrow-next.svg";
import { useBook } from "@/hooks/useBook";
import type { FeaturedCollectionData } from "@/constant/interfaces";

const FeaturedCollections: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allCards, setAllCards] = useState<FeaturedCollectionData[]>([]);
  const { getBookFeaturedCollections } = useBook();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getBookFeaturedCollections();
        console.log("API Response:", response); // Debug log
        setAllCards(response || []);
      } catch (err) {
        console.error("Error fetching featured collections:", err);
        setAllCards([]);
      }
    };
    fetchCollections();
  }, []);

  // Group into pairs
  const pairs: FeaturedCollectionData[][] = [];
  for (let i = 0; i < allCards.length; i += 2) {
    pairs.push(allCards.slice(i, i + 2));
  }
  const totalPages = pairs.length;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const renderCard = (cardData: FeaturedCollectionData, index: number) => (
    <div
      key={index}
      className="relative flex bg-white box-border h-[186px] border border-black/5 rounded-lg min-w-[585px] max-w-[585px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
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
  if (pairs.length === 0) {
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
      <div className="relative">
        {/* Nút Previous */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center ml-auto"
        >
          <img
            src={ArrowNext}
            alt="prev"
            className="rotate-180 w-[32px] h-[56px]"
          />
        </button>

        {/* Nút Next */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center mr-auto"
        >
          <img src={ArrowNext} alt="next" className="w-[32px] h-[56px]" />
        </button>

        {/* Hai card cạnh nhau */}
        <div className="flex justify-between">
          {pairs[currentIndex]?.map((cardData, index) =>
            renderCard(cardData, index)
          )}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {pairs.map((_, index) => (
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
    </div>
  );
};

export default FeaturedCollections;
