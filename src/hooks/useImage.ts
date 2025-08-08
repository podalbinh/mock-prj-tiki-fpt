import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

    return { uploadImage, uploadMultipleImages };
};
