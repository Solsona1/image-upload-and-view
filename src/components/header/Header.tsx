import "./Header.css"
import { Link } from "react-router"

export const Header = () => {
    return (
        <header>
            <Link to="/"><h1>Photo Gallery</h1></Link>
        </header>
    )
}
