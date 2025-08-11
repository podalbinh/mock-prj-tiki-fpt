import { Form, Input, Select, Button, Space, InputNumber } from "antd";
import type { FormProps } from "antd";
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import type {Author, Book, Category} from "@/constant/interfaces";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {useCategory} from "@/hooks/useCategory.ts";
import useUpload from "@/hooks/useUpload.ts";
import type {RcFile} from "antd/es/upload";

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
    const { uploadImage } = useUpload();
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
        { code: "publisherVn", name: "Công ty phát hành" },
        { code: "publicationDate", name: "Năm xuất bản" },
        { code: "dimensions", name: "Kích thước" },
        { code: "dichGia", name: "Dịch Giả" },
        { code: "bookCover", name: "Loại bìa" },
        { code: "numberOfPage", name: "Số trang" },
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
            console.log("defaultValues", defaultValues);
            form.setFieldsValue({
                ...defaultValues,
                authors: defaultValues.authors?.map((a) => a.name).join(", "),
                categoriesId: defaultValues.categoriesId,
            });

            // Map ảnh từ defaultValues vào fileList để hiển thị
            const files: UploadFile[] = defaultValues.images?.map((img, index) => ({
                uid: `${index}`,
                name: `image-${index}`,
                status: 'done',
                url: img.baseUrl,
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

        // Gửi ảnh lên server
        const images = [];
        for (const file of fileList) {
            const res = await uploadImage(file.originFileObj as RcFile);
            images.push(
                {
                    baseUrl: res.url,
                    isGallery: res.url.includes('gallery'),
                    label: res.url.includes('gallery') ? 'Gallery' : '',
                    largeUrl: res.url,
                    mediumUrl: res.url,
                    smallUrl: res.url,
                    thumbnailUrl: res.url,
                }
            )
        }

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
        let specifications = {};

        if (
            "manufacturer" in formValues
            && "dichGia" in formValues
            && "publisherVn" in formValues
            && "dimensions" in formValues
            && "numberOfPage" in formValues
        ) {
            specifications = {
                'manufacturer': formValues.manufacturer,
                'dichGia': formValues.dichGia,
                'publisherVn': formValues.publisherVn,
                'dimensions': formValues.dimensions,
                'numberOfPage': formValues.numberOfPage,
            }
        }

        // Tập hợp thành phần lại tạo thành sách
        const book: Partial<Book> = {
            name: formValues.name,
            authors,
            description: formValues.description ?? '',
            images,
            originalPrice: Number(formValues.originalPrice),
            listPrice: Number(formValues.listPrice),
            shortDescription: formValues.shortDescription ?? '',
            categoriesId: formValues.categoriesId,
            ...specifications,
            thumbnail: images[0].baseUrl
        };

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
                    name="categoriesId"
                    rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn danh mục"
                        className="h-10"
                        disabled={isUpdating}
                    >
                        {categoriesOption.map((option) => (
                            <Option key={option.id} value={option.id}>
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
                        name="originalPrice"
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
                        name="listPrice"
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
                    name="shortDescription"
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
                        beforeUpload={() => false} // Ngăn upload tự động
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
