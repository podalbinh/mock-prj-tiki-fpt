import {useCallback, useEffect, useRef, useState} from "react";
import AdminTable, {type CustomTableColumn} from "@/components/common/Table";
import type {Book, Category} from "@/constant/interfaces";
import {useLoaderData, useRevalidator} from "react-router-dom";
import {App, Button} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalConfirm from "../modals/ModalConfirm";
import {useBook} from "@/hooks/useBook.ts";
import ModalFormCreateBook from "@/components/modals/ModalFormCreateBook.tsx";
import { useCategory } from "@/hooks/useCategory.ts";

const BookManagementTable = () => {
    const books = useLoaderData() as Book[];
    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);
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

    const columns: CustomTableColumn<Book>[] = [
        {
            key: "name",
            title: "Tên sách",
            dataIndex: "name",
            width: 200,
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
                <AdminTable<Book>
                    data={books}
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
