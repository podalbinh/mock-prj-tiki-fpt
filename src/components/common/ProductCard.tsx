import { Card, Rate, Tag, Divider } from 'antd';
import { TruckOutlined } from '@ant-design/icons';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    author?: string;
    price: number;
    originalPrice: number;
    discount: number;
    rating: number;
    sold: number;
    image: string;
    hasAd?: boolean;
    hasTikiNow?: boolean;
    isTopDeal?: boolean;
    isFreeshipXtra?: boolean;
    isAuthentic?: boolean;
  };
  formatPrice: (price: number) => string;
}

export default function ProductCard({ product, formatPrice }: ProductCardProps) {
  return (
    <Card
      hoverable
      bordered
      className="rounded-lg overflow-hidden hover:shadow-md transition-shadow !border-[#EBEBF0] !bg-white"
      classNames={{ body: '!p-0' }}
    >
      <div className="relative h-[531px]">
        {/* Background panel */}
        <div className="absolute inset-0 bg-white rounded-lg" />

        {/* Picture area */}
        <div className="absolute left-0 right-0 top-0 bottom-[263px]">
          <img
            alt={product.title}
            src={product.image || '/placeholder.svg'}
            className="w-full h-full object-cover"
          />
          {product.hasAd && (
            <span className="absolute top-2 right-2 rounded-md bg-[#F5F5FA] border border-white text-[#27272A] text-[10px] font-bold px-2 py-[2px] uppercase">
              AD
            </span>
          )}
          {/* Left badges (optional) */}
          <div className="absolute left-3 top-2 flex items-center gap-2">
            {product.isTopDeal && (
              <img src="/top-deal.png" alt="TOP DEAL" className="h-5 rounded" />
            )}
            {product.isFreeshipXtra && (
              <img src="/freeship-extra.png" alt="FREESHIP XTRA" className="h-5 rounded" />
            )}
            {product.isAuthentic && (
              <Tag color="blue" className="!m-0 text-[11px] font-semibold">CHÍNH HÃNG</Tag>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="absolute left-3 top-[288px] text-[#FF424E] font-semibold text-[18px] leading-[27px] flex items-center">
          {formatPrice(product.price)}
          <span className="ml-0.5 text-[13.5px] leading-[27px]">₫</span>
        </div>
        {product.discount > 0 && (
          <div className="absolute left-[88px] top-[288px] w-[46.07px] h-[21px] bg-[#F5F5FA] rounded-lg flex items-center justify-center">
            <span className="text-[14px] leading-[21px] text-[#27272A]">-{product.discount}%</span>
          </div>
        )}

        {/* Author */}
        {product.author && (
          <div className="absolute left-3 right-3 top-[327px] h-[21px]">
            <p className="text-[#808089] text-xs uppercase">{product.author}</p>
          </div>
        )}

        {/* Title */}
        <div className="absolute left-3 right-3 top-[350px] h-[48px]">
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
                <span className="text-[#808089] text-xs">Đã bán {product.sold}</span>
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
              <TruckOutlined className="mr-1" />
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
