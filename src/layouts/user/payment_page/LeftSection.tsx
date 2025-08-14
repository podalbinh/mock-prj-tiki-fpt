import PaymentMethod from "./PaymentMethod";
import DeliveryMethod from "@/layouts/user/payment_page/DeliveryMethod.tsx";

export default function LeftSection() {
    return (
        <>
            <DeliveryMethod />
            <PaymentMethod />
        </>
    );
}
