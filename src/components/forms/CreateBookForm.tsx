import { Form, Input, Select, Button, Space, InputNumber } from "antd";
import type { FormProps } from "antd";
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import type {Attribute, Author, Book, Category, Specification} from "@/constant/interfaces";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {useImage} from "@/hooks/useImage.ts";
import {useCategory} from "@/hooks/useCategory.ts";

const { Option } = Select;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


interface CreateBookFormProps {
    onSubmit?: (values: Book) => void;
    onCancel?: () => void;
    loading?: boolean;
    defaultValues?: Book;
    isUpdating?: boolean;
}

export default function CreateBookForm({
                                           onSubmit,
                                           onCancel,
                                           loading = false,
                                            isUpdating = false,
                                            defaultValues
                                       }: CreateBookFormProps) {
    const [form] = Form.useForm();
    const { uploadMultipleImages } = useImage();
    const { getAllCategories } = useCategory();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const attributeDefinitions = [
        { code: "publisher_vn", name: "Công ty phát hành" },
        { code: "publication_date", name: "Năm xuất bản" },
        { code: "dimensions", name: "Kích thước" },
        { code: "dich_gia", name: "Dịch Giả" },
        { code: "book_cover", name: "Loại bìa" },
        { code: "number_of_page", name: "Số trang" },
        { code: "manufacturer", name: "Nhà xuất bản" },
    ];
    const [categoriesOption, setCategoriesOption] = useState<Category[]>([]);

    useEffect(() => {
        // Lấy Categories
        (async () => {
            const data = await getAllCategories();
            setCategoriesOption(data);
        })();

        if (isUpdating && defaultValues) {
            // Đặt lại GT một số trường khi update
            form.setFieldsValue({
                ...defaultValues,
                authors: defaultValues.authors?.map((a) => a.name).join(", "),
                categories: defaultValues.categories?.name,
            });

            // Map ảnh từ defaultValues vào fileList để hiển thị
            const files: UploadFile[] = defaultValues.images?.map((img, index) => ({
                uid: `${index}`,
                name: `image-${index}`,
                status: 'done',
                url: img.base_url,
            })) || [getAllCategories];

            setFileList(files);
        } else {
            setFileList([]);
            form.resetFields();
        }
    }, [defaultValues, isUpdating]);


    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleFinish: FormProps<Book>["onFinish"] = async (formValues) => {
        setIsSubmitting(true);

        // Gửi ảnh lên firebase
        const imageUrls: string[] = await uploadMultipleImages(
            fileList
                .filter((f) => !!f.originFileObj)
                .map((f) => f.originFileObj as File)
        );

        // Tạo ds ảnh trong book
        const images = imageUrls.map((url, index) => ({
            base_url: url,
            is_gallery: index !== 0, // ảnh đầu tiên không phải gallery
            label: '',
            large_url: url,
            medium_url: url,
            small_url: url,
            thumbnail_url: url,
        }));

        // Tạo ds tác giả trong book
        const authors: Author[] = formValues.authors
            ? formValues.authors.toString()
                .split(',')
                .map((name: string) => name.trim())
                .filter((name: string) => name.length > 0)
                .map((name: string) => ({
                    id: 0,
                    name,
                    slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
                }))
            : [];

        // Thông số kỹ thuật
        const specifications: Specification[] = [];

        if (
            "manufacturer" in formValues
            && "dich_gia" in formValues
            && "publisher_vn" in formValues
            && "dimensions" in formValues
            && "number_of_page" in formValues
        ) {
            specifications.push({
                name: 'Thông tin sách',
                attributes: [
                    formValues.manufacturer && { code: 'manufacturer', name: 'Nhà sản xuất', values: formValues.manufacturer },
                    formValues.dich_gia && { code: 'dich_gia', name: 'Dịch giả', values: formValues.dich_gia },
                    formValues.publisher_vn && { code: 'publisher_vn', name: 'Nhà xuất bản', values: formValues.publisher_vn },
                    formValues.dimensions && { code: 'dimensions', name: 'Kích thước', values: formValues.dimensions },
                    formValues.number_of_page && { code: 'number_of_page', name: 'Số trang', values: formValues.number_of_page },
                ].filter(Boolean) as Attribute[]
            });
        }

        // Lấy Category
        const category = categoriesOption.find((c) => c.name === formValues?.categories) as Category;

        // Tập hợp thành phần lại tạo thành sách
        const book: Partial<Book> = {
            name: formValues.name,
            authors,
            description: formValues.description ?? '',
            images,
            original_price: Number(formValues.original_price),
            list_price: Number(formValues.list_price),
            short_description: formValues.short_description ?? '',
            categories: category,
            specifications,
        };

        console.log("book: ", book);
        console.log("formValues: ", formValues);
        onSubmit?.(book as Book);
        setIsSubmitting(false);
        form.resetFields();
    };

    const handleFinishFailed: FormProps<Book>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <div className="w-full max-w-md mx-auto">
            <Form
                form={form}
                name="createBook"
                layout="vertical"
                onFinish={handleFinish}
                onFinishFailed={handleFinishFailed}
                autoComplete="off"
                className="space-y-4"
            >
                <div className="text-lg font-bold text-gray-700">Thông tin chung</div>
                <Form.Item
                    label={
                        <span className="text-sm font-medium text-gray-700">Tên sách</span>
                    }
                    name="name"
                    rules={[
                        { required: true, message: "Tên sách không được để trống" },
                    ]}
                >
                    <Input
                        placeholder="Nhập tên sách"
                        className="h-10"
                        disabled={isUpdating}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <span className="text-sm font-medium text-gray-700">Tác giả</span>
                    }
                    name="authors"
                    rules={[
                        { required: true, message: "Tác giả không được để trống" },
                    ]}
                >
                    <Input
                        placeholder="Nhập tác giả (nếu có nhiều tác gỉa phân cách bằng dấu ,)"
                        className="h-10"
                        disabled={isUpdating}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <span className="text-sm font-medium text-gray-700">Danh mục</span>
                    }
                    name="categories"
                    rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn danh mục"
                        className="h-10"
                        disabled={isUpdating}
                    >
                        {categoriesOption.map((option) => (
                            <Option key={option.id} value={option.name}>
                                {option.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <div className='grid grid-cols-2 gap-4'>
                    <Form.Item
                        label={
                            <span className="text-sm font-medium text-gray-700">Giá gốc</span>
                        }
                        name="original_price"
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (value === undefined || value === null) {
                                        return Promise.reject("Giá không được để trống");
                                    }
                                    if (value <= 0) {
                                        return Promise.reject("Giá phải lớn hơn 0");
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <InputNumber
                            addonAfter="VND"
                            min={0}
                            placeholder="Nhập giá gốc"
                            disabled={isUpdating}
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span className="text-sm font-medium text-gray-700">Giá niêm yết</span>
                        }
                        name="list_price"
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (value === undefined || value === null) {
                                        return Promise.reject("Giá không được để trống");
                                    }
                                    if (value <= 0) {
                                        return Promise.reject("Giá phải lớn hơn 0");
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <InputNumber addonAfter="VND" min={0} placeholder="Nhập giá gốc" />
                    </Form.Item>
                </div>

                <Form.Item
                    label={
                        <span className="text-sm font-medium text-gray-700">Mô tả ngắn</span>
                    }
                    name="short_description"
                >
                    <Input.TextArea
                        placeholder={"Mô tả ngắn"}
                        rows={2}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <span className="text-sm font-medium text-gray-700">Mô tả chi tiết</span>
                    }
                    name="description"
                >
                    <Input.TextArea
                        placeholder={"Mô tả chi tiết"}
                        rows={4}
                    />
                </Form.Item>

                <hr className={`${isUpdating ? 'hidden' : ''}`}/>

                <div className={`text-lg font-bold text-gray-700 ${isUpdating ? 'hidden' : ''}`}>
                    Thông tin chi tiết
                </div>
                <div className={`grid grid-cols-2 gap-4 ${isUpdating ? 'hidden' : ''}`}>
                    {attributeDefinitions.map((attr) => (
                        <Form.Item
                            key={attr.code}
                            name={attr.code}
                            label={attr.name}
                            rules={[{ required: !isUpdating, message: `Vui lòng nhập ${attr.name}` }]}
                        >
                            <Input />
                        </Form.Item>
                    ))}
                </div>

                <hr/>
                <div className="text-lg font-bold text-gray-700">Ảnh sản phẩm</div>

                <Form.Item
                    name="images"
                    label="Hình ảnh"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        // Normalize the upload event
                        return Array.isArray(e) ? e : e?.fileList;
                    }}
                    rules={[{ required: true, message: "Vui lòng tải lên ít nhất 1 ảnh!" }]}
                >
                    <Image.PreviewGroup/>
                    <Upload
                        listType="picture-card"
                        onPreview={handlePreview}
                        // beforeUpload={() => false} // Ngăn upload tự động
                        onChange={({ fileList: newFileList }) => {
                            const updatedList = newFileList.map(file => {
                                // Nếu chưa có link (ảnh mới) → tạo thumbUrl tạm
                                if (!file.url && !file.thumbUrl && file.originFileObj) {
                                    return {
                                        ...file,
                                        thumbUrl: URL.createObjectURL(file.originFileObj),
                                    };
                                }
                                return file; // Ảnh cũ giữ nguyên
                            });

                            setFileList(updatedList);
                            form.setFieldsValue({ images: updatedList });
                        }}
                        fileList={fileList}
                    >
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                        {uploadButton}
                    </Upload>
                </Form.Item>

                <Form.Item className="mb-0 pt-4">
                    <Space className="w-full justify-end">
                        <Button
                            disabled={isSubmitting}
                            onClick={onCancel}
                            className="px-6"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            disabled={isSubmitting}
                            className="px-6 bg-blue-600 hover:bg-blue-700"
                        >
                            {
                                isSubmitting ? "Đang lưu...":
                                    isUpdating ? "Cập nhật sách" :
                                        "Tạo sách mới"
                            }
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}
