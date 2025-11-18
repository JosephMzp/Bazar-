import styled from "styled-components";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useEffect } from "react";

export function ListaModulos({ accion, checkboxs, setCheckboxs }) {
  const { datamodulos, datapermisos } = useUsuariosStore();

  useEffect(() => {
    if (accion === "Editar") {
      const allDocs = datamodulos.map((mod) => {
        const tienePermiso = datapermisos?.some(
          (p) => p.modulos.nombre === mod.nombre
        );

        return { ...mod, check: !!tienePermiso };
      });

      setCheckboxs(allDocs);
    } else {
      const allDocs = datamodulos.map((m) => ({ ...m, check: false }));
      setCheckboxs(allDocs);
    }
  }, [accion, datamodulos, datapermisos, setCheckboxs]);

  const handlecheckbox = (id) => {
    setCheckboxs((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, check: !item.check } : item
      )
    );
  };

  return (
    <Container>
      {checkboxs?.map((item, index) => (
        <div className="content" key={index}>
          <label className="checkbox-wrapper">
            <input
              checked={item.check}
              type="checkbox"
              onChange={() => handlecheckbox(item.id)}
            />
            <div className="checkmark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M20 6L9 17L4 12"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <span>{item.nombre}</span>
          </label>
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
display: flex;
flex-direction:column;
border: 2px dashed #414244;
border-radius: 15px;
padding: 20px;
gap: 15px;

.content{
  display: flex;
  gap: 20px;
}

.checkbox-wrapper {
  --checkbox-size: 25px;
  --checkbox-color: #00ff88;
  --checkbox-shadow: rgba(0, 255, 136, 0.3);
  --checkbox-border: rgba(0, 255, 136, 0.7);

  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 10px;
}

.checkbox-wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  z-index: 3;
}

.checkmark {
  position: relative;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border: 2px solid var(--checkbox-border);
  border-radius: 8px;
  transition: 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 15px var(--checkbox-shadow);
  overflow: hidden;
}

.checkmark::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--checkbox-color), #00ffcc);
  opacity: 0;
  transform: scale(0) rotate(-45deg);
  transition: 0.4s;
}

input:checked + .checkmark::before {
  opacity: 1;
  transform: scale(1) rotate(0);
}

.checkmark svg {
  width: 0;
  height: 0;
  transition: 0.4s;
  z-index: 2;
}

input:checked + .checkmark svg {
  width: 18px;
  height: 18px;
  transform: rotate(360deg);
}
`;
