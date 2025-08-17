export default function FooterPayment() {
    return (
        <footer className="bg-gray-100 text-left text-xs text-gray-600">
            <div className="py-10 px-24 flex flex-col gap-1">
                <p className="mb-2">
                    Bằng việc tiến hành Đặt Mua, bạn đồng ý với các Điều kiện Giao dịch
                    chung:
                </p>
                <div className="space-x-3">
                    <a href="#" className="hover:underline text-gray-800 font-medium border-r-2 border-[#DDDDE3] pr-3">
                        Quy chế hoạt động
                    </a>

                    <a href="#" className="hover:underline text-gray-800 font-medium border-r-2 border-[#DDDDE3] px-3">
                        Chính sách giải quyết khiếu nại
                    </a>

                    <a href="#" className="hover:underline text-gray-800 font-medium border-r-2 border-[#DDDDE3] px-3">
                        Chính sách bảo hành
                    </a>

                    <a href="#" className="hover:underline text-gray-800 font-medium border-r-2 border-[#DDDDE3] px-3">
                        Chính sách bảo mật thanh toán
                    </a>

                    <a href="#" className="hover:underline text-gray-800 font-medium">
                        Chính sách bảo mật thông tin cá nhân
                    </a>
                </div>
                <p className="py-5">
                    © 2019 - Bản quyền của Công Ty Cổ Phần Ti Ki - Tiki.vn
                </p>
            </div>
        </footer>
    );
}
