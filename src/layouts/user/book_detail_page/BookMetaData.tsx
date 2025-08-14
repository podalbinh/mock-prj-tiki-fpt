import type {Book} from "@/constant/interfaces.ts";

interface BookMetaDataProps {
    book: Book | undefined;
}

export default function BookMetaData({book}: BookMetaDataProps) {
    const data = [
        { label: 'Bookcare', value: 'Có' },
        { label: 'Công ty phát hành', value: book?.publisherVn || "-" },
        { label: 'Ngày xuất bản', value: book?.publicationDate || "-" },
        { label: 'Kích thước', value: book?.dimensions || "-" },
        { label: 'Dịch Giả', value: book?.dichGia || "-" },
        { label: 'Loại bìa', value: book?.bookCover || "-" },
        { label: 'Số trang', value: book?.numberOfPage || "-" },
        { label: 'Nhà xuất bản', value: book?.manufacturer || "-" },
    ];

    return (
        <div>
            <div>
                <p className={"text-md font-semibold mb-0"} >Thông tin chi tiết</p>
            </div>
            <div className="mt-2">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`flex py-1 ${index !== data.length - 1 ? 'border-b border-gray-200' : ''}`}
                    >
                        <div className="w-2/4 text-gray-400 text-sm">{item.label}</div>
                        <div className="flex-1 text-sm">{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
