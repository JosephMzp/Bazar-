import { create } from "zustand";
import {
  InsertarProveedor,
  MostrarProveedor,
  ActualizarProveedor,
  EliminarProveedor,
  ObtenerProveedor,
  BuscarProveedor,
} from "../supabase/crudProveedores";

export const useProveedorStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => set({ buscador: p }),

  proveedores: [],
  proveedorActual: null,

  listarProveedor: async () => {
    const data = await MostrarProveedor();
    console.log("Proveedor store:", data); 
    set({ proveedores: data });
    return data;
  },

  selectProveedor: (p) => set({ proveedorActual: p }),

  insertarProveedor: async (p) => {
    const data = await InsertarProveedor(p);
    set((state) => ({ proveedores: [data, ...state.proveedores] }));
    return data;
  },

  actualizarProveedor: async (id, p) => {
    const data = await ActualizarProveedor(id, p);
    set((state) => ({
      proveedores: state.proveedores.map((prov) =>
        prov.id === id ? data : prov
      ),
    }));
    return data;
  },

  eliminarProveedor: async (id) => {
    console.log("Eliminando id:", id);
    await EliminarProveedor(id);
    set((state) => ({
      proveedores: state.proveedores.filter((p) => p.id !== id),
    }));
  },

  buscarProveedor: async (p) => {
    const response = await BuscarProveedor(p);
    set({ proveedores: response });
    return response;
  },
}));