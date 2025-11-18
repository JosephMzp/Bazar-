import { useQuery } from "@tanstack/react-query";
import { useUsuariosStore } from "../store/UsuariosStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { UsuariosTemplate } from "../components/templates/UsuariosTemplate";

export function Usuarios() {
  const {
    mostrarModulos,
    mostrarUsuariosTodos,
    buscarUsuarios,
    buscador,
    personals,
  } = useUsuariosStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["listar-usuarios"],
    queryFn: mostrarUsuariosTodos,
    retry: false,   
  refetchOnWindowFocus: false,
  });

  const { data: resultadosBusqueda, isFetching: buscando } = useQuery({
    queryKey: ["buscar usuario", buscador],
    queryFn: () => buscarUsuarios({ nombres: buscador }),
    enabled: buscador.length > 0,
  });

  const { data: datamodulos } = useQuery({
    queryKey: ["mostrar modulos"],
    queryFn: mostrarModulos,
  });
  if (isLoading) return <SpinnerLoader />;
  if (error) return <span>Error cargando usuarios</span>;
  console.log("DATA TODOS:",data)

  const usuariosAMostrar = buscador.length > 0 ? resultadosBusqueda : data ;

  return <UsuariosTemplate data={usuariosAMostrar} />;
}
