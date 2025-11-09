import { LoginTemplate } from "../components/templates/LoginTemplate";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); 
    }
  }, [user, navigate]); 


  return <LoginTemplate />;
}