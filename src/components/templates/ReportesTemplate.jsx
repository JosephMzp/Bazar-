import styled from "styled-components";
import { v } from "../../styles/variables";
import { DataReportes } from "../../utils/dataEstatica";
import { Device } from "../../styles/breackpoints";

export function ReportesTemplate() {
  return (
    <Container>
      <Header>
        <h1>Reportes</h1>
        <p>Visualiza el estado y rendimiento de tu negocio.</p>
      </Header>

      <GridContainer>
        {DataReportes.map((report) => (
          <ReportCard key={report.id}>
            <CardHeader>
              <Icon>{report.icon}</Icon>
              <h3>{report.title}</h3>
            </CardHeader>
            <p>{report.description}</p>
            <FakeChart>
              {/* Genera barras falsas basadas en los datos */}
              {report.chartData.map((value, index) => (
                <div
                  key={index}
                  style={{
                    height: `${value}%`,
                    backgroundColor: `rgba(83, 178, 87, ${
                      (value / 100) * 0.7 + 0.3
                    })`, // Usa tu color verde (bg5) con opacidad variable
                  }}
                ></div>
              ))}
            </FakeChart>
          </ReportCard>
        ))}
      </GridContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh; /* Asegura que ocupe al menos toda la altura */
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  padding: ${v.lgSpacing};
  overflow-y: auto; /* Permite scroll si el contenido es muy largo */

  @media ${Device.tablet} {
     padding: ${v.xxlSpacing};
  }
`;

const Header = styled.div`
  margin-bottom: ${v.xxlSpacing};
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.text};
  }
  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colorsubtitlecard};
  }
`;

const GridContainer = styled.div`
  display: grid;
  /* Crea columnas responsive:
     - 1 columna en móviles (minmax(300px, 1fr))
     - Se ajusta automáticamente a más columnas en pantallas grandes
  */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${v.lgSpacing};
`;

const ReportCard = styled.div`
  background: ${({ theme }) => theme.bgcards};
  border-radius: ${v.borderRadius};
  padding: ${v.lgSpacing};
  box-shadow: ${v.boxshadowGray};
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border-color: ${({ theme }) => theme.bg5}; /* Tu color verde */
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colorsubtitlecard};
    margin-top: ${v.smSpacing};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${v.mdSpacing};

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colortitlecard};
  }
`;

const Icon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.bg5}; /* Tu color verde */
`;

const FakeChart = styled.div`
  height: 150px;
  background: ${({ theme }) => theme.bg}; /* Fondo más oscuro para el gráfico */
  border-radius: 8px;
  margin-top: ${v.lgSpacing};
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 15px 10px 0 10px;
  overflow: hidden;

  /* Las barras falsas */
  div {
    width: 20px;
    border-radius: 4px 4px 0 0;
    transition: height 0.5s ease;
  }
`;