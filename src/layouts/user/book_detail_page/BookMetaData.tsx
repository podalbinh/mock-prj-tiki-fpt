import { Descriptions } from "antd";

export default function BookMetaData() {
    return (
        <Descriptions column={1} bordered>
            <Descriptions.Item label="Bookcare">Có</Descriptions.Item>
            <Descriptions.Item label="Công ty phát hành">1980 Books</Descriptions.Item>
            <Descriptions.Item label="Ngày xuất bản">2024-07-01</Descriptions.Item>
            <Descriptions.Item label="Kích thước">13 x 20.5 cm</Descriptions.Item>
            <Descriptions.Item label="Dịch giả">Huyền Trang</Descriptions.Item>
            <Descriptions.Item label="Loại bìa">Bìa mềm</Descriptions.Item>
            <Descriptions.Item label="Số trang">263</Descriptions.Item>
            <Descriptions.Item label="Nhà xuất bản">Nhà Xuất Bản Dân Trí</Descriptions.Item>
        </Descriptions>
    );
}
