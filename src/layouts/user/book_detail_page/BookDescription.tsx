import type {Book} from "@/constant/interfaces.ts";
import {useState} from "react";

interface BookDescriptionProps {
    book: Book | undefined;
}


export default function BookDescription({book}: BookDescriptionProps) {
    const description = book?.description || "Không có dữ liệu";

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <div>
                <p className={"text-md font-semibold mb-0"} >Mô tả chi tiết</p>
            </div>
            <div
                style={{
                    maxHeight: expanded ? "none" : "250px", // chiều cao giới hạn khi thu gọn
                    overflow: "hidden",
                    position: "relative",
                }}
                className={"text-sm"}
            >
                <div
                    dangerouslySetInnerHTML={{ __html: description }}
                />

                {!expanded && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "100%",
                            background:
                                "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))"
                        }}
                    />
                )}
            </div>

            <button
                onClick={() => setExpanded(!expanded)}
                style={{
                    marginTop: "8px",
                    background: "none",
                    width: "100%",
                    border: "none",
                    color: "#1890ff",
                    cursor: "pointer"
                }}
            >
                {expanded ? "Thu gọn" : "Xem thêm"}
            </button>
        </div>
    );
}
