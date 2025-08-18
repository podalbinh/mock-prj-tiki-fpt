import React from 'react';
import { Button } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const EmptyCart: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center py-20 max-w-md mx-auto px-4">
            <div className="mb-6">
                <ShoppingOutlined className="text-6xl text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-600 mb-8">
                Hãy thêm sản phẩm vào giỏ hàng để tiến hành thanh toán
            </p>
            <Button
                type="primary"
                size="large"
                icon={<ShoppingOutlined />}
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 mt-3"
            >
                Mua sắm ngay
            </Button>
        </div>
    );
};

export default EmptyCart;
