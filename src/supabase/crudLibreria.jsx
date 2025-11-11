import { ObtenerIdAuthSupabase } from "./GlobalSupabase";
import { supabase } from "./supabase.config";

export const MostrarEmpresa = async (p) => {

  const { error, data } = await supabase
    .from("empresa")
    .select()
    .eq("id", 8)
    .maybeSingle();
  if (data) {
    return data;
  }
};