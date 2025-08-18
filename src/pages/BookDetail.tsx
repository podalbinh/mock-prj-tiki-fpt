import BookDescription from "@/layouts/user/book_detail_page/BookDescription";
import BookImageGallery from "@/layouts/user/book_detail_page/BookImageGallery";
import BookInfo from "@/layouts/user/book_detail_page/BookInfo";
import BookMetaData from "@/layouts/user/book_detail_page/BookMetaData";
import PurchaseActions from "@/layouts/user/book_detail_page/PurchaseActions";
import { Card, Layout } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useBook } from "@/hooks/useBook.ts";
import type { Book } from "@/constant/interfaces";
import { Content } from "antd/es/layout/layout";
import SummaryToggle from "@/layouts/user/book_detail_page/SummaryToggle.tsx";
import SimilarProducts from "@/layouts/user/book_detail_page/SimilarProducts.tsx";
import TopDeals from "@/layouts/user/book_detail_page/TopDeals.tsx";
import SaveShopping from "@/layouts/user/book_detail_page/SaveShopping.tsx";
import CustomBreadcrumb from "@/components/common/Breadcrumb";

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
        console.error("Error fetching book:", error);
      }
    })();
  }, [id]);

  const breadcrumbItems = useMemo(() => {
    return [
      { title: "Trang chủ", href: "/" },
      {
        title: "Nhà sách tiki",
        href: "/",
      },
      {
        title: book?.name || "Chi tiết sách",
        href: `/books/${book?.id}`,
      },
    ];
  }, [book]);

  return (
    <div className="flex flex-col min-h-screen">
      <CustomBreadcrumb items={breadcrumbItems} />
      {/* Nội dung */}
      <div className="flex-1">
        <Layout className="bg-transparent">
          <Content className="mb-8 mt-5">
            <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
              <div className="md:col-span-5 lg:col-span-3">
                <div className="bg-white rounded-lg p-3 flex flex-col gap-4">
                  <BookImageGallery images={book?.images || []} />
                  <SummaryToggle content={book?.shortDescription || ""} />
                </div>
              </div>
              <div className="md:col-span-7 lg:col-span-6 flex flex-col gap-3">
                <Card>
                  <BookInfo book={book || undefined} />
                </Card>
                <div className={"bg-white rounded-lg p-4 flex flex-col gap-4"}>
                  <BookMetaData book={book || undefined} />
                </div>
                <Card>
                  <BookDescription book={book || undefined} />
                </Card>
                <Card>
                  <SimilarProducts book={book || undefined} />
                </Card>
                <Card>
                  <TopDeals />
                </Card>
                <Card>
                  <SaveShopping />
                </Card>
              </div>

              <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center lg:static lg:col-span-3">
                <div className={"w-full lg:w-full"}>
                  <PurchaseActions book={book || undefined} />
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
}
