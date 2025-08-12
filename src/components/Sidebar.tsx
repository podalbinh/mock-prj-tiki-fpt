import { useEffect, useState } from "react";
import { Menu, Card } from "antd";
import type { MenuProps } from "antd";
import type { SidebarCategory } from "@/constant/interfaces";
import { useCategory } from "@/hooks/useCategory";

export default function Sidebar() {
  const [categories, setCategories] = useState<SidebarCategory[]>([]);
  const { getAllCategories } = useCategory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();

        setCategories(response || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const menuItems: MenuProps["items"] = categories.map((cat) => {
    // If category has subcategories, create a multi-level menu item
    if (
      cat.subcategories &&
      Array.isArray(cat.subcategories) &&
      cat.subcategories.length > 0
    ) {
      return {
        key: String(cat.id),
        label: cat.name,
        children: cat.subcategories.map((subCat: SidebarCategory) => ({
          key: String(subCat.id),
          label: subCat.name,
        })),
      };
    } else {
      // If category has no subcategories, create a single-level menu item
      return {
        key: String(cat.id),
        label: cat.name,
      };
    }
  });

  return (
    <Card
      bordered={false}
      title="Khám phá theo danh mục"
      size="small"
      className="!border-none !shadow-none"
      classNames={{ body: "!p-0" }}
    >
      {menuItems.length === 0 ? (
        <div className="text-center text-gray-400 py-4">
          Không có danh mục nào
        </div>
      ) : (
        <Menu
          mode="inline"
          items={menuItems}
          className="border-none !h-auto !max-h-none !overflow-visible"
        />
      )}
    </Card>
  );
}
