import { FC } from "react"
import "./ConfirmDialog.css"

interface IConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export const ConfirmDialog: FC<IConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message
}) => {
    return(
        <dialog open={isOpen} className="modal confirm-dialog" autoFocus>
            <h2>{title}</h2>
            <p>{message}</p>
            <div className="confirm-dialog-buttons">
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </dialog>
    )
}