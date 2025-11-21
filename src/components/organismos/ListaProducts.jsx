import styled from "styled-components";
import { BtnCerrar } from "../atomos/BtnCerrar";
import { Device } from "../../styles/breackpoints";

export function ListaProducts({ data, setState, funcion, scroll, bottom }) {
  const seleccionar = (p) => {
    funcion(p);
    setState();
  };

  return (
    <Container $scroll={scroll} $bottom={bottom}>
      <section className="contentClose">
        <BtnCerrar funcion={setState}/>
      </section>

      <section className="contentItems">
        {data.map((item, index) => {
          return(
          <ItemContainer key={index} onClick={() => seleccionar(item)}>
            <span>-</span>
            <span>{item.nombre}</span>
          </ItemContainer>
          )
        })}
      </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  bottom: ${(props) => props.$bottom};
  padding: 10px;
  width: 260px;
  border-radius: 10px;
  gap: 10px;
  z-index: 99;
  height: 230px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;   /* 👉 evita que se salga */

  @media ${Device.tablet} {
    width: 400px;
  }

  .contentItems {
    flex: 1;          
    overflow-y: auto; 
  }
`;


const ItemContainer = styled.div`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  color: ${({ theme }) => theme.text};

  &:hover {
    background-color: ${({ theme }) => theme.bgtotal};
  }
`;
