import {Link} from "react-router-dom";

export default function TopBestSellerBook() {
    return <div className="flex flex-col gap-4 my-4 mx-6 p-4 bg-white">
        <h2 className="text-2xl font-medium">
            Top Bán Chạy Sản Phẩm Nhà Sách Tiki
        </h2>
        <div className="flex flex-col gap-4">
            <ol className={ "list-decimal pl-8"}>
                <li>
                    <Link to={""} className="flex gap-4">
                        <span className="text-[#0B74E5] font-[400] hover:text-[#0B74E5]">Nguwowif awn chay</span>
                        <div className="flex-1"></div>
                        <span className="text-black hover:text-black">108.000<sup>₫</sup></span>
                    </Link>
                </li>

            </ol>
        </div>
    </div>
}