import styled from "styled-components";
import { Btnsave } from "../moleculas/Btnsave";
import { useAuthStore } from "../../store/AuthStore";
import { Header } from "../organismos/Header";
import { useState } from "react";
import { TablaProducto } from "../organismos/Tablas/tablaProducto";
import { ResgistrarProducto } from "../organismos/Formularios/RegistrarProducto";
import { BtnFiltro } from "../moleculas/BtnFiltro";

export function ProductosTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setopenRegistro] = useState(false);
  return (
    <Container>
      {openRegistro && 
        <ResgistrarProducto
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => setopenRegistro(!openRegistro)}
        />
      }

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1"></section>
      <BtnFiltro/>
      <section className="area2"></section>
      <section className="main">
        <TablaProducto data={data} />
      </section>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 100px
    "main" auto;

  .header {
    grid-area: header;
    background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    background-color: rgba(229, 67, 26, 0.14);
    display: flex;
    align-items: center;
  }
  .area2. {
    grid-area: area2;
    background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    align-items: center;
  }
  .main {
    grid-area: main;
    background-color: rgba(179, 46, 241, 0.14);
    display: flex;
    align-items: center;
  }
`;
