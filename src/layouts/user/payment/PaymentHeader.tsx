import logo from "@/assets/logo.svg";
import { Image } from "antd";
import { Link } from "react-router-dom";

const PaymentHeader = ({ isConfirm = false }: { isConfirm?: boolean }) => {
  return (
    <div className="flex w-full overflow-hidden bg-white py-2 px-4 md:px-6 shadow-sm">
      <Link to="/" className="md:mx-4 max-h-min">
        <Image src={logo} alt="Logo" preview={false} />
      </Link>
      <div className="flex items-center">
        {!isConfirm && (
          <div className="border-l border-blue-400 max-h-max leading-normal text-2xl pl-4 ml-4 md:ml-0 text-blue-400">
            Thanh Toán
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHeader;
