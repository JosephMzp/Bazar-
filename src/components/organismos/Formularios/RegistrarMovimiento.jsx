import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { Device } from "../../../styles/breackpoints";
import { InputText } from "./InputText";
import { Btnsave } from "../../moleculas/Btnsave";
import { useProductosStore } from "../../../store/ProductosStore";
import { useForm } from "react-hook-form";
import { useCategoriaStore } from "../../../store/CategoriaStore";
import { useSubCategoriaStore } from "../../../store/SubCategoriaStore";
import { useProveedorStore } from "../../../store/ProveedorStore";

export function RegistrarMovimiento({ onClose, dataSelect, accion }) {
  const { insertarProducto, actualizarProducto } = useProductosStore();
  const { listarCategoria } = useCategoriaStore();
  const { listarSubCategoria } = useSubCategoriaStore();
  const { listarProveedor } = useProveedorStore();
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [proveedores, setProveedores] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    async function cargarEdicion() {
      if (accion !== "Editar" || !dataSelect) return;

      // Cargar valores iniciales
      reset({
        nombre: dataSelect.nombre,
        descripcion: dataSelect.descripcion,
        precio_unitario: dataSelect.precio_unitario,
        stock_actual: dataSelect.stock_actual,
        stock_minimo: dataSelect.stock_minimo,
        id_subcategoria: dataSelect.id_subcategoria,
        id_proveedor: dataSelect.id_proveedor,
        estado: dataSelect.estado,
      });

      // Obtener categoría
      const categoriaDeSub = categorias.find(
        (c) => c.id === dataSelect.id_categoria
      );

      if (categoriaDeSub) {
        setCategoriaSeleccionada(categoriaDeSub.id);

        // Cargar subcategorías
        const subs = await listarSubCategoria(categoriaDeSub.id);
        setSubcategorias(subs);
      }
    }

    if (categorias.length > 0 && proveedores.length > 0) {
      cargarEdicion();
    }
  }, [accion, dataSelect, categorias, proveedores]);

  useEffect(() => {
    async function cargarCategorias() {
      const cats = await listarCategoria();
      setCategorias(cats);
    }
    cargarCategorias();
  }, []);

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
      if (accion === "Editar") {
        const productoActualizado = {
          id: dataSelect.id,
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio_unitario: parseFloat(data.precio_unitario),
          stock_actual: parseInt(data.stock_actual),
          stock_minimo: parseInt(data.stock_minimo),
          id_subcategoria: parseInt(data.id_subcategoria),
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
          id_subcategoria: parseInt(data.id_subcategoria),
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

  async function handleCategoriaChange(e) {
    const idCat = e.target.value;
    setCategoriaSeleccionada(idCat);

    const subs = await listarSubCategoria(idCat);
    setSubcategorias(subs);

    // limpiar subcategoría en el formulario
    reset((formValues) => ({
      ...formValues,
      id_subcategoria: "",
    }));
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
          <section className="seccion1">
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
          </section>
          <section className="seccion2">
            {/* Categoría */}
            <InputText icono={<v.iconocategoria />}>
              <select
                className="form__field"
                value={categoriaSeleccionada || ""}
                onChange={handleCategoriaChange}
              >
                <option value="">Seleccione categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
              <label className="form__label"></label>
            </InputText>

            {/* SubCategoría */}
            <InputText icono={<v.iconocategoria />}>
              <select
                className="form__field"
                {...register("id_subcategoria", { required: true })}
                disabled={subcategorias.length === 0}
              >
                <option value="">Seleccione subcategoría</option>
                {subcategorias.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.nombre}
                  </option>
                ))}
              </select>
              <label className="form__label"></label>
              {errors.id_subcategoria && <p>Campo requerido</p>}
            </InputText>

            {/* Proveedor */}
            <InputText icono={<v.iconoproveedor />}>
              <select
                className="form__field"
                {...register("id_proveedor", { required: true })}
              >
                <option value="">Seleccione proveedor</option>
                {proveedores.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.nombre}
                  </option>
                ))}
              </select>

              <label className="form__label"></label>
              {errors.id_proveedor && <p></p>}
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
              <label className="form__label"></label>
              {errors.estado && <p>Campo requerido</p>}
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
