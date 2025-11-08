import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

export const useAuthStore=create((set, get) => ({
    signInWithEmail: async(p)=> {
        const {data, error} = await supabase.auth.signInWithEmail({
            email: p.correo,
            password: p.pass
        })
        if(error){
            return null;
        }
    },
    signOut: async()=>{
        const {error} = await supabase.auth.signOut()
        if(error)
            throw new Error("Ocurrio un error"+ error)
    }
}))