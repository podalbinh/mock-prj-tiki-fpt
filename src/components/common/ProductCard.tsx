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
      classNames={{ body: 'p-3' }}
      cover={
        <div className="relative">
          <img
            alt={product.title}
            src={product.image || '/placeholder.svg'}
            className="w-full h-[291px] object-cover bg-white"
          />
          {product.hasAd && (
            <span className="absolute top-2 right-2 rounded-md bg-[#F5F5FA] border border-white text-[#27272A] text-[10px] font-bold px-2 py-[2px] uppercase">
              AD
            </span>
          )}
        </div>
      }
    >
      <div className="p-0">
        <div className="flex items-center gap-2 mb-2">
          {product.isTopDeal && (
            <img src="/top-deal.png" alt="TOP DEAL" className="h-4" />
          )}
          {product.isFreeshipXtra && (
            <img src="/freeship-extra.png" alt="FREESHIP XTRA" className="h-4" />
          )}
          {product.isAuthentic && (
            <Tag color="blue" className="!m-0 text-[11px] font-semibold">CHÍNH HÃNG</Tag>
          )}
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-[#FF424E] font-semibold text-[18px] leading-[27px] flex items-center">
            {formatPrice(product.price)}
            <span className="ml-0.5 text-[13.5px] leading-[27px]">₫</span>
          </span>
          {product.discount > 0 && (
            <span className="bg-[#F5F5FA] rounded-lg px-2 py-[2px] text-[14px] leading-[21px] text-[#27272A]">
              -{product.discount}%
            </span>
          )}
        </div>

        {product.author && (
          <p className="text-[#808089] text-xs uppercase mb-2">{product.author}</p>
        )}

        <h4 className="text-[#27272A] text-base font-normal mb-2 line-clamp-2 h-12">
          {product.title}
        </h4>

        {product.rating > 0 && (
          <div className="flex items-center space-x-2 mb-2">
            <Rate disabled defaultValue={product.rating} className="text-xs" />
            {product.sold > 0 && (
              <>
                <Divider type="vertical" className="my-0" />
                <span className="text-[#808089] text-xs">Đã bán {product.sold}</span>
              </>
            )}
          </div>
        )}

        {product.sold > 0 && product.rating === 0 && (
          <p className="text-[#808089] text-xs mb-2">Đã bán {product.sold}</p>
        )}

        <Divider className="my-4 !border-t-[#EBEBF0]" />

        <div className="flex items-center text-[#808089] text-xs">
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
