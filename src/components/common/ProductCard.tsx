import { Card, Rate, Tag, Badge, Divider } from 'antd';
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
  };
  formatPrice: (price: number) => string;
}

export default function ProductCard({ product, formatPrice }: ProductCardProps) {
  return (
    <Badge.Ribbon
      text={product.hasAd ? 'AD' : undefined}
      color={product.hasAd ? 'volcano' : undefined}
    >
      <Card
        hoverable
        cover={
          <div className="relative">
            <img
              alt={product.title}
              src={product.image || '/placeholder.svg'}
              className="w-full h-48 object-cover"
            />
            {product.discount > 0 && (
              <Tag color="red" className="absolute top-2 left-2">
                -{product.discount}%
              </Tag>
            )}
          </div>
        }

      >
        <div className="p-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-red-500 font-semibold text-lg">
              {formatPrice(product.price)}₫
            </span>
            {product.discount > 0 && (
              <Tag color="default" className="text-xs">
                -{product.discount}%
              </Tag>
            )}
          </div>

          {product.author && (
            <p className="text-gray-500 text-xs uppercase mb-2">{product.author}</p>
          )}

          <h4 className="text-gray-900 text-sm font-normal mb-3 line-clamp-2 h-10">
            {product.title}
          </h4>

          {product.rating > 0 && (
            <div className="flex items-center space-x-2 mb-2">
              <Rate disabled defaultValue={product.rating} className="text-xs" />
              {product.sold > 0 && (
                <>
                  <Divider type="vertical" className="my-0" />
                  <span className="text-gray-500 text-xs">Đã bán {product.sold}</span>
                </>
              )}
            </div>
          )}

          {product.sold > 0 && product.rating === 0 && (
            <p className="text-gray-500 text-xs mb-2">Đã bán {product.sold}</p>
          )}

          <Divider className="my-3" />

          <div className="flex items-center text-gray-500 text-xs">
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
    </Badge.Ribbon>
  );
}
