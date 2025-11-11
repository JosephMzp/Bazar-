import { supabase } from "./supabase.config";

// 🔹 Crear producto
export async function InsertarProducto(p) {
  const { data, error } = await supabase
    .from("productos")
    .insert([
      {
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio_unitario: p.precio_unitario,
        stock_actual: p.stock_actual,
        stock_minimo: p.stock_minimo,
        id_categoria: p.id_categoria,
        id_proveedor: p.id_proveedor,
        estado: p.estado ?? true,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 🔹 Mostrar todos los productos
export const MostrarProductos = async () => {
  const { data, error } = await supabase
    .from("productos")
    .select(`
      id,
      nombre,
      precio_unitario,
      stock_actual,
      stock_minimo,
      id_categoria,
      categoria(nombre)
    `)
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
  
};

// 🔹 Actualizar producto
export async function ActualizarProducto(id, p) {
  const { data, error } = await supabase
    .from("productos")
    .update({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio_unitario: p.precio_unitario,
      stock_actual: p.stock_actual,
      stock_minimo: p.stock_minimo,
      id_categoria: p.id_categoria,
      id_proveedor: p.id_proveedor,
      estado: p.estado,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 🔹 Eliminar producto
export const EliminarProducto = async (id) => {
  const { error } = await supabase.from("productos").delete().eq("id", id);
  if (error) throw error;
  return true;
};

// 🔹 Obtener un producto por id
export const ObtenerProducto = async (id) => {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// 🔹 Buscar producto por nombre
export async function BuscarProducto(p) {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .ilike("nombre", `%${p.nombre}%`);

  if (error) throw error;
  return data;
}