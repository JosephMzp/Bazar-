import { useEffect } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText } from "./InputText";
import { Btnsave } from "../../moleculas/Btnsave";
import { useProductosStore } from "../../../store/ProductosStore";
import { useForm } from "react-hook-form";
import { useLibreriaStore } from "../../../store/LibreriaStore";

export function RegistrarProducto({ onClose, dataSelect, accion }) {
  const { insertarProducto, actualizarProducto } = useProductosStore();
  const { dataempresa } = useLibreriaStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (accion === "Editar" && dataSelect) {
      reset({
        nombre: dataSelect.nombre,
        descripcion: dataSelect.descripcion,
        precio_unitario: dataSelect.precio_unitario,
        stock_actual: dataSelect.stock_actual,
        stock_minimo: dataSelect.stock_minimo,
        id_categoria: dataSelect.id_categoria,
        id_proveedor: dataSelect.id_proveedor,
        estado: dataSelect.estado,
      });
    }
  }, [accion, dataSelect, reset]);

  async function onSubmit(data) {
  try {
    if (accion === "Editar") {
      const productoActualizado = {
        id: dataSelect.id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio_unitario: parseFloat(data.precio_unitario),
        stock_actual: parseInt(data.stock_actual),
        stock_minimo: parseInt(data.stock_minimo),
        id_categoria: parseInt(data.id_categoria),
        id_proveedor: parseInt(data.id_proveedor),
        estado: data.estado ?? true,
      };
      await actualizarProducto(productoActualizado.id, productoActualizado);
    } else {
      const nuevoProducto = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio_unitario: parseFloat(data.precio_unitario),
        stock_actual: parseInt(data.stock_actual),
        stock_minimo: parseInt(data.stock_minimo),
        id_categoria: parseInt(data.id_categoria),
        id_proveedor: parseInt(data.id_proveedor),
        estado: "activo",
      };
      await insertarProducto(nuevoProducto);
    }
    onClose();
  } catch (error) {
    console.error("❌ Error al insertar o actualizar producto:", error);
  }
}

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion === "Editar"
                ? "Editar producto"
                : "Registrar nuevo producto"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
          <section>
            {/* Nombre */}
            <InputText icono={<v.iconoproducto />}>
              <input
                className="form__field"
                type="text"
                placeholder=""
                {...register("nombre", { required: true })}
              />
              <label className="form__label">Nombre del producto</label>
              {errors.nombre && <p>Campo requerido</p>}
            </InputText>

            {/* Descripción */}
            <InputText icono={<v.iconodescripcion />}>
              <textarea
                className="form__field"
                rows={2}
                placeholder=""
                {...register("descripcion", { required: true })}
              />
              <label className="form__label">Descripción</label>
              {errors.descripcion && <p>Campo requerido</p>}
            </InputText>

            {/* Precio */}
            <InputText icono={<v.iconodinero />}>
              <input
                className="form__field"
                type="number"
                step="0.01"
                placeholder=""
                {...register("precio_unitario", { required: true, min: 0 })}
              />
              <label className="form__label">Precio unitario</label>
              {errors.precio_unitario && <p>Campo requerido</p>}
            </InputText>

            {/* Stock actual */}
            <InputText icono={<v.iconostock />}>
              <input
                className="form__field"
                type="number"
                placeholder=""
                {...register("stock_actual", { required: true, min: 0 })}
              />
              <label className="form__label">Stock actual</label>
              {errors.stock_actual && <p>Campo requerido</p>}
            </InputText>

            {/* Stock mínimo */}
            <InputText icono={<v.iconostockmin />}>
              <input
                className="form__field"
                type="number"
                placeholder=""
                {...register("stock_minimo", { required: true, min: 0 })}
              />
              <label className="form__label">Stock mínimo</label>
              {errors.stock_minimo && <p>Campo requerido</p>}
            </InputText>

            {/* Categoría */}
            <InputText icono={<v.iconocategoria />}>
              <input
                className="form__field"
                type="number"
                placeholder=""
                {...register("id_categoria", { required: true, min: 1 })}
              />
              <label className="form__label">ID Categoría</label>
              {errors.id_categoria && <p>Campo requerido</p>}
            </InputText>

            {/* Proveedor */}
            <InputText icono={<v.iconoproveedor />}>
              <input
                className="form__field"
                type="number"
                placeholder=""
                {...register("id_proveedor", { required: true, min: 1 })}
              />
              <label className="form__label">ID Proveedor</label>
              {errors.id_proveedor && <p>Campo requerido</p>}
            </InputText>

            {/* Estado */}
            <InputText icono={<v.iconoestado />}>
              <select
                className="form__field"
                {...register("estado", { required: true })}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
              <label className="form__label">Estado</label>
              {errors.estado && <p>Campo requerido</p>}
            </InputText>

            <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#53B257"
              />
            </div>
          </section>
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
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    max-height: 90vh; /* 👈 limita altura del modal */
    overflow-y: auto;

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
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;
