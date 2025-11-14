import { supabase } from "./supabase.config";

export async function InsertarCategoria(p) {
  const { data, error } = await supabase
    .from("categoria")
    .insert([
      {
        nombre: p.nombre,
        descripcion: p.descripcion,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export const MostrarCategorias = async () => {
  const { data, error } = await supabase
    .from("categoria")
    .select(`
      id,
      nombre,
      descripcion
    `)
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
  
};

export async function ActualizarCategoria(id, p) {
  const { data, error } = await supabase
    .from("categoria")
    .update({
      nombre: p.nombre,
      descripcion: p.descripcion,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}


export const EliminarCategoria = async (id) => {
  const { error } = await supabase.from("categoria").delete().eq("id", id);
  if (error) throw error;
  return true;
};

export const ObtenerCategoria = async (id) => {
  const { data, error } = await supabase
    .from("categoria")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export async function BuscarCategoria(p) {
  const { data, error } = await supabase
    .from("categoria")
    .select("*")
    .ilike("nombre", `%${p.nombre}%`);

  if (error) throw error;
  return data;
}