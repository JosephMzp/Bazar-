import styled from "styled-components";

export function BtnFiltro({ bgcolor, textcolor, icono, funcion, tooltip }) {
  return (
    <Container $textcolor={textcolor} $bgcolor={bgcolor} onClick={funcion} title={tooltip}>
      <div className="icon">{icono}</div>
    </Container>
  );
}

const Container = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $bgcolor }) =>
    $bgcolor || "linear-gradient(145deg, #e6e6e6, #ffffff)"};
  color: ${({ $textcolor }) => $textcolor || "#333"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  border: none;
  outline: none;
  position: relative;
  transition: all 0.25s ease;
  box-shadow:
    4px 4px 10px rgba(0, 0, 0, 0.15),
    -4px -4px 10px rgba(255, 255, 255, 0.6);

  &:hover {
    transform: scale(1.08);
    box-shadow:
      2px 2px 6px rgba(0, 0, 0, 0.2),
      -2px -2px 6px rgba(255, 255, 255, 0.4);
  }

  &:active {
    transform: scale(0.92);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
  }

  &:hover .icon {
    transform: scale(1.25) rotate(5deg);
  }
`;