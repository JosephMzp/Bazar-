import styled from "styled-components";
import { v } from "../../styles/variables";

export const ColorContent = styled.div`
justity-content: center;
min-height:${(props)=>props.$alto};
width: ${(props)=>props.$ancho};
display: flex;
background-color: ${(props)=>props.$color};
border-radius: 50%;
text-align: center;
`;