import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../config/firebaseConfig";

export const useImage = () => {
    const uploadImage = async (file: File): Promise<string> => {
        const imageRef = ref(storage, `images/${Date.now()}-${file.name}`);
        await uploadBytes(imageRef, file);
        return await getDownloadURL(imageRef);
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
        } catch (error) {
            console.error("Lỗi khi xoá ảnh:", error);
        }
    };

    const urlToBase64 = async (url: string) => {
        const res = await fetch(url);
        const blob = await res.blob();
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };


    return { uploadImage, uploadMultipleImages, deleteImageByUrl, urlToBase64 };
};
