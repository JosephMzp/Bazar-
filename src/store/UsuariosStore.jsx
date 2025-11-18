import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import {
  ActualizarUsuarios,
  BuscarUsuarios,
  EliminarUsuarios,
  InsertarUsuarios,
  MostrarUsuarios,
  MostrarUsuariosTodos,
  InsertarPermisos,
  MostrarPermisos,
  EliminarPermisos,
  MostrarModulos,
} from "../supabase/crudUsuarios";
import {DataModulosConfiguracion} from "../utils/dataEstatica"

export const useUsuariosStore = create((set, get) => ({
  datamodulos: [],
  insertarUsuarioAdmin: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.pass,
    });
    console.log("data del user", data);
    if (error) return;
    const datauser = await InsertarUsuarios({
      idauth: data.user.id,
      rol: "admin",
    });
    return datauser;
  },
  idusuario: 0,
  mostrarUsuarios: async () => {
    const response = await MostrarUsuarios();
    set({ idusuario: response.id });
    return response;
  },
  buscador: "",
  setBuscador: (p) => set({ buscador: p }),

  personals: [],
  personalActual: null,
  parametros: {},

  mostrarUsuariosTodos: async () => {
    const data = await MostrarUsuariosTodos();
    set({ personals: data });
    return data;
  }, 

  selectUsuarios: (p) => set({ personalActual: p }),

  insertarUsuarios: async (parametrosAuth, p, datacheckpermisos) => {
    const { data, error } = await supabase.auth.signUp({
      email: parametrosAuth.correo,
      password: parametrosAuth.pass,
    });
    if (error) {
      return null;
    }
    const dataUsetNew = await InsertarUsuarios({
      nombres: p.nombres,
      correo: p.correo,
      rol: p.rol,
      estado: "activo",
      nrodocumento: p.nrodocumento,
      telefono: p.telefono,
      direccion: p.direccion,
      idauth: data.user.id,
      tipodoc: p.tipodoc,
      fecharegistro: new Date(),
    });

    datacheckpermisos.forEach(async (item) => {
      if (item.check) {
        let parametrospermisos = {
          id_usuario: dataUsetNew.id,
          idmodulo: item.id,
        };
        await InsertarPermisos(parametrospermisos);
      }
    });

    await supabase.auth.signOut();
    return data.user;
  },

  actualizarUsuarios: async (p, datacheckpermisos) => {
  const data = await ActualizarUsuarios(p.id, p);
  await EliminarPermisos(p.id);

  for (const item of datacheckpermisos) {
    if (item.check) {
      await InsertarPermisos({
        id_usuario: p.id,
        idmodulo: item.id,
      });
    }
  }

  return data;
},

  eliminarUsuarios: async (id) => {
    console.log("Eliminando id:", id);
    await EliminarUsuarios(id);
    set((state) => ({
      personals: state.personals.filter((p) => p.id !== id),
    }));
  },

  buscarUsuarios: async (p) => {
    const response = await BuscarUsuarios(p);
    set({ personals: response });
    return response;
  },

  mostrarModulos: async () => {
    const response = await MostrarModulos();
    set({ datamodulos: response });
    return response;
  },

  datapermisos: [],
  datapermisosEdit: [],

  mostrarPermisos: async (id_usuario) => {
  const response = await MostrarPermisos(id_usuario);
  set({ datapermisos: response });
  let allDocs=[];
  DataModulosConfiguracion.map((element)=>{
    const statePermiso = response.some((objeto)=>
    objeto.modulos.nombre.includes(element.title));
    if(statePermiso){
      allDocs.push({...element,state:true})
    }else{
      allDocs.push({...element,state:false})
    }
  });
  DataModulosConfiguracion.splice(0,DataModulosConfiguracion.length)
  DataModulosConfiguracion.push(...allDocs)

  return response;
},
mostrarPermisosEdit: async (id_usuario) => {
  const response = await MostrarPermisos(id_usuario);
  set({ datapermisosEdit: response });
  return response;
},
}));
