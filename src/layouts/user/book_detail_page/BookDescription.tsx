import { Typography } from "antd";

export default function BookDescription() {
    return (
        <div>
            <Typography.Title level={4}>Mô tả sản phẩm</Typography.Title>
            <Typography.Paragraph ellipsis={{ rows: 5, expandable: true }}>
                Trong thời đại hiện nay, tất cả những ai không muốn bị tụt hậu đều cần học về các công cụ AI...
            </Typography.Paragraph>
        </div>
    );
}
