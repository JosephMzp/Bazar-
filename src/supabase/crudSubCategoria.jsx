import { supabase } from "./supabase.config";

export async function InsertarSubCategoria(p) {
  const { data, error } = await supabase
    .from("sub_categoria")
    .insert([
      {
        nombre: p.nombre,
        id_categoria: p.id_categoria,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export const MostrarSubCategoria = async (idCategoria = null) => {
  let query = supabase
    .from("sub_categoria")
    .select(`
      id,
      nombre,
      id_categoria,
      categoria(nombre)
    `)
    .order("id", { ascending: false });

  // Si viene una categoría, filtrar
  if (idCategoria) {
    query = query.eq("id_categoria", idCategoria);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
};

export async function ActualizarSubCategoria(id, p) {
  const { data, error } = await supabase
    .from("sub_categoria")
    .update({
      nombre: p.nombre,
      id_categoria: p.id_categoria,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export const EliminarSubCategoria = async (id) => {
  const { error } = await supabase.from("sub_categoria").delete().eq("id", id);
  if (error) throw error;
  return true;
};

export const ObtenerSubCategoria = async (id) => {
  const { data, error } = await supabase
    .from("sub_categoria")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export async function BuscarSubCategoria(p) {
  const { data, error } = await supabase
    .from("sub_categoria")
    .select("*")
    .ilike("nombre", `%${p.nombre}%`);

  if (error) throw error;
  return data;
}