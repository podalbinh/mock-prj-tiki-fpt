import { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

interface CounterProps {
    min?: number;
    max?: number;
    initial?: number;
    onChange?: (value: number) => void;
}

export default function Counter({ min = 1, max = 100, initial = 1, onChange }: CounterProps) {
    const [value, setValue] = useState(initial);

    const handleDecrease = () => {
        if (value > min) {
            const newValue = value - 1;
            setValue(newValue);
            onChange?.(newValue);
        }
    };

    const handleIncrease = () => {
        if (value < max) {
            const newValue = value + 1;
            setValue(newValue);
            onChange?.(newValue);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {/* Minus button */}
            <button
                onClick={handleDecrease}
                disabled={value <= min}
                className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 transition
                ${value <= min ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
            >
                <MinusOutlined style={{ fontSize: 16 }}/>
            </button>

            {/* Number */}
            <div className="w-10 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-sm">
                {value}
            </div>

            {/* Plus button */}
            <button
                onClick={handleIncrease}
                disabled={value >= max}
                className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 transition
                ${value >= max ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
            >
                <PlusOutlined style={{ fontSize: 16 }}/>
            </button>
        </div>
    );
}
