import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { Device } from "../../../styles/breackpoints";
import { InputText } from "./InputText";
import { Btnsave } from "../../moleculas/Btnsave";
import { useForm } from "react-hook-form";
import { Selector } from "../Selector";
import { ContainerSelector } from "../../atomos/ContainerSelector";
import { ListaGenerica } from "../ListaGenerica";
import { TipoDocData, TipouserData } from "../../../utils/dataEstatica";
import { ListaModulos } from "../ListaModulos";
import { useUsuariosStore } from "../../../store/UsuariosStore";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function RegistrarUsuarios({ onClose, dataSelect, accion }) {
  const [checkboxs, setCheckboxs] = useState([]);
  const [tipodoc, setTipoDoc] = useState({ icono: "", descripcion: "dni" });
  const [tipouser, setTipoUser] = useState({
    icono: "",
    descripcion: "empleado",
  });
  const [stateTipoDoc, setStateTipoDoc] = useState(false);
  const [stateTipoUser, setStateTipoUser] = useState(false);
  const { insertarUsuarios, actualizarUsuarios, mostrarPermisos } = useUsuariosStore();
  const queryClient = useQueryClient();


  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

useEffect(() => {
  if (accion === "Editar" && dataSelect) {
    const idUser = dataSelect.id_usuario || dataSelect.id;
    console.log("👉 ID QUE SE ENVIARÁ A mostrarPermisos:", idUser);
    mostrarPermisos(idUser);
  }
}, [accion, dataSelect]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  async function onSubmit(data) {
    try {
      if (accion === "Editar") {
        const p = {
          id:dataSelect.id,
          nombres: data.nombres,
          correo: data.correo,
          rol: tipouser.descripcion,
          estado: "activo",
          nrodocumento: data.nrodocumento,
          telefono: data.telefono,
          direccion: data.direccion,
          tipodoc: tipodoc.descripcion
        };
        await actualizarUsuarios(p, checkboxs);
        queryClient.invalidateQueries(["listar-usuarios"]);
        onClose();
      } else {
        const p = {
          nombres: data.nombres,
          correo: data.correo,
          rol: tipouser.descripcion,
          estado: "activo",
          nrodocumento: data.nrodocumento,
          telefono: data.telefono,
          direccion: data.direccion,
          tipodoc: tipodoc.descripcion
        };
        const parametrosAuth={
          correo:data.correo,
          pass:data.pass
        }
        await insertarUsuarios(parametrosAuth,p, checkboxs);
        queryClient.invalidateQueries(["listar-usuarios"]);
      }
      onClose();
    } catch (error) {
      console.error("❌ Error al insertar o actualizar usuario:", error);
    }
  }

  useEffect(()=>{
    if(accion==="Editar"){
      setTipoDoc({icono:"",descripcion:dataSelect.tipodoc})
      setTipoUser({icono:"", descripcion:dataSelect.rol})
    }
  },[])


  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion === "Editar"
                ? "Editar usuario"
                : "Registrar nuevo usuario"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
          <section className="seccion1">
            {/* Nombres */}
            <InputText icono={<v.icononombre />}>
              <input
                className="form__field"
                defaultValue={dataSelect.nombres}
                type="text"
                placeholder=""
                {...register("nombres", { required: true })}
              />
              <label className="form__label">Nombres del usuario</label>
              {errors.nombres && <p>Campo requerido</p>}
            </InputText>

            {/* correo */}
            {
              accion!="Editar"?(<InputText icono={<v.iconodescripcion />}>
              <input 
                className={accion==="Editar"?"form__field disabled":"form__field"}
                defaultValue={dataSelect.correo}
                type="text"
                placeholder=""
                {...register("correo", { required: true })}
              />
              <label className="form__label">Correo</label>
              {errors.correo?.type==="required" &&<p>Campo requerido</p>}
            </InputText>):(<span className="form__field disabled">{dataSelect.correo}</span>)
            }
            
            {/* Password */}
            {
              accion!="Editar"?(
                <InputText icono={<v.iconodescripcion />}>
              <input
                className="form__field"
                defaultValue={dataSelect.pass}
                type="text"
                placeholder=""
                {...register("pass", { required: true, minLength:6 })}
              />
              <label className="form__label">Contraseña</label>
              {errors.pass?.type==="required" && <p>Campo requerido</p>}
              {errors.pass?.type==="minLength" && <p>Debe tener al menos 6 caracteres</p>}
            </InputText>
              ):(null)
            }
            
            {/* Tipo doc */}
            <ContainerSelector>
              <label>Tipo Doc: </label>
              <Selector
                color="##53B257"
                texto1="📃"
                texto2={tipodoc.descripcion}
                funcion={() => setStateTipoDoc(!stateTipoDoc)}
              />
              {stateTipoDoc && (
                <ListaGenerica
                  data={TipoDocData}
                  bottom="-260px"
                  scroll="scroll"
                  setState={() => setStateTipoDoc(!stateTipoDoc)}
                  funcion={(p) => setTipoDoc(p)}
                />
              )}
            </ContainerSelector>

            {/* Num documento */}
            <InputText icono={<v.iconostock />}>
              <input
                className="form__field"
                defaultValue={dataSelect.nrodocumento}
                type="number"
                placeholder=""
                {...register("nrodocumento", { required: true, min: 0 })}
              />
              <label className="form__label">Nro. Documento</label>
              {errors.nrodocumento && <p>Campo requerido</p>}
            </InputText>

            {/* Telefono */}
            <InputText icono={<v.iconostock />}>
              <input
                className="form__field"
                defaultValue={dataSelect.telefono}
                type="number"
                placeholder=""
                {...register("telefono", { required: true, min: 0 })}
              />
              <label className="form__label">Nro. Telefono</label>
              {errors.telefono && <p>Campo requerido</p>}
            </InputText>

            {/* Direccion */}
            <InputText icono={<v.iconodescripcion />}>
              <input
                className="form__field"
                defaultValue={dataSelect.direccion}
                type="text"
                placeholder=""
                {...register("direccion", { required: true })}
              />
              <label className="form__label">Dirección</label>
              {errors.direccion && <p>Campo requerido</p>}
            </InputText>
            {/* Tipo usuario */}
            <ContainerSelector>
              <label>Tipo de Usuario: </label>
              <Selector
                color="##53B257"
                texto1="👷"
                texto2={tipouser.descripcion}
                funcion={() => setStateTipoUser(!stateTipoUser)}
              />
              {stateTipoUser && (
                <ListaGenerica
                  data={TipouserData}
                  bottom="-260px"
                  scroll="scroll"
                  setState={() => setStateTipoUser(!stateTipoUser)}
                  funcion={(p) => setTipoUser(p)}
                />
              )}
            </ContainerSelector>
          </section>

          <section className="seccion2">
            
            Permisos:
            <ListaModulos
              accion={accion}
              checkboxs={checkboxs}
              setCheckboxs={setCheckboxs}
            />
            
          </section>
          <div className="btnguardarContent">
            <Btnsave
              icono={<v.iconoguardar />}
              titulo="Guardar"
              bgcolor="#53B257"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
  .form__field {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 17px;
    color: ${(props)=>props.theme.text};
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    &.disabled{
      color: #696969;
      background: #2d2d2d;
      border-radius:8px;
      margin-top:8px;
      border-bottom: 1px dashed #656565;

    }
  }
  select.form__field {
    background-color: ${({ theme }) => theme.bgtotal || "#fff"};
    color: ${({ theme }) => theme.text || "#000"};
    padding: 10px;
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.border || "#53B257"};
    box-shadow: 4px 9px 20px -12px ${({ theme }) => theme.border || "#53B257"};
    cursor: pointer;
  }
    

  select.form__field option {
    background-color: ${({ theme }) => theme.bgtotal || "#fff"};
    color: ${({ theme }) => theme.text || "#000"};
  }

  .sub-contenedor {
    width: 100%;
    max-width: 90%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    max-height: 90vh; /* 👈 limita altura del modal */
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
    width: 6px;
    border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
    background-color: #484848
    border-radius: 10px;
    }

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;

  @media ${Device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  section {
    gap: 20px;
    display: flex;
    flex-direction: column;
  }

  .btnguardarContent {
    display: flex;
    justify-content: end;
    grid-column: 1 / -1; /* Ocupa toda la fila */

    @media ${Device.tablet} {
      grid-column: 2; /* Botón alineado en la 2da columna */
    }
  }
}

  }
`;
