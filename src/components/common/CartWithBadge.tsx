import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const CartWithBadge = () => {
  return (
    <Badge count={5} size="small">
      <ShoppingCartOutlined className="text-[20px] p-1 text-blue-600" />
    </Badge>
  );
};

export default CartWithBadge;
