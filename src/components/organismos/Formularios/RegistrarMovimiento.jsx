import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { Device } from "../../../styles/breackpoints";
import { InputText } from "./InputText";
import { Btnsave } from "../../moleculas/Btnsave";
import { useProductosStore } from "../../../store/ProductosStore";
import { useForm } from "react-hook-form";
import { useProveedorStore } from "../../../store/ProveedorStore";
import { Buscador } from "../Buscador";
import { useQuery } from "@tanstack/react-query";
import { ListaProducts } from "../ListaProducts";
import { CardProductoSelect } from "../../moleculas/CardProductoSelect";
import { useMovimientoStore } from "../../../store/MovimientoStore";
import { useUsuariosStore } from "../../../store/UsuariosStore";
import Swal from "sweetalert2";

export function RegistrarMovimiento({ onClose, dataSelect, accion, tipo }) {
  const [stateListaProd, SetstateListaProd] = useState(false);
  const {
    listarProductos,
    insertarProducto,
    productos,
    setBuscador,
    buscarProduc,
    buscador,
    selectProducto,
    productoActual
  } = useProductosStore();
  const { insertarMovimiento, actualizarMovimiento } = useMovimientoStore();
  const {idusuario} = useUsuariosStore();
  const { listarProveedor } = useProveedorStore();
  const [proveedores, setProveedores] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: resultadosBusquedaProd = [] } = useQuery({
    queryKey: ["buscar producto modal", buscador],
    queryFn: () => buscarProduc({ nombre: buscador }),
    enabled: buscador.length > 0,
  });
  const productosMostrados =
    buscador.length > 0 ? resultadosBusquedaProd : productos;

  useEffect(() => {
    async function cargarProveedores() {
      const prov = await listarProveedor();
      setProveedores(prov);
    }
    cargarProveedores();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  async function onSubmit(data) {
    try {
        const nuevoMovimiento = {
          fecha: new Date(),
          tipo: tipo,
          id_usuario: idusuario,
          cantidad: parseFloat(data.cantidad),
          detalle: data.detalle,
          id_producto: productoActual.id,
        };
        await insertarMovimiento(nuevoMovimiento);
      onClose();
    } catch (error) {
      console.error("❌ Error al insertar movimiento:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message, 
        footer: 'Intenta con una cantidad menor'
      });
    }
  }

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>{tipo === "entrada" ? "Nueva Entrada" : "Nueva Salida"}</h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>
        <div className="contentBuscador">
          <div onClick={() => SetstateListaProd(true)}>
            <Buscador setBuscador={setBuscador} />
          </div>

          {stateListaProd && (
            <ListaProducts
              data={productosMostrados} scroll="scroll"
              bottom="-250px"
              setState={() => SetstateListaProd(!stateListaProd)}
              funcion={selectProducto}
            />
          )}
        </div>
        <CardProductoSelect text1={productoActual.nombre} text2={productoActual.stock_actual}/>

        <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
          <section className="seccion1">

            {/* Cantidad */}
            <InputText icono={<v.iconocalculadora />}>
              <input
                className="form__field"
                type="number"
                placeholder=""
                {...register("cantidad", { required: true, min: 0 })}
              />
              <label className="form__label">Cantidad</label>
              {errors.cantidad && <p>Campo requerido</p>}
            </InputText>

            {/* Detalle */}
            <InputText icono={<v.iconotodos />}>
              <input
                className="form__field"
                type="text"
                placeholder=""
                {...register("detalle", { required: true })}
              />
              <label className="form__label">Detalles</label>
              {errors.detalle && <p>Campo requerido</p>}
            </InputText>      
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
  width: 95%;
  max-width: 550px;   /* 👈 ancho ideal para formularios */
  margin: 0 auto;     /* centrar */
  border-radius: 20px;
  background: ${({ theme }) => theme.bgtotal};
  box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
  padding: 20px 26px 30px 26px;
  z-index: 100;
  max-height: 90vh;
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
    .contentBuscador{
    position:relative;
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
