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
import SimilarProducts from "@/layouts/user/book_detail_page/SimilarProducts.tsx";
import TopDeals from "@/layouts/user/book_detail_page/TopDeals.tsx";
import SaveShopping from "@/layouts/user/book_detail_page/SaveShopping.tsx";

export default function BookDetail() {
    const { id } = useParams<{ id: string }>();
    const { getBookById } = useBook();
    const [book, setBook] = useState<Book>();

    useEffect(() => {
        if (!id) return;

        const bookId = Number(id);
        if (isNaN(bookId)) return;

        (async () => {
            try {
                const data = await getBookById(bookId);
                setBook(data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        })();
    }, [id]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Nội dung */}
            <div className="flex-1">
                <Layout className="bg-transparent">
                    <Content className="mb-8">
                        <div className="pt-10"></div>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-3">
                                <div className="bg-white rounded-lg p-3 flex flex-col gap-4">
                                    <BookImageGallery images={book?.images || []}/>
                                    <SummaryToggle content={book?.shortDescription || ""}/>
                                </div>

                            </div>
                            <div className="col-span-6 flex flex-col gap-3">
                                <Card>
                                    <BookInfo book={book || undefined}/>
                                </Card>
                                <div className={"bg-white rounded-lg p-4 flex flex-col gap-4"}>
                                    <BookMetaData book={book || undefined}/>
                                </div>
                                <Card>
                                    <BookDescription book={book || undefined}/>
                                </Card>
                                <Card>
                                    <SimilarProducts book={book || undefined}/>
                                </Card>
                                <Card>
                                    <TopDeals/>
                                </Card>
                                <Card>
                                    <SaveShopping/>
                                </Card>
                            </div>

                            <div className="col-span-3">
                                <PurchaseActions book={book || undefined}/>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </div>
        </div>
    );
}