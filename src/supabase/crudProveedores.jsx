import { supabase } from "./supabase.config";

export async function InsertarProveedor(p) {
  const { data, error } = await supabase
    .from("proveedor")
    .insert([
      {
        nombre: p.nombre,
        ruc: p.ruc,
        telefono: p.telefono,
        correo: p.correo,
        direccion: p.direccion,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export const MostrarProveedor = async () => {
  const { data, error } = await supabase
    .from("proveedor")
    .select(`
      id,
      nombre,
      ruc,
      telefono,
      correo,
      direccion
    `)
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
};

export async function ActualizarProveedor(id, p) {
  const { data, error } = await supabase
    .from("proveedor")
    .update({
      nombre: p.nombre,
      ruc: p.ruc,
      telefono: p.telefono,
      correo: p.correo,
      direccion: p.direccion,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export const EliminarProveedor = async (id) => {
  const { error } = await supabase.from("proveedor").delete().eq("id", id);
  if (error) throw error;
  return true;
};

export const ObtenerProveedor = async (id) => {
  const { data, error } = await supabase
    .from("proveedor")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export async function BuscarProveedor(p) {
  const { data, error } = await supabase
    .from("proveedor")
    .select("*")
    .ilike("nombre", `%${p.nombre}%`);

  if (error) throw error;
  return data;
}
