import { Card, Rate, Divider } from "antd";
import type { Product } from "@/constant/interfaces";
import { useNavigate } from "react-router-dom";
import TopDeal from "./TopDeal";
import FreeshipExtra from "./FreeshipExtra";
import Authentic from "./Authentic";

interface ProductCardProps {
  product: Product;
  formatPrice: (price: number) => string;
}

export default function ProductCard({
  product,
  formatPrice,
}: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      variant="outlined"
      className="rounded-lg overflow-hidden hover:shadow-md hover:translate-y-[-1px] transition-shadow !border-[#EBEBF0] !bg-white"
      classNames={{ body: "!p-0" }}
      onClick={() => navigate(`/books/${product.id}`)}
    >
      <div className="relative h-[531px]">
        {/* Background panel */}
        <div className="absolute inset-0 bg-white rounded-lg" />

        {/* Picture area */}
        <div className="absolute left-0 right-0 top-0 bottom-[263px]">
          <img
            alt={product.title}
            src={product.thumbnailUrl || "/placeholder.svg"}
            className="w-full h-full object-cover"
          />
          {product.hasAd && (
            <span className="absolute top-2 right-2 rounded-md bg-[#F5F5FA] border border-white text-[#27272A] text-[10px] font-bold px-2 py-[2px] uppercase">
              AD
            </span>
          )}
          {/* Left badges (optional) */}
          <div className="absolute left-1 bottom-1 flex items-center gap-1">
            {product.isTopDeal && (
              <div className="rounded bg-red-100 overflow-hidden p-1">
                <TopDeal />
              </div>
            )}
            {product.isFreeshipXtra && (
              <div className="rounded bg-blue-100 overflow-hidden p-1">
                <FreeshipExtra />
              </div>
            )}
            {product.isAuthentic && (
              <div className="rounded bg-blue-100 overflow-hidden p-1">
                <Authentic />
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="absolute left-3 top-[288px] text-[#FF424E] font-semibold text-[18px] leading-[27px] flex items-baseline">
          {formatPrice(product.price)}
          <span className=" text-[13px] leading-[20px] self-start">₫</span>
        </div>

        {/* Discount - Đặt vị trí động dựa trên độ dài của giá */}
        {product.discount > 0 && (
          <div
            className="absolute top-[288px] h-[21px] bg-[#F5F5FA] rounded-lg flex items-center justify-center px-2"
            style={{
              left: `${Math.max(
                88,
                60 + formatPrice(product.price).length * 5
              )}px`,
            }}
          >
            <span className="text-[14px] leading-[21px] text-[#27272A]">
              -{product.discount}%
            </span>
          </div>
        )}

        {/* Author */}
        {product.author && (
          <div className="absolute left-3 right-3 top-[327px] h-[21px]">
            <p className="text-[#808089] text-xs uppercase">{product.author}</p>
          </div>
        )}

        {/* Title */}
        <div className="absolute left-3 right-3 top-[350px] h-[48px] mt-1">
          <h4 className="text-[#27272A] text-base font-normal line-clamp-2">
            {product.title}
          </h4>
        </div>

        {/* Rating + Sold */}
        {product.rating > 0 && (
          <div className="absolute left-3 top-[409px] flex items-center space-x-2">
            <Rate disabled defaultValue={product.rating} className="text-xs" />
            {product.sold > 0 && (
              <>
                <Divider type="vertical" className="!my-0" />
                <span className="text-[#808089] text-xs">
                  Đã bán {product.sold}
                </span>
              </>
            )}
          </div>
        )}

        {product.sold > 0 && product.rating === 0 && (
          <div className="absolute left-3 top-[409px]">
            <p className="text-[#808089] text-xs">Đã bán {product.sold}</p>
          </div>
        )}

        {/* Divider */}
        <div className="absolute left-3 right-3 top-[503px] h-[28px] border-t border-[#EBEBF0]" />

        {/* Shipping */}
        <div className="absolute left-0 right-0 top-[508px] flex items-center text-[#808089] text-xs px-3">
          {product.hasTikiNow ? (
            <>
              <img
                src="src/assets/now.png"
                alt="NOW"
                className="h-[18px] mr-1"
              />
              <span>Giao siêu tốc 2h</span>
            </>
          ) : (
            <span>Giao thứ 3, 01/04</span>
          )}
        </div>
      </div>
    </Card>
  );
}
