import styled from "styled-components";

export const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 0;

  /* Animación sutil al aparecer */
  animation: fadeIn 0.4s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;