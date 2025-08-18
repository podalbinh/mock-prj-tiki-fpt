import { LikeFilled } from "@ant-design/icons";

const TopDeal = () => {
  return (
    <div className={`flex text-red-600 items-center gap-1 text-xs`}>
      <LikeFilled />
      <div className="font-extrabold flex text-inherit gap-0 flex-col leading-3">
        <span>TOP</span>
        <span>DEAL</span>
      </div>
    </div>
  );
};

export default TopDeal;
