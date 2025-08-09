import { Card, Avatar } from "antd";

export default function CategorySection() {
    const categories = [
        { name: "English Books", image: "src/assets/shipping.svg" },
        { name: "Sách tiếng Việt", image: "src/assets/shipping.svg" },
        { name: "Văn phòng phẩm", image: "src/assets/shipping.svg" },
        { name: "Quà lưu niệm", image: "src/assets/shipping.svg" },
    ];

    return (
        <Card
            title="Khám phá theo danh mục"
            className="mb-6"
            classNames={{ header: '!border-b-0', body: '!pt-0' }}
        >
            <div className="grid sm:grid-cols-6 gap-1 justify-items-left">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className="text-center cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <Avatar
                            size={88}
                            src={category.image}
                            alt={category.name}
                            className="mx-auto mb-3"
                        />
                        <p className="text-sm font-medium text-gray-900">{category.name}</p>
                    </div>
                ))}
            </div>
        </Card>

    );
}
