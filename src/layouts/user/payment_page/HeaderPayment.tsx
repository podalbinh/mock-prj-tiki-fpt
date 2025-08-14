
export default function HeaderPayment() {
    return (
        <div>
            <div className={"py-3 flex justify-center bg-[#EFFFF4]"}>
                <div className="text-green-600 text-xs font-semibold">
                    Freeship đơn từ 45k, giảm nhiều hơn cùng{" "}
                </div>
                <img
                    src="src/assets/freeship-extra.svg"
                    alt="Tiki"
                    className="h-4 mr-2"
                />
            </div>
            <div className="bg-white shadow-sm px-8 py-4 flex items-center flex gap-4">
                <img
                    src="src/assets/logo.svg"
                    alt="Tiki"
                    className="h-18 mr-2"
                />
                <span className="text-2xl font-normal text-[#1AA7FF] border-l-2 px-4 border-[#1AA7FF]">Thanh toán</span>
            </div>
        </div>
    );
}
