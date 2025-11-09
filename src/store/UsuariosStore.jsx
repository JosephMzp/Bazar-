import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import { InsertarUsuarios, MostrarUsuarios } from "../supabase/crudUsuarios";

export const useUsuariosStore = create((set, get) => ({
  insertarUsuarioAdmin: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.pass,
    });
    console.log("data del user", data);
    if (error) return;
    const datauser = await InsertarUsuarios({
      idauth: data.user.id,
      rol: "admin",
    });
    return datauser;
  },
  idusuario: 0,
  MostrarUsuarios: async () => {
    const response = await MostrarUsuarios();
    set({ idusuario: response.id });
    return response;
  },
}));
