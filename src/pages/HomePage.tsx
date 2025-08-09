import { Layout } from "antd";
import Sidebar from "@/components/Sidebar";
import FeaturedCollections from "@/components/FeaturedCollections";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/common/ProductGrid";

const { Content, Footer } = Layout;

const HomePage = () => {
  return (
      <div className="flex flex-col min-h-screen bg-[#f5f6fa]">
        {/* Nội dung */}
        <div className="flex-1">
          <Layout className="bg-transparent">
            <Content>
              <div className="max-w-[1450px] w-full mx-auto py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <Sidebar />
                  <main className="flex-1">
                    <div className="bg-white rounded-lg p-4 mb-6">
                      <h1 className="text-2xl font-semibold text-black">
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

        {/* Footer */}
        <Footer className="bg-white text-center py-6 border-t">
          © {new Date().getFullYear()} Nhà Sách Tiki. All rights reserved.
        </Footer>
      </div>
  );
};

export default HomePage;
