import ListProductsSearch from "@/components/common/ListProductsSearch";
import Sidebar from "@/components/Sidebar";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useSearchParams } from "react-router-dom";

const SearchByName = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  return (
    <div className="flex flex-col min-h-screen mb-8 p-2 md:p-4 lg:p-6">
      {/* Nội dung */}
      <div className="flex-1">
        <Layout className="bg-transparent">
          <Content>
            <div className="w-full mx-auto py-2 md:py-6">
              <div className="flex flex-col lg:flex-row gap-3 items-start">
                <Sidebar />
                <main className="flex-1 overflow-y-auto w-full">
                  <ListProductsSearch keyword={keyword} />
                </main>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
};

export default SearchByName;
