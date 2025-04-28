import supabase from "./SupabaseClient";

export class SupabaseAuthentication {
    async signUpNewUser(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password
        })
        if (error) {
            throw error;
        }
        return data;
    }

    async signInUser(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) {
            throw error;
        }
        return data;
    }

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
    }
}
