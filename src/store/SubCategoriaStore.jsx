import { create } from "zustand";
import {
  InsertarSubCategoria,
  MostrarSubCategoria,
  ActualizarSubCategoria,
  EliminarSubCategoria,
  ObtenerSubCategoria,
  BuscarSubCategoria,
} from "../supabase/crudSubCategoria";

export const useSubCategoriaStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => set({ buscador: p }),

  subs: [],
  subActual: null,

  listarSubCategoria: async (idCategoria) => {
    const data = await MostrarSubCategoria(idCategoria);
    console.log("SubCategorias store:", data); 
    set({ subs: data });
    return data;
  },

  selectSubCategoria: (p) => set({ subActual: p }),

  insertarSubCategoria: async (p) => {
    const data = await InsertarSubCategoria(p);
    set((state) => ({ subs: [data, ...state.subs] }));
    return data;
  },

  actualizarSubCategoria: async (id, p) => {
    const data = await ActualizarSubCategoria(id, p);
    set((state) => ({
      subs: state.subs.map((sub) =>
        sub.id === id ? data : sub
      ),
    }));
    return data;
  },

  eliminarSubCategoria: async (id) => {
    console.log("Eliminando id:", id);
    await EliminarSubCategoria(id);
    set((state) => ({
      subs: state.subs.filter((p) => p.id !== id),
    }));
  },

  buscarSubCategoria: async (p) => {
    const response = await BuscarSubCategoria(p);
    set({ subs: response });
    return response;
  },
}));