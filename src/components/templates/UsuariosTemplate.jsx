import styled from "styled-components";
import { Btnsave } from "../moleculas/Btnsave";
import { useAuthStore } from "../../store/AuthStore";
import { Header } from "../organismos/Header";
import { useState } from "react";
import { RegistrarUsuarios } from "../organismos/Formularios/RegistrarUsuarios";
import { BtnFiltro } from "../moleculas/BtnFiltro";
import { ContentFiltro } from "../atomos/ContentFiltro";
import {Title} from "../atomos/Title"
import { v } from "../../styles/variables"
import { Buscador } from "../organismos/Buscador";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { TablaUsuarios } from "../organismos/Tablas/tablaUsuarios";

export function UsuariosTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setopenRegistro] = useState(false);
  const nuevoRegistro = () =>{
    setopenRegistro(!openRegistro);
    setAccion("Nuevo")
    setdataSelect([])
  }
  const {setBuscador} = useUsuariosStore();
  return (
    <Container>
      {openRegistro && 
        <RegistrarUsuarios
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
      <section className="area1">
      <ContentFiltro>
        <Title>Personal</Title>
      <BtnFiltro funcion={nuevoRegistro} bgcolor="#f6f3f3" textcolor="#353535" icono={<v.agregar/>}/>
      </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador}/>
      </section>
      <section className="main">
        <TablaUsuarios data={data} setopenRegistro={setopenRegistro} setdataSelect={setdataSelect} setAccion={setAccion}/>
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
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

    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;

    display: flex;
    align-items: center;
  }
  .area2. {
    grid-area: area2;

    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;

    display: flex;
    align-items: center;
  }
`;
