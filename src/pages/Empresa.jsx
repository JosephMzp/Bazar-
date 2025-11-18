import { ConfiguracionTemplate } from "../components/templates/ConfiguracionTemplate";
import {useUsuariosStore} from "../store/UsuariosStore"
import { BloqueoPagina } from "../components/moleculas/BloquePagina";

export function Empresa(){
    const {datapermisos} = useUsuariosStore();
      const statePermisos = datapermisos.some((objeto)=>objeto.modulos.nombre.includes("Tu empresa"))
      if(statePermisos==false){
        return<BloqueoPagina state={statePermisos}/>
      }
    return(<ConfiguracionTemplate/>)
}