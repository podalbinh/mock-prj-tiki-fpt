import { useCallback, useRef, useState } from "react";
import AdminTable, {type CustomTableColumn} from "@/components/common/Table";
import type {Book} from "@/constant/interfaces";
import { useLoaderData } from "react-router-dom";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalConfirm from "../modals/ModalConfirm";
import {useBook} from "@/hooks/useBook.ts";
import ModalFormCreateBook from "@/components/modals/ModalFormCreateBook.tsx";

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
        key: "original_price",
        title: "Giá gốc",
        dataIndex: "original_price",
        align: "center",
        render: (value) => `${value.toLocaleString()} VND`
    },
    {
        key: "categories",
        title: "Phân loại",
        dataIndex: "categories",
        align: "center",
        width: 100,
        render: (value) => {
            if (typeof value !== "object") return "-";
            return "name" in value && `${(value)?.name.toLocaleString()}` || "-";
        }
    },
    {
        key: "quantity_sold",
        title: "Số lượng đã bán",
        dataIndex: "quantity_sold",
        align: "center",
        render: (value) => {
            if (typeof value !== "object") return "-";
            return "value" in value && `${(value)?.value.toLocaleString()} quyển` || "-";
        }
    },
    {
        key: "short_description",
        title: "Mô tả ngắn",
        dataIndex: "short_description",
        width: 400,
    },
];

const BookManagementTable = () => {
    const books = useLoaderData() as Book[];
    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const {createBook, deleteBook } = useBook();

    const userToDeleteRef = useRef<Book | null>(null);

    //TODO: Implement edit and delete functionality
    const handleEdit = useCallback(async (book: Book) => {
        //const { id, ...userData } = user;
        //await updateUser(id, userData);
        console.log("Chỉnh sửa:", book);
    }, []);

    const handleDelete = useCallback((book: Book) => {
        userToDeleteRef.current = book;
        setOpenModalDelete(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        const book = userToDeleteRef.current;
        if (!book) return;

        try {
            await deleteBook(book.id);
            message.success("Xóa sách thành công!");
            // bạn nên trigger revalidate ở đây (VD: bằng useFetcher.load hoặc navigate để reload)
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
                await createBook(values);
                message.success("Tạo sách mới thành công!");
            } catch (error) {
                console.error("Error creating book:", error);
                message.error("Tạo sách mới thất bại!");
            } finally {
                setOpenModal(false);
            }
        },
        [createBook]
    );

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
                onClose={() => setOpenModal(false)}
                handleSubmit={handleSubmitForm}
            />

            <ModalConfirm
                title="Xác nhận xóa sách"
                description="Bạn có chắc chắn muốn xóa sách này? Hành động này không thể hoàn tác."
                onOk={handleConfirmDelete}
                onCancel={() => setOpenModalDelete(false)}
                open={openModalDelete}
            />
        </>
    );
};

export default BookManagementTable;
