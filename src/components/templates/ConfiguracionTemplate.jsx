import styled from "styled-components";
import fondocuadros from "../../assets/fondocuadros.svg";
import { Link } from "react-router-dom";
import { DataModulosConfiguracion } from "../../utils/dataEstatica";
export function ConfiguracionTemplate() {
  return (
    <Container>
      <div id="cards">
        {DataModulosConfiguracion.map((item, index) => {
          return (
            <Link
              to={item.link}
              className={item.state ? "card" : "card false"}
              key={index}
            >
              <div class="card-content">
                <div class="card-image">
                  <img src={item.icono} />
                </div>

                <div class="card-info-wrapper">
                  <div class="card-info">
                    <i class="fa-duotone fa-unicorn"></i>
                    <div class="card-info-title">
                      <h3>{item.title}</h3>
                      <h4>{item.subtitle}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-color: ${({ theme }) => theme?.bgtotal || "#0f0f10"};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  color: ${({ theme }) => theme?.textcolor || "#f2f2f2"};
  font-family: "Inter", sans-serif;

  .header {
    text-align: center;
    margin-bottom: 40px;

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: ${({ theme }) => theme?.colortitlecard || "#ffffff"};
      margin-bottom: 8px;
    }

    p {
      font-size: 1rem;
      color: ${({ theme }) => theme?.colorsubtitlecard || "#a0a0a0"};
    }
  }

  #cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    width: 100%;
    max-width: 1100px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .card {
    background-color: ${({ theme }) => theme?.bgcards || "#1b1b1f"};
    border: 1px solid ${({ theme }) => theme?.bg5 || "#2a2a2a"};
    border-radius: 20px;
    width: 240px;
    height: 270px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 25px 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-8px);
      border-color: ${({ theme }) => theme?.colortitlecard || "#00ff88"};
      box-shadow: 0 8px 20px rgba(0, 255, 136, 0.2);
    }
  }

  .card-image {
    width: 90px;
    height: 90px;
    margin-bottom: 16px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: grayscale(80%) brightness(0.8);
      transition: filter 0.3s ease;
    }
  }

  .card:hover .card-image img {
    filter: grayscale(0%) brightness(1);
  }

  .card-info-title h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ theme }) => theme?.colortitlecard || "#ffffff"};
    margin-bottom: 4px;
  }

  .card-info-title h4 {
    font-size: 0.9rem;
    color: ${({ theme }) => theme?.colorsubtitlecard || "#b3b3b3"};
    font-weight: 400;
  }

  @media (max-width: 768px) {
    .card {
      width: 180px;
      height: 220px;
      padding: 15px;
    }
    .card-image {
      width: 70px;
      height: 70px;
    }
    .card-info-title h3 {
      font-size: 1rem;
    }
    .card-info-title h4 {
      font-size: 0.8rem;
    }
  }
`;