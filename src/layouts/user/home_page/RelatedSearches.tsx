import {Link} from "react-router-dom";

const relatedSearches: string[] = [
    "harry potter trọn bộ",
    "999 lá thư gửi cho chính mình",
    "atomic habits",
    "roses and champagne",
    "đám trẻ ở đại dương đen",
    "tâm lý học về tiền",
    "tư duy nhanh và chậm",
    "dám bị ghét",
    "người bà tài giỏi vùng saga",
    "việt nam sử lược",
    "trốn lên mái nhà để khóc",
    "tội ác và hình phạt",
    "vẻ đẹp của sự cô đơn",
    "đúng việc",
    "triêu du",
    "tần số rung động",
    "đứa trẻ hiểu chuyện thường không có kẹo ăn",
    "con đường chẳng mấy ai đi"
]

export default function RelatedSearches() {
    return <div className="flex flex-col my-2 p-4 bg-white">
        <h2 className="text-xl font-medium">
            Tìm kiếm liên quan
        </h2>
        <div className="grid grid-cols-6 gap-2">
            {relatedSearches.map((search) => (
                <Link to={""} className="text-[#0B74E5] font-[400] hover:text-[#0B74E5] truncate">
                    {search}
                </Link>
            ))}
        </div>
    </div>
}