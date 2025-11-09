import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../hooks/ProtectedRoute";
import { UserAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useUsuariosStore } from "../store/UsuariosStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { ErrorMolecula } from "../components/moleculas/ErrorMolecula";
import { MostrarEmpresa } from "../supabase/crudLibreria";
import { Configuracion } from "../pages/Configuracion";

export function MyRoutes() {
  const { user } = UserAuth();
  const { MostrarUsuarios, idusuario } = useUsuariosStore();

  const {
    data: datausuarios,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: () => MostrarUsuarios(),
  });
  const { data: dataempresa } = useQuery({
    queryKey: ["mostrar empresa", idusuario],
    queryFn: () => MostrarEmpresa({ idusuario: idusuario }),
    enabled: !!idusuario && idusuario > 0,
  });
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <ErrorMolecula mensaje={error.message} />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuracion />} />
      </Route>
    </Routes>
  );
}
