import { supabase } from "./supabase.config";

// 🔹 Crear producto
export async function InsertarMovimiento(p) {
  const { data, error } = await supabase
    .from("movimiento")
    .insert([
      {
        fecha: p.fecha,
        tipo: p.tipo,
        id_usuario: p.id_usuario,
        id_producto: p.id_producto,
        cantidad: p.cantidad,
        detalle: p.detalle
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export const MostrarMovimiento = async () => {
  const { data, error } = await supabase
    .from("movimiento")
    .select(`*`)
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
};

// 🔹 Actualizar producto
export async function ActualizarMovimiento(id, p) {
  const { data, error } = await supabase
    .from("movimiento")
    .update({
      fecha: p.fecha,
      tipo: p.tipo,
      id_usuario: p.id_usuario,
      id_producto: p.id_producto,
      cantidad: p.cantidad,
      detalle: p.detalle
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export const EliminarMovimiento = async (id) => {
  const { error } = await supabase.from("movimiento").delete().eq("id", id);
  if (error) throw error;
  return true;
};

export const ObtenerMovimiento = async (id) => {
  const { data, error } = await supabase
    .from("movimiento")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// 🔹 Buscar producto por nombre
export async function BuscarMovimiento(p) {
  const { data, error } = await supabase
    .from("movimiento")
    .select("*")
    .ilike("fecha", `%${p.fecha}%`);

  if (error) throw error;
  return data;
}
