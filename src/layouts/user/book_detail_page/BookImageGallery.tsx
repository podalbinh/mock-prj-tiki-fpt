import type {ImageBook} from "@/constant/interfaces.ts";
import {useEffect, useRef, useState} from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface BookImageGalleryProps {
    images: ImageBook[];
}

export default function BookImageGallery({ images }: BookImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState("");
    const thumbnailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (images.length > 0) {
            setSelectedImage(images[0].baseUrl || "");
        }
    }, [images]);

    const scrollThumbnails = (direction: "left" | "right") => {
        if (thumbnailRef.current) {
            const scrollAmount = 80 * 3; // mỗi lần cuộn 3 ảnh
            thumbnailRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Ảnh chính */}
            <div
                style={{
                    width: 368,
                    height: 370,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#ffffff",
                    borderRadius: 8,
                    overflow: "hidden"
                }}

                className={"border border-gray-200 rounded-lg"}
            >
                <img
                    src={selectedImage}
                    alt="Book"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain"
                    }}
                />
            </div>

            {/* Khu vực thumbnail */}
            <div className="relative flex items-center mt-3 w-[400px]">
                 {/*Nút trái */}
                <button
                    className={`absolute left-0 z-10 bg-white border rounded-full p-1 shadow hover:bg-gray-100 ${images.length < 6 ? "hidden" : ""}`}
                    onClick={() => scrollThumbnails("left")}
                >
                    <LeftOutlined />
                </button>

                {/* List thumbnails */}
                <div
                    ref={thumbnailRef}
                    className="flex gap-2 overflow-x-hidden scroll-smooth px-8"
                >
                    {images.map((img, idx) => (
                        <div key={idx}
                            style={{
                                width: 54,
                                height: 54,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#ffffff",
                                borderRadius: 8,
                                overflow: "hidden"
                            }}

                             className={`border-2 rounded-lg cursor-pointer flex-shrink-0 ${
                                         selectedImage === img.baseUrl ? "border-blue-500" : "border-gray-200"
                             }`}

                             onClick={() => setSelectedImage(img.baseUrl || "")}
                        >
                            <img
                                src={img.baseUrl || ""}
                                alt="Book"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </div>
                    ))}
                </div>

                 {/*Nút phải */}
                <button
                    className={`absolute right-0 z-10 bg-white border rounded-full p-1 shadow hover:bg-gray-100 ${images.length < 6 ? "hidden" : ""}`}
                    onClick={() => scrollThumbnails("right")}
                >
                    <RightOutlined />
                </button>
            </div>
        </div>
    );
}