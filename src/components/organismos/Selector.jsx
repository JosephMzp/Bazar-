import styled from "styled-components";
import { v } from "../../styles/variables";

export function Selector({ color, state, funcion, texto1, texto2 }) {
  return (
    <Container $color={color} onClick={funcion}>
      <div>
        <span>{texto1}</span>
        <span>{texto2}</span>
      </div>
      <span className={state?"open":"close"}>{<v.iconoFlechabajo />}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.border || "#53B257"};
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  transition: 0.3s;
  front-weight: 600;
  box-shadow: 4px 9px 20px -12px ${({ theme }) => theme.border || "#53B257"};
  .open {
    transition: 0.6s;
    transform: rotate(180deg);
  }
  .open {
    transition: 0.3s;
    transform: rotate(0deg);
  }
  &:hover {
    background-color: ${({ theme }) => theme.border || "#53B257"};
    color: #000;
  }
`;
