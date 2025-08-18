import LeftSection from "@/layouts/user/payment_page/LeftSection.tsx";
import RightSection from "@/layouts/user/payment_page/RightSection.tsx";
import PaymentHeader from "@/layouts/user/payment/PaymentHeader.tsx";
import PaymentFooter from "@/layouts/user/payment/PaymentFooter.tsx";

export default function Payment() {
  return (
    <div className="bg-[#F5F5FA] min-h-screen">
      <PaymentHeader />
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2 space-y-4">
          <LeftSection />
        </div>
        <div className="space-y-4">
          <RightSection />
        </div>
      </div>
      <PaymentFooter />
    </div>
  );
}
