import BookDescription from "@/layouts/user/book_detail_page/BookDescription";
import BookImageGallery from "@/layouts/user/book_detail_page/BookImageGallery";
import BookInfo from "@/layouts/user/book_detail_page/BookInfo";
import BookMetaData from "@/layouts/user/book_detail_page/BookMetaData";
import PurchaseActions from "@/layouts/user/book_detail_page/PurchaseActions";
import {Card, Layout} from "antd";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useBook} from "@/hooks/useBook.ts";
import type { Book } from "@/constant/interfaces";
import { Content } from "antd/es/layout/layout";
import SummaryToggle from "@/layouts/user/book_detail_page/SummaryToggle.tsx";

export default function BookDetail() {
    const { id } = useParams<{ id: string }>();
    const { getBookById } = useBook();
    const [book, setBook] = useState<Book>();

    useEffect(() => {
        if (!id) return;

        const bookId = Number(id);
        if (isNaN(bookId)) return;

        (async () => {
            const data = await getBookById(bookId);
            setBook(data);
        })();
        console.log(book);
    }, [id]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Nội dung */}
            <div className="flex-1">
                <Layout className="bg-transparent">
                    <Content>
                        <div className="pt-10"></div>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-4">
                                <div className="bg-white rounded-lg p-3 flex flex-col gap-4">
                                    <BookImageGallery images={book?.images || []}/>
                                    <SummaryToggle content={book?.shortDescription || ""}/>
                                </div>

                            </div>
                            <div className="col-span-5 flex flex-col gap-3">
                                <Card>
                                    <BookInfo book={book || undefined}/>
                                </Card>
                                <Card>
                                    <BookMetaData />
                                </Card>
                                <Card>
                                    <BookDescription />
                                </Card>
                            </div>

                            <div className="col-span-3">
                                <PurchaseActions />
                            </div>
                        </div>
                    </Content>
                </Layout>
            </div>
        </div>
    );
}