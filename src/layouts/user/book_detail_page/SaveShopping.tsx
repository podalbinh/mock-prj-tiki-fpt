import {DownOutlined, RightOutlined} from "@ant-design/icons";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function SaveShopping() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div
                className={"flex items-center justify-between cursor-pointer"}
                onClick={() => setOpen(!open)}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <p className={"font-semibold text-md"}>An tâm mua sắm</p>
                </div>
                {open ? <DownOutlined /> : <RightOutlined />}
            </div>
            <div className={"flex flex-col"}>
                <div className={"flex gap-1 p-2"}>
                    <img
                        src="/assets/check.svg" // icon bên trái
                        alt="ai"
                        style={{ width: 20, height: 20 }}
                    />
                    <div className="flex-1 text-sm">Được đồng kiểm khi nhận hàng</div>
                </div>
                <hr/>
                <div className={"flex gap-1 p-2"}>
                    <img
                        src="/assets/refund.svg" // icon bên trái
                        alt="ai"
                        style={{ width: 20, height: 20 }}
                    />
                    <div className="flex-1 text-sm">Được hoàn tiền 200% nếu là hàng giả</div>
                </div>
                <hr/>
                <div className={"flex gap-1 p-2"}>
                    <img
                        src="/assets/return.svg" // icon bên trái
                        alt="ai"
                        style={{ width: 20, height: 20 }}
                    />
                    <div className="flex-1 text-sm">
                        Đổi trả miễn phí trong 30. Được đổi ý.
                        <br/>
                        <Link to={""} className={"underline"}>Chi tiết</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}