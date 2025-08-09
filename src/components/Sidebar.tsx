import  { useEffect, useState } from 'react';
import { Menu, Card } from 'antd';
import type { MenuProps } from 'antd';
import { getCategories } from '@/config/api';

export default function Sidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                setCategories([]);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    const menuItems: MenuProps['items'] = categories.map((cat: any) => ({
        key: cat.id,
        label: cat.name,
    }));

    return (
        <Card className="w-60" title="Khám phá theo danh mục" size="small">
            {menuItems.length === 0 ? (
                <div className="text-center text-gray-400 py-4">Không có danh mục nào</div>
            ) : (
                <Menu
                    mode="inline"
                    items={menuItems}
                    className="border-none"
                />
            )}
        </Card>
    );
}
