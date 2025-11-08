import styled from "styled-components";
import {Btnsave} from "../moleculas/Btnsave.jsx"
import {useUsuariosStore} from "../../store/UsuariosStore.jsx"
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function LoginTemplate(){
    const navigate = useNavigate();
    const {insertarUsuarioAdmin} = useUsuariosStore();
    const mutacionInsertUser = useMutation({
        mutationKey:["insertar usuario admin"], mutationFn:async()=>{
            const p ={
                correo:"prueba@gmail.com",
                pass:"prueba"
            }
            const dt = await insertarUsuarioAdmin(p)
            if(dt){
                navigate("/")
            }
        }
    })
    return(<Container>
        <Btnsave titulo="Crear cuenta" bgcolor="#fff" funcion={mutacionInsertUser.mutateAsync}/>
    </Container>)
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgtotal};
`;