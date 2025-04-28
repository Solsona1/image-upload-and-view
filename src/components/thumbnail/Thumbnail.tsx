import { LoadedImage , Image} from "../../types/Image"
import "./Thumbnail.css"
import { FC } from "react"

interface IPropsThumbnail {
    image: LoadedImage | Image,
    withDeleteBtn: boolean,
    onDelete: (id: string) => void
}

export const Thumbnail: FC<IPropsThumbnail> = ({
    image,
    withDeleteBtn,
    onDelete
}) => {
    const handleDelete = () => {
        onDelete(image.id); 
    }

    return(
        <div className="thumbnail">
            <img src={image.url} alt={`Image of `} />
            {
                withDeleteBtn && <button type="button" onClick={handleDelete} className="delete-btn">x</button>
            }
        </div>
    )
}