import imageCompression from "browser-image-compression";

export const compressImage = async (image: File): Promise<File> => {
    const compressionOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    }

    try {
        const compressedImage = await imageCompression(image, compressionOptions);
        return compressedImage;
    } catch (error) {
        console.error(error);
        throw error;
    }
}