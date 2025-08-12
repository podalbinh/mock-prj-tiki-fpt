import {useCallback, useEffect, useRef, useState} from "react";
import AdminTable, {type CustomTableColumn} from "@/components/common/Table";
import type {Book, Category} from "@/constant/interfaces";
import {useLoaderData, useRevalidator} from "react-router-dom";
import {App, Button, Input, Select, Image} from "antd";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import ModalConfirm from "../modals/ModalConfirm";
import {useBook} from "@/hooks/useBook.ts";
import ModalFormCreateBook from "@/components/modals/ModalFormCreateBook.tsx";
import { useCategory } from "@/hooks/useCategory.ts";
const { Option } = Select;

const BookManagementTable = () => {
    const books = useLoaderData() as Book[];
    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [fieldSelected, setFieldSelected] = useState(undefined);
    const [booksShowed, setBooksShowed] = useState(books);
    const [order, setOrder] = useState<"asc" | "desc" | undefined>(undefined);
    const {createBook, deleteBook, updateBook } = useBook();
    const revalidator = useRevalidator();
    const { getAllCategories } = useCategory();
    const [categoriesOption, setCategoriesOption] = useState<Category[]>([]);
    const { message } = App.useApp();

    const userToDeleteRef = useRef<Book | null>(null);
    useEffect(() => {
        // Lấy Categories
        (async () => {
            const data = await getAllCategories();
            setCategoriesOption(data);
        })();
    }, [])

    const handleEdit = useCallback(async (book: Book) => {
        setEditingBook(book);
        setIsEditing(true);
        setOpenModal(true);
    }, []);

    const handleCloseModal = () => {
        if (isEditing) {
            setEditingBook(undefined);
            setIsEditing(false);

        }
        setOpenModal(false);
    };

    const handleDelete = useCallback((book: Book) => {
        userToDeleteRef.current = book;
        setOpenModalDelete(true);
    }, []);

    const handleCancelDelete = useCallback(() => {
        userToDeleteRef.current = null;
        setOpenModalDelete(false);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        const book = userToDeleteRef.current;
        if (!book) return;

        try {
            await deleteBook(book.id);
            message.success("Xóa sách thành công!");
            revalidator.revalidate();
        } catch (error) {
            console.error("Xóa sách thất bại:", error);
            message.error("Xóa sách thất bại!");
        } finally {
            userToDeleteRef.current = null;
            setOpenModalDelete(false);
        }
    }, [deleteBook]);

    const handleSubmitForm = useCallback(
        async (values: Book) => {
            try {
                if (isEditing && editingBook) {
                    await updateBook(editingBook.id, {
                        ...editingBook,
                        listPrice: values.listPrice,
                        shortDescription: values.shortDescription,
                        description: values.description,
                        images: values.images,
                    });
                    setIsEditing(false);
                    setEditingBook(undefined)
                    message.success("Cập nhật sách thành công!");
                } else {
                    await createBook(values);
                    message.success("Tạo sách mới thành công!");
                }

                revalidator.revalidate();
            } catch (error) {
                if (isEditing && editingBook) {
                    console.error("Error update book:", error);
                    message.error("Cập nhật sách thất bại!");
                } else {
                    console.error("Error creating book:", error);
                    message.error("Tạo sách mới thất bại!");
                }
            } finally {
                setOpenModal(false);
            }
        },
        [createBook, isEditing, updateBook, message, revalidator]
    );
    
    const searchBooksByName = function (text: string) {
        if (text === "") setBooksShowed(books);
        else {
            const result = books.filter((book) => book.name.toLowerCase().includes(text.toLowerCase()));
            setBooksShowed(result);
        }
    }

    const sortBooks = (field: keyof Book, order: "asc" | "desc") => {
        const sortedBooks = [...booksShowed].sort((a, b) => {
            const valA = a[field];
            const valB = b[field];

            if (valA === valB) return 0;

            if (order === "asc") {
                return valA > valB ? 1 : -1;
            } else {
                return valA > valB ? -1 : 1;
            }
        });

        setBooksShowed(sortedBooks);
    };

    const columns: CustomTableColumn<Book>[] = [
        {
            key: "name",
            title: "Tên sách",
            dataIndex: "name",
            width: 200,
        },
        {
            key: "images",
            title: "Ảnh bìa",
            dataIndex: "images",
            width: 200,
            render: (value) => {
                if (!Array.isArray(value) || value.length === 0) return "-";
                if (value.length === 0) return "-";
                if (typeof value[0] !== "object") return "-";
                if (!("baseUrl" in value[0])) return "-";
                return (
                    <Image
                        src={value[0].baseUrl || ""}
                        alt="Sách"
                        width={80}
                        height={120}
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                    />
                );
            },
        },
        {
            key: "authors",
            title: "Tác giả",
            dataIndex: "authors",
            align: "center",
            width: 150,
            render: (value) => {
                if (!Array.isArray(value)) return "-";
                return value.map((author) => "name" in author && author?.name || "-").join(", ");
            }
        },
        {
            key: "originalPrice",
            title: "Giá gốc",
            dataIndex: "originalPrice",
            align: "center",
            render: (value) => `${value.toLocaleString()} VND`
        },
        {
            key: "categoriesId",
            title: "Phân loại",
            dataIndex: "categoriesId",
            align: "center",
            width: 100,
            render: (value) => {
                const category = categoriesOption.filter((c) => c.id === value)[0];
                return category?.name || "-";
            }
        },
        {
            key: "quantitySold",
            title: "Số lượng đã bán",
            dataIndex: "quantitySold",
            align: "center",
            render: (value) => `${value} quyển`
        },
        {
            key: "shortDescription",
            title: "Mô tả ngắn",
            dataIndex: "shortDescription",
            width: 400,
        },
    ];

    return (
        <>
            <div className={`bg-white rounded-lg shadow-sm`}>
                <div className="flex px-6 py-4 justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Quản lý sách
                    </h3>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setOpenModal(true)}
                        size="large"
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Tạo sách mới
                    </Button>
                </div>

                <div className="flex gap-3">
                    <Input
                        placeholder="Tìm kiếm theo tên sách"
                        allowClear
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            searchBooksByName(searchText);
                        }}
                        onPressEnter={() => searchBooksByName(searchText)}
                        style={{ width: 250 }}
                        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />

                    <Select
                        placeholder="Chọn trường sắp xếp"
                        allowClear
                        value={fieldSelected}
                        onChange={(value) => {
                            setFieldSelected(value);
                            if (value && order !== undefined) {
                                sortBooks(value, order);
                            } else {
                                setBooksShowed(booksShowed);
                            }
                        }}
                        style={{ width: 180 }}
                    >
                        <Option value="quantitySold">Số lượng đã bán</Option>
                        <Option value="originalPrice">Giá gốc</Option>
                        <Option value="name">Tên sách</Option>
                        <Option value="authors">Tác giả</Option>
                    </Select>

                    <Select
                        placeholder="Chọn chiều sắp xếp"
                        allowClear
                        value={order}
                        onChange={(value) => {
                            setOrder(value || undefined);
                            if (fieldSelected) {
                                sortBooks(fieldSelected, value);
                            }
                        }}
                        style={{ width: 180 }}
                    >
                        <Option value="asc">Tăng dần</Option>
                        <Option value="desc">Giảm dần</Option>
                    </Select>
                </div>

                <AdminTable<Book>
                    data={booksShowed}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <ModalFormCreateBook
                isOpen={openModal}
                onClose={handleCloseModal}
                handleSubmit={handleSubmitForm}
                defaultValues={editingBook}
            />

            <ModalConfirm
                title="Xác nhận xóa sách"
                description="Bạn có chắc chắn muốn xóa sách này? Hành động này không thể hoàn tác."
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                open={openModalDelete}
            />
        </>
    );
};

export default BookManagementTable;
