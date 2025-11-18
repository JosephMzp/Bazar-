import { ObtenerIdAuthSupabase } from "./GlobalSupabase";
import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export const InsertarUsuarios = async (p) => {
  const { data, error } = await supabase
    .from("usuarios")
    .insert({
      ...p,
      idempresa: 8, // 👈 Asigna aquí el ID fijo de la empresa
    })
    .select()
    .maybeSingle();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al insertar usuario" + error.message,
    });
  }
  if (data) return data;
};

export const MostrarUsuarios = async () => {
  const idAuthSupabase = await ObtenerIdAuthSupabase();
  const { error, data } = await supabase
    .from("usuarios")
    .select()
    .eq("idauth", idAuthSupabase)
    .maybeSingle();
  if (error) return null;
  return data;
};

export const MostrarUsuariosTodos = async () => {
  const { error, data } = await supabase
    .from("usuarios")
    .select( `*`)
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
};

export async function ActualizarUsuarios(id, p) {
  const { data } = await supabase
    .from("usuarios")
    .update(p)
    .eq("id", id)
    .select("*")
    .single();

  return data;
}

// 🔹 Eliminar Usuarios
export const EliminarUsuarios = async (id) => {
  const { error } = await supabase.from("usuarios").delete().eq("id", id);
  if (error) throw error;
  return true;
};

// 🔹 Obtener un Usuarios por id
export const ObtenerUsuarios = async (id) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// 🔹 Buscar Usuarios por nombre
export async function BuscarUsuarios(p) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .ilike("nombres", `%${p.nombres}%`)
    .eq("idempresa", 8);

  if (error) throw error;
  return data;
}

export async function InsertarPermisos(p) {
  const { error } = await supabase.from("permisos").insert(p);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al insertar permisos" + error.message,
      footer: '<a href=""><error<a/>',
    });
  }
}

export async function MostrarPermisos(p) {
  console.log("MOSTRAR PERMISOS RECIBE:", p, typeof p);
  const { data } = await supabase
    .from("permisos")
    .select(
      `
      id,
      id_usuario,
      idmodulo,
      modulos(nombre)
    `
    )
    .eq("id_usuario", p);
    
  return data;
}

export async function EliminarPermisos(id_usuario) {
  const { error } = await supabase
    .from("permisos")
    .delete()
    .eq("id_usuario", id_usuario);

  if (error) console.error(error);
}

export async function MostrarModulos() {
  const { data } = await supabase.from("modulos").select();
  return data;
}
