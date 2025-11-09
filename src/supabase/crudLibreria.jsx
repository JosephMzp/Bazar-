import { ObtenerIdAuthSupabase } from "./GlobalSupabase";
import { supabase } from "./supabase.config";

export const MostrarEmpresa = async (p) => {

  const { error, data } = await supabase
    .from("empresa")
    .select()
    .eq("iduseradmin", p.idusuario)
    .maybeSingle();
  if (data) {
    return data;
  }
};