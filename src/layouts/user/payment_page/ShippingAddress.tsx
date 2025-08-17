import { Button } from "antd";
import {useNavigate} from "react-router-dom";

export default function ShippingAddress() {
    const navigation = useNavigate()
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    const onClick = () => {
        navigation('/profile')
    }

    return (
        <div className="rounded-md p-4 bg-white">
            {/* Tiêu đề */}
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">Giao tới</span>
                <Button
                    onClick={onClick}
                    type="link"
                    className="p-0 text-blue-500"
                >
                    Thay đổi
                </Button>
            </div>

            {/* Tên + SĐT */}
            <div className="flex items-center text-base font-bold mb-2">
                <span>{user?.fullName || "-"}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span>{user?.phone || "-"}</span>
            </div>

            {/* Địa chỉ */}
            <div className="text-gray-600">
        <span className="bg-orange-100 text-orange-500 text-xs px-2 py-0.5 rounded-full font-medium mr-1">
          Văn phòng
        </span>
                <span>
          {user?.address || "-"}
        </span>
            </div>
        </div>
    );
}
