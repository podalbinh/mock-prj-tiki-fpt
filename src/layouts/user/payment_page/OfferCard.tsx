import { InfoCircleOutlined } from "@ant-design/icons";

type OfferCardProps = {
    title: string;
    subtitle?: string;
    brandLogo: string;
};

export default function OfferCard({ title, subtitle, brandLogo }: OfferCardProps) {
    return (
        <div className="bg-white border rounded shadow-sm p-3 flex flex-col justify-between min-h-[90px] hover:border-[#0D5CB6] duration-200 cursor-pointer">

            <div className="flex items-start justify-between">
                <div className={"w-full"}>
                    <div className="flex items-center gap-2">
                        <div className="text-[17px] font-semibold text-[#0D5CB6]">{title}</div>
                        <div className="flex-1"></div>
                        <div>
                            <img src={brandLogo} alt="logo" className="h-5 ml-2" />
                        </div>
                    </div>

                    {subtitle && (
                        <div className="flex items-center gap-1">
                            <div className="text-[11px] text-gray-600">{subtitle}</div>
                            <div className={"flex-1"}></div>
                            <InfoCircleOutlined className="text-gray-400" />
                        </div>
                    )}
                </div>

            </div>

            <div className="flex items-center justify-between mt-2">
                <div>
                    <div className="text-[11px] text-[#FD820A] italic">
                        Không giới hạn
                    </div>
                </div>
            </div>
        </div>
    );
}
