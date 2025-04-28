import { FC } from "react"
import "./SuccessErrorDialog.css"

interface ISuccessErrorDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type: "success" | "error";  
}

export const SuccessErrorDialog: FC<ISuccessErrorDialogProps> = ({
    isOpen,
    onClose,
    title,
    message,
    type
}) => {
    return(
        <dialog open={isOpen} className={`modal ${type}-modal`} autoFocus>
            <h2>{title}</h2>
            <p>{message}</p>
            <button onClick={onClose}>OK</button>
        </dialog>
    )
}