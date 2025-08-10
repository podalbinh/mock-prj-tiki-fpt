import { Layout } from "antd";
import Sidebar from "@/components/Sidebar";
import FeaturedCollections from "@/components/FeaturedCollections";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/common/ProductGrid";
import TopBestSellerBook from "@/layouts/user/home_page/TopBestSellerBook.tsx";
import RelatedSearches from "@/layouts/user/home_page/RelatedSearches.tsx";

const { Content } = Layout;

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f6fa]">
      {/* Nội dung */}
      <div className="flex-1">
        <Layout className="bg-transparent">
          <Content>
            <div className="max-w-[1450px] w-full mx-auto py-6">
              <div className="flex flex-col lg:flex-row gap-3 items-start">
                <Sidebar />
                <main className="flex-1">
                  <div className="bg-white rounded-lg">
                    <h1 className="text-2xl font-semibold text-black p-4">
                      Nhà Sách Tiki
                    </h1>
                  </div>
                  <FeaturedCollections />
                  <CategorySection />
                  <ProductGrid />
                </main>
              </div>
            </div>
          </Content>
        </Layout>
      </div>

      <RelatedSearches />
      <TopBestSellerBook />
    </div>
  );
};

export default HomePage;
