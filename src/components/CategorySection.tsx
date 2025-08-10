import { Card, Avatar } from "antd";
import Request from "@/config/api.ts";
import type { CategoryWithThumbnail} from "@/constant/interfaces.ts";
import {API_ENDPOINTS} from "@/constant/endpoint.ts";
import { useEffect, useState } from "react";

interface ApiResponse {
    device: string;
    code: number;
    data: CategoryWithThumbnail[];
}

export default function CategorySection() {
    const getCategoriesWithThumbnail = () => Request.get<ApiResponse>(API_ENDPOINTS.GET_CATEGORY_WITH_THUMBNAIL);
    const [categories, setCategories] = useState<CategoryWithThumbnail[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategoriesWithThumbnail();
                console.log('CategorySection API Response:', response); // Debug log
                
                // Check if response has the correct structure
                if (response && response.data && Array.isArray(response.data)) {
                    setCategories(response.data);
                } else if (response && Array.isArray(response)) {
                    // Fallback: if response is directly an array
                    setCategories(response);
                } else {
                    console.log('Invalid response structure:', response);
                    setCategories([]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    return (
        <Card
            title="Khám phá theo danh mục"
            className="mb-6"
            classNames={{ header: '!border-b-0', body: '!pt-0' }}
        >
            <div className="grid sm:grid-cols-6 gap-1 justify-items-left">
                {categories && categories.length > 0 ? (
                    categories.map((category) => (
                        <div
                            key={category.name}
                            className="text-center cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <Avatar
                                size={88}
                                src={category.thumbnailUrl}
                                alt={category.name}
                                className="mx-auto mb-3"
                            />
                            <p className="text-sm font-medium text-gray-900">{category.name}</p>
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