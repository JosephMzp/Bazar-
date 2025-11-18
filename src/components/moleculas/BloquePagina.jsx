import styled from "styled-components";

export function BloqueoPagina({state}) {
    if(state) return;
  return (
    <Container>
      <span className="icono">💀</span>
      <span className="texto">No tienes acceso</span>
    </Container>
  );
}

const Container = styled.div`
position: absolute;
  z-index: 10;
  background: rgba(26, 9, 9, 0.9);
  border: 1px solid rgba(248, 42, 45, 0.5);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  gap: 15px;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 1;
  color: ${(props)=>props.theme.text};
  .icono {
    font-size: 30px;
  }
`;
