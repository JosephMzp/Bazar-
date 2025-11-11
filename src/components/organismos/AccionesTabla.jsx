import styled from "styled-components";
import { AcTabla } from "../atomos/AcTabla";
import { v } from "../../styles/variables";

export function AccionesTabla({ funcionEditar, funcionEliminar }) {
  return (
    <Container>
      <AcTabla
        funcion={funcionEditar}
        color="#7d7d7d"
        icono={<v.iconeditarTabla />}
      />
      <AcTabla
        funcion={funcionEliminar}
        color="#f76e8e"
        icono={<v.iconeliminarTabla />}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 48em) {
    justify-content: end;
  }
`;
