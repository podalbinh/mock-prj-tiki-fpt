import TopBestSellerBook from "@/layouts/user/home_page/TopBestSellerBook.tsx";
import RelatedSearches from "@/layouts/user/home_page/RelatedSearches.tsx";


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <>HOMEPAGE</>

        <RelatedSearches />
        <TopBestSellerBook />
    </div>
  );
};

export default HomePage;
