import { useQuery } from "@tanstack/react-query";
import { useMovimientoStore } from "../store/MovimientoStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import {useUsuariosStore} from "../store/UsuariosStore"
import { BloqueoPagina } from "../components/moleculas/BloquePagina";
import { MovimientosTemplate } from "../components/templates/MovimientosTemplate";

export function Movimientos() {
  const {datapermisos} = useUsuariosStore();
  const statePermisos = datapermisos.some((objeto)=>objeto.modulos.nombre.includes("Productos"))
  const { listarMovimientos, buscarMovimiento, buscador } = useMovimientoStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar movimiento"],
    queryFn: listarMovimientos,
  });

  const {
    data: resultadosBusqueda,
  } = useQuery({
    queryKey: ["buscar movimiento", buscador],
    queryFn: () => buscarMovimiento({ nombre: buscador }),
    enabled: buscador.length > 0,
  });

  if(statePermisos==false){
    return <BloqueoPagina/>;
  }

  if (isLoading) return <SpinnerLoader />;
  if (error) return <span>Error cargando movimientos</span>;

  const movimientosAMostrar =
    buscador.length > 0 ? resultadosBusqueda : data;

  return <MovimientosTemplate data={movimientosAMostrar} />;
}
