import { useState } from "react";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { Light, Dark } from "./styles/themes.jsx";
import { MyRoutes } from "./routes/routes.jsx";
import styled, { ThemeProvider } from "styled-components";
import { createContext } from "react";
import { Device } from "./styles/breackpoints.jsx";
import { Sidebar } from "./components/organismos/sidebar/Sidebar.jsx";
import { MenuHambur } from "./components/organismos/Menuhambur.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useLocation } from "react-router-dom";
import { Login } from "./pages/Login.jsx";

export const ThemeContext = createContext(null);

function App() {
  const [themeuse, setTheme] = useState("dark");
  const theme = themeuse === "light" ? "light" : "dark";
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            {pathname != "/login" ? (
              <Container className={sidebarOpen ? "active" : ""}>
                <section className="ContentSidebar">
                  <Sidebar
                    state={sidebarOpen}
                    setState={() => setSidebarOpen(!sidebarOpen)}
                  />
                </section>
                <section className="ContentMenuambur">
                  <MenuHambur />
                </section>
                <section className="ContentRoutes">
                  <MyRoutes />
                </section>
              </Container>
            ) : (
              <Login />
            )}

            <ReactQueryDevtools initialIsOpen={false} />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}
const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.bgtotal};
  .ContentSidebar {
    display: none;
  }
  .ContentMenuambur {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenuambur {
      display: none;
    }
  }
  .ContentRoutes {
    grid-column: 1;
    width: 100%;
    @media ${Device.tablet} {
      grid-column: 2;
    }
  }
`;

export default App;
