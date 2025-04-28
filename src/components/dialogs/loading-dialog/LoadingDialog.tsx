import { FC } from "react"
import "./LoadingDialog.css"

interface ILoadingDialogProps {
    isOpen: boolean;
}

export const LoadingDialog: FC<ILoadingDialogProps> = ({
    isOpen
}) => {
    return(
        <dialog open={isOpen} id="loading-modal" className="modal" autoFocus>
            <h2>Loading...</h2> 
            <p>Please wait while we process your request</p>
        </dialog>
    )
}
