import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

export const useImage = () => {
    const uploadImage = async (file: File): Promise<string> => {
        const imageRef = ref(storage, `images/${Date.now()}-${file.name}`);
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
    };

    const uploadMultipleImages = async (files: File[]) => {
        const urls: string[] = [];
        for (const file of files) {
            const url = await uploadImage(file);
            urls.push(url);
        }
        return urls;
    };

    const deleteImageByUrl = async (url: string): Promise<void> => {
        try {
            // Giải mã URL để lấy đường dẫn gốc
            const decodedUrl = decodeURIComponent(url);
            const match = decodedUrl.match(/\/o\/(.*?)\?/);
            if (!match || !match[1]) {
                throw new Error("Không thể phân tích đường dẫn từ URL.");
            }
            const filePath = match[1]; // Ví dụ: images/abc.png
            const imageRef = ref(storage, filePath);
            await deleteObject(imageRef);
            console.log("Ảnh đã được xoá thành công.");
        } catch (error) {
            console.error("Lỗi khi xoá ảnh:", error);
        }
    };

    return { uploadImage, uploadMultipleImages, deleteImageByUrl };
};
