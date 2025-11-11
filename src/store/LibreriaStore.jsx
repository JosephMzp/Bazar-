import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import { MostrarEmpresa } from "../supabase/crudLibreria";

export const useLibreriaStore = create((set, get) => ({
    dataempresa:[],
  MostrarEmpresa: async (idusuario) => {
    const response = await MostrarEmpresa({ idusuario });
    set({ dataempresa: response });
    return response;
  },
}));
