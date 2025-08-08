import CategorySection from "@/components/CategorySection";
import FeaturedCollections from "@/components/FeaturedCollections";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import Sidebar from "@/components/Sidebar";
import { Route, Routes } from "react-router-dom";




const HomePage = () => {

  return (
    <div className="flex flex-col min-h-screen">
        <PromoBanner />
        
        <div className="container mx-auto px-6 py-6" style={{ zIndex: 1 }}>
          <div className="flex gap-6">
            <Sidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={
                  <>
                    <div className="bg-white rounded-lg p-4 mb-6">
                      <h1 className="text-2xl font-semibold text-black">Nhà Sách Tiki</h1>
                    </div>
                    <FeaturedCollections />
                    <CategorySection />
                    <ProductGrid />
                  </>
                } />
              </Routes>
            </main>
          </div>
        </div>
    </div>
  );
};

export default HomePage;
