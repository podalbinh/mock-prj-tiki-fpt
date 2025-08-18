import { Card, Avatar } from "antd";
import type { CategoryWithThumbnail } from "@/constant/interfaces.ts";
import { useEffect, useState } from "react";
import { useCategory } from "@/hooks/useCategory";

interface CategorySectionProps {
  onCategorySelect: (categoryId: number | null) => void;
}

export default function CategorySection({
  onCategorySelect,
}: CategorySectionProps) {
  const { getCategoryWithThumbnail } = useCategory();
  const [categories, setCategories] = useState<CategoryWithThumbnail[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoryWithThumbnail();

        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Handle category click
  const handleCategoryClick = (category: CategoryWithThumbnail) => {
    if (selectedCategory === category.id) {
      setSelectedCategory(null);
      onCategorySelect(null);
    } else {
      setSelectedCategory(category.id);
      onCategorySelect(category.id);
    }
  };

  return (
    <Card
      title="Khám phá theo danh mục"
      className="mb-6 hidden lg:block"
      classNames={{ header: "!border-b-0", body: "!pt-0" }}
    >
      <div className="grid md:grid-cols-6 gap-1 justify-items-left">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.name}
              className="text-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleCategoryClick(category)}
            >
              <Avatar
                size={88}
                src={category.thumbnailUrl}
                alt={category.name}
                className={`mx-auto mb-3 ${
                  selectedCategory === category.id
                    ? "ring-4 ring-blue-500 ring-opacity-60"
                    : ""
                }`}
              />
              <p className="text-sm font-medium text-gray-900">
                {category.name}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-6 text-center text-gray-500 py-8">
            Không có danh mục nào
          </div>
        )}
      </div>
    </Card>
  );
}
