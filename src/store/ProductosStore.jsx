import { create } from "zustand";
import {
  InsertarProducto,
  MostrarProductos,
  ActualizarProducto,
  EliminarProducto,
  ObtenerProducto,
  BuscarProducto,
} from "../supabase/crudProductos";

export const useProductosStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => set({ buscador: p }),

  productos: [],
  productoActual: [],

  listarProductos: async () => {
    const data = await MostrarProductos();
    console.log("Productos store:", data); 
    set({ productos: data });
    return data;
  },

  selectProducto: (p) => set({ productoActual: p }),

  insertarProducto: async (p) => {
  const data = await InsertarProducto(p);

  // 🚀 Recargar lista completa ya con todas las relaciones
  const { listarProductos } = get();
  await listarProductos();

  return data;
},

  actualizarProducto: async (id, p) => {
    const data = await ActualizarProducto(id, p);
    set((state) => ({
      productos: state.productos.map((prod) =>
        prod.id === id ? data : prod
      ),
    }));
    return data;
  },

  eliminarProducto: async (id) => {
    console.log("Eliminando id:", id);
    await EliminarProducto(id);
    set((state) => ({
      productos: state.productos.filter((p) => p.id !== id),
    }));
  },

  buscarProduc: async (p) => {
  const response = await BuscarProducto(p);
  return response; 
},
}));