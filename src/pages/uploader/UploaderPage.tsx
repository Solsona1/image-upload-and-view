import { useState } from "react";
import { Thumbnail } from "../../components/thumbnail/Thumbnail"
import "./UploaderPage.css"
import { SupabaseBucketManager } from "../../supabase/SupabaseBucketManager";
import { ConfirmDialog } from "../../components/dialogs/confirm-dialog/ConfirmDialog";
import { LoadingDialog } from "../../components/dialogs/loading-dialog/LoadingDialog";
import { SuccessErrorDialog } from "../../components/dialogs/success-error-dialog/SuccessErrorDialog";
import { LoadedImage } from "../../types/Image";
import { useNavigate } from "react-router";
import { compressImage } from "../../utils/ImageCompression";

export const UploaderPage = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState<LoadedImage[]>([]);
    
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        Promise.all(files.map(async (file, index) => {
            const url = URL.createObjectURL(file);
            const compressedFile = await compressImage(file);
            return {
                id: index.toString(),
                url: url,
                file: compressedFile
            }
        })).then(newImages => {
            setImages([...images, ...newImages]);
        });
    };

    const handleUpload = async () => {
        setIsDialogOpen(false);
        setUploading(true);
        const supabaseManager = new SupabaseBucketManager();
        try {
            await supabaseManager.uploadFiles(images.map(img => img.file));
            setImages([]);
            setIsSuccess(true);
            navigate("/");
        } catch (error) {
            setIsError(true);
        }
        setUploading(false);
    };

    const handleDelete = (id: string) => {
        setImages(images.filter(img => img.id !== id));
    };

    return (
        <div id="uploader-page">
            <div className="images-container" inert={isDialogOpen}>
                    <label htmlFor="add-photos" id="add-photos-label" className="thumbnail">
                        <input type="file" id="add-photos" multiple accept="image/jpeg, image/png" onChange={handleFileChange}/>
                        <svg>
                            <line x1="50%" y1="0" x2="50%" y2="100%"/>
                            <line x1="0" y1="50%" x2="100%" y2="50%"/>
                        </svg>
                        <span>Click here to select new photos</span>
                    </label>
                { images.length ?
                    images.map((image) => 
                        <Thumbnail 
                            key={image.id} 
                            image={image} 
                            withDeleteBtn={true}
                            onDelete={handleDelete}
                        />
                    )
                    : null
                }
            </div>
            <div className="upload-btn" inert={isDialogOpen}>
                <button
                    type="button"
                    onClick={() => setIsDialogOpen(true)}
                    disabled={images.length === 0}
                    className="addHoverEffect"
                >
                    Upload
                </button>
            </div>

            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleUpload}
                title="Confirm Upload" 
                message="Are you sure you want to upload these photos?"
            />
            
            <LoadingDialog
                isOpen={uploading}
            />
            
            <SuccessErrorDialog 
                isOpen={isError} 
                onClose={() => setIsError(false)} 
                title="An error occurred" 
                message="An error occurred while uploading your photos. Please try again" 
                type="error"
            /> 

            <SuccessErrorDialog 
                isOpen={isSuccess}    
                onClose={() => setIsSuccess(false)} 
                title="Upload successful!" 
                message="Your photos have been uploaded successfully" 
                type="success" 
            />
        </div>
    )
}