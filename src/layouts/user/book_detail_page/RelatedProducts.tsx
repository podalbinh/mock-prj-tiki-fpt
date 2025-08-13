import { Card, Row, Col } from "antd";

export default function RelatedProducts() {
    const products = [
        { id: 1, name: "Mục tiêu", img: "/images/book1.jpg" },
        { id: 2, name: "AI in Marketing", img: "/images/book2.jpg" },
    ];

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Sản phẩm tương tự</h3>
            <Row gutter={16}>
                {products.map((p) => (
                    <Col span={4} key={p.id}>
                        <Card
                            hoverable
                            cover={<img alt={p.name} src={p.img} />}
                        >
                            <Card.Meta title={p.name} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
