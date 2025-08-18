import { useEffect, useState } from "react";
import { Menu, Card } from "antd";
import type { MenuProps } from "antd";
import type { SidebarCategory } from "@/constant/interfaces";
import { useCategory } from "@/hooks/useCategory";

export default function Sidebar() {
  const [categories, setCategories] = useState<SidebarCategory[]>([]);
  const { getAllCategoriesWithSub } = useCategory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategoriesWithSub();

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
      variant="borderless"
      title="Khám phá theo danh mục"
      size="small"
      className="!border-none !shadow-none hidden sm:block"
      classNames={{
        body: "!p-0",
        title: "!text-base !font-semibold !text-gray-800 !pb-3 p-3"
      }}
    >
      {menuItems.length === 0 ? (
        <div className="text-center text-gray-400 py-4">
          Không có danh mục nào
        </div>
      ) : (
        <div className="pt-2">
          <Menu
            mode="inline"
            items={menuItems}
            className="border-none !h-auto !max-h-none !overflow-visible bg-transparent"
            rootClassName="[&>.ant-menu-item]:mb-0 [&>.ant-menu-submenu]:mb-0 [&>.ant-menu-item]:border-b [&>.ant-menu-item]:border-gray-250 [&>.ant-menu-submenu>.ant-menu-submenu-title]:border-b [&>.ant-menu-submenu>.ant-menu-submenu-title]:border-gray-300 [&>.ant-menu-item]:pb-3 [&>.ant-menu-submenu>.ant-menu-submenu-title]:pb-3 [&_.ant-menu-item]:rounded-none [&_.ant-menu-submenu-title]:rounded-none [&_.ant-menu-item:last-child]:border-b-0 [&_.ant-menu-item]:m-0 [&_.ant-menu-submenu-title]:m-0 [&_.ant-menu-item]:pt-3 [&_.ant-menu-submenu-title]:pt-3"
            style={{
              backgroundColor: "transparent",
              border: "none"
            }}
          />
        </div>
      )}
    </Card>
  );
}
