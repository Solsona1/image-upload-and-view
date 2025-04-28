import { useUser } from "../../context/UserContext";
import { SupabaseAuthentication } from "../../supabase/SupabaseAuthentication";
import "./Header.css"
import { Link } from "react-router"

export const Header = () => {
    const { user, setUser } = useUser();
    
    const handleLogout = () => {
        const supabaseAuthentication = new SupabaseAuthentication();
        supabaseAuthentication.signOut();
        setUser(null);
    }

    return (
        <header>
            <Link to="/"><h1>Photo Gallery</h1></Link>
            {
                user!==null ? (
                    <button
                        id="logout-btn"
                        type="button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : null
            }
        </header>
    )
}
