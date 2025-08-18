import { useState } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";

interface SummaryToggleProps {
    content: string;
}

export default function SummaryToggle({ content }: SummaryToggleProps) {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                borderTop: "1px solid #eee",
                padding: "8px 0",
                cursor: "pointer"
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
                onClick={() => setOpen(!open)}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <img
                        src="/src/assets/ai.svg" // icon bên trái
                        alt="ai"
                        style={{ width: 20, height: 20 }}
                    />
                    <span style={{ color: "#999" }}>Xem thêm</span>
                    <span>Tóm tắt nội dung sách</span>
                </div>
                {open ? <DownOutlined /> : <RightOutlined />}
            </div>

            {/* Nội dung xổ xuống */}
            {open && (
                <div
                    style={{
                        marginTop: 8,
                        padding: "8px 0",
                        color: "#333",
                        lineHeight: 1.5
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    );
}
