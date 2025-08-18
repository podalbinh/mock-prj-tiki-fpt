import { CheckCircleFilled } from "@ant-design/icons";

const Authentic = () => {
  return (
    <div className={`flex items-center gap-1 font-extrabold text-xs`}>
      <CheckCircleFilled className="text-blue-600" />
      <div className="flex text-blue-600 gap-0 flex-col leading-3">
        <span>CHÍNH</span>
        <span>HÃNG</span>
      </div>
    </div>
  );
};

export default Authentic;
