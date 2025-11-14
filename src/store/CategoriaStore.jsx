import { create } from "zustand";
import {
  InsertarCategoria,
  MostrarCategorias,
  ActualizarCategoria,
  EliminarCategoria,
  ObtenerCategoria,
  BuscarCategoria,
} from "../supabase/crudCategorias";

export const useCategoriaStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => set({ buscador: p }),

  categorias: [],
  categoriaActual: null,

  listarCategoria: async () => {
    const data = await MostrarCategorias();
    console.log("Categorias store:", data); 
    set({ categorias: data });
    return data;
  },

  selectCategoria: (p) => set({ categoriaActual: p }),

  insertarCategoria: async (p) => {
    const data = await InsertarCategoria(p);
    set((state) => ({ categorias: [data, ...state.categorias] }));
    return data;
  },

  actualizarCategoria: async (id, p) => {
    const data = await ActualizarCategoria(id, p);
    set((state) => ({
      categorias: state.categorias.map((cat) =>
        cat.id === id ? data : cat
      ),
    }));
    return data;
  },

  eliminarCategoria: async (id) => {
    console.log("Eliminando id:", id);
    await EliminarCategoria(id);
    set((state) => ({
      categorias: state.categorias.filter((p) => p.id !== id),
    }));
  },

  buscarCategoria: async (p) => {
    const response = await BuscarCategoria(p);
    set({ categorias: response });
    return response;
  },
}));