import { useQuery } from "@tanstack/react-query";
import { ProductosTemplate } from "../components/templates/ProductosTemplate";
import { useProductosStore } from "../store/ProductosStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";

export function Productos() {
  const { listarProductos, productos, buscarProduc, buscador } =
    useProductosStore();

  // 🔹 Cargar todos los productos
  const { data,isLoading, error } = useQuery({
    queryKey: ["mostrar productos"],
    queryFn: listarProductos,
  });

  // 🔹 Buscar productos (solo si hay texto)
  useQuery({
    queryKey: ["buscar producto", buscador],
    queryFn: () => buscarProduc({ nombre: buscador }),
    enabled: buscador.length > 0,
  });

  if (isLoading) return <SpinnerLoader />;
  if (error) return <span>Error cargando productos</span>;

  return <ProductosTemplate data={data ?? productos} />;
}
