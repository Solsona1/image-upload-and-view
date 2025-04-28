import { Image } from "../types/Image";
import supabase from "./SupabaseClient";

const bucketName = import.meta.env.VITE_SUPABASE_BUCKET;

export class SupabaseBucketManager {

    async uploadFile(file: File) {
        if (!bucketName) {
            throw new Error("Bucket name is not defined");
        }

        const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`public/${file.name}`, file);

        if(error) {
            console.error(error);
            throw error;
        } else {
            return data;
        }
    }

    async uploadFiles(files: File[]) {
        const responses = [];
        for (const file of files) {
            try {
                const response = await this.uploadFile(file);
                responses.push(response);
            } catch (error) {
                throw error;
            }
        }
        return responses;
    }

    async getImages(): Promise<Image[]> {
        const { data: files, error: error1 } = await supabase.storage
        .from(bucketName)
        .list('public');

        if(error1) {
            throw error1;
        }
        
        const { data, error } = await supabase.storage
        .from(bucketName)
        .createSignedUrls(files.map(file => `public/${file.name}`), 604800);

        if(error) {
            throw error;
        } else {
            const images = files.map((file, index) => {
                return {
                    id: file.id,
                    name: file.name,
                    url: data[index].signedUrl,
                }
            });
            return images;
        }
    }
}