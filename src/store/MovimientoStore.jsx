import { create } from "zustand";
import { ActualizarMovimiento, BuscarMovimiento, EliminarMovimiento, InsertarMovimiento, MostrarMovimiento } from "../supabase/crudMovimientos";

export const useMovimientoStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => set({ buscador: p }),

  movimientos: [],
  movimientoActual: null,

  listarMovimientos: async () => {
    const data = await MostrarMovimiento();
    console.log("Movimiento store:", data); 
    set({ movimientos: data });
    return data;
  },

  selectProducto: (p) => set({ movimientoActual: p }),

  insertarMovimiento: async (p) => {
  const data = await InsertarMovimiento(p);

  // 🚀 Recargar lista completa ya con todas las relaciones
  const { listarMovimientos } = get();
  await listarMovimientos();

  return data;
},

  actualizarMovimiento: async (id, p) => {
    const data = await ActualizarMovimiento(id, p);
    set((state) => ({
      movimientos: state.movimientos.map((prod) =>
        prod.id === id ? data : prod
      ),
    }));
    return data;
  },

  eliminarMovimiento: async (id) => {
    console.log("Eliminando id:", id);
    await EliminarMovimiento(id);
    set((state) => ({
      movimientos: state.movimientos.filter((p) => p.id !== id),
    }));
  },

  buscarMovimiento: async (p) => {
    const response = await BuscarMovimiento(p);
    set({ movimientos: response });
    return response;
  },
}));