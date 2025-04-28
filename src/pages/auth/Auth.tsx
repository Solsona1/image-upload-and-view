import { SupabaseAuthentication } from "../../supabase/SupabaseAuthentication";
import "./Auth.css";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";
import { LoadingDialog } from "../../components/dialogs/loading-dialog/LoadingDialog";

export const AuthPage = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [hasAccount, setHasAccount] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: (values: { email: string; password: string; }) => {
            const errors: { email?: string; password?: string } = {};
            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Password is required";
            }
            if (!hasAccount) {
                if (values.password.length < 8) {
                    errors.password = "Password must be at least 8 characters long";
                } else if (values.password.length > 64) {
                    errors.password = "Password must be less than 64 characters long";
                } else if (!/[A-Z]/.test(values.password)) {
                    errors.password = "Password must contain at least one uppercase letter";
                } else if (!/[0-9]/.test(values.password)) {
                    errors.password = "Password must contain at least one number";
                } else if (!/[!@#$%^&*]/.test(values.password)) {
                    errors.password = "Password must contain at least one special character";
                }
            }
            return errors;
        },
        onSubmit: async (values: { email: string; password: string; }) => {
            setIsSubmitting(true);
            const supabaseAuthentication = new SupabaseAuthentication();
            if (hasAccount) {
                try {
                    const { user } = await supabaseAuthentication.signInUser(values.email, values.password);
                    if (user) {
                        setUser(user);
                    }
                } catch (error: any) {
                    setError("Error: Invalid email or password");
                    setIsSubmitting(false);
                    return;
                }
            } else {
                try {
                    const { user } = await supabaseAuthentication.signUpNewUser(values.email, values.password);
                    if (user) {
                        setUser(user);
                    }
                } catch (error: any) {
                    setError("Error: " + error.message);
                    setIsSubmitting(false);
                    return;
                }
            }
            setIsSubmitting(false);
            navigate("/gallery");
        },
    });
    
    return (
        <div id="auth-page">
            <h1>
                {hasAccount ? "Log In" : "Sign Up"}
            </h1>message
            <form onSubmit={formik.handleSubmit} inert={isSubmitting}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    {...formik.getFieldProps("email")} 
                />
                { formik.touched.email && formik.errors.email && 
                    <p className="error-message">{formik.errors.email}</p>
                }
                <input 
                    type="password" 
                    placeholder="Password" 
                    {...formik.getFieldProps("password")} 
                />
                { formik.touched.password && formik.errors.password && 
                    <p className="error-message">{formik.errors.password}</p>
                }
                <button type="submit" disabled={isSubmitting}>
                    {hasAccount ? "Log In" : "Sign Up"}
                </button>
            </form>
            <div>
                {hasAccount ? 
                    "Don't have an account? You can sign up " 
                    : "Already have an account? You can log in "}
                <button 
                    className="link-button"
                    onClick={() => setHasAccount(hasAccount => !hasAccount)}
                    disabled={isSubmitting}
                >
                    here.
                </button>
                {error && <p className="error-message">{error}</p>}
            </div>
            <LoadingDialog
                isOpen={isSubmitting}
            />
        </div>
    );
}