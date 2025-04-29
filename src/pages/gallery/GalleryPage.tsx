import "./GalleryPage.css";
import { LoaderFunction, useLoaderData, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Thumbnail } from "../../components/thumbnail/Thumbnail";
import { SupabaseBucketManager } from "../../supabase/SupabaseBucketManager";
import { Image } from "../../types/Image";

export const GalleryPage = () => {
    const navigate = useNavigate();
    const loaderData = useLoaderData();
    const [retrievedImages, setRetrievedImages] = useState<Image[]>([]);

    useEffect(() => {
        setRetrievedImages(loaderData);
    }, []);
    
    return (
        <div id="gallery-page">
            <div id="gallery">
                {
                    retrievedImages.length ?
                        retrievedImages.map((img, index) => 
                            <Thumbnail 
                                key={index} 
                                image={img} 
                                withDeleteBtn={false}
                                onDelete={() => {}}
                            />
                        )
                    : null
                }
            </div>
            <div id="new-upload-btn">
                <button 
                    id="open-uploader-btn" 
                    type="button" 
                    onClick={() => navigate("/uploader")}
                    className="addHoverEffect"
                >
                    Add new photos
                </button>
            </div>
        </div>
    )
}

export const ImagesLoaderFunction: LoaderFunction = () => {
    const supabase = new SupabaseBucketManager();
    try {
        const images = supabase.getImages();
        return images;
    } catch (error) {
        console.error(error);
        return [];
    }
}