import { v } from "../styles/variables.jsx";
import {
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";

export const DesplegableUser = [
  {
    text: "Mi perfil",
    icono: <v.iconoUser/>,
    tipo: "miperfil",
  },
  {
    text: "Configuracion",
    icono: <v.iconoSettings/>,
    tipo: "configuracion",
  },
  {
    text: "Cerrar sesión",
    icono: <v.iconoCerrarSesion/>,
    tipo: "cerrarsesion",
  },
];



//data SIDEBAR
export const LinksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Inventario",
    icon: <v.iconocategorias />,
    to: "/inventario",
  },
  {
    label: "Reportes",
    icon: <v.iconoreportes />,
    to: "/reportes",
  },
 
];
export const SecondarylinksArray = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "/configurar",
  },

];
//temas
export const TemasData = [
  {
    icono: "🌞",
    descripcion: "light",
   
  },
  {
    icono: "🌚",
    descripcion: "dark",
    
  },
];

//data configuracion
export const DataModulosConfiguracion =[
  {
    title:"Productos",
    subtitle:"Registra tus productos",
    icono:"https://i.ibb.co/85zJ6yG/caja-del-paquete.png",
    link:"/configurar/productos",
   
  },
  {
    title:"Personal",
    subtitle:"Ten el control de tu personal",
    icono:"https://i.ibb.co/5vgZ0fX/hombre.png",
    link:"/configurar/usuarios",
   
  },

  {
    title:"Tu empresa",
    subtitle:"Configura tus opciones básicas",
    icono:"https://i.ibb.co/x7mHPgm/administracion-de-empresas.png",
    link:"/configurar/empresa",
    
  },
  {
    title:"Categoria de productos",
    subtitle:"Asigna categorias a tus productos",
    icono:"https://i.ibb.co/VYbMRLZ/categoria.png",
    link:"/configurar/categorias",
    
  },
  {
    title:"Compra de productos",
    subtitle:"gestiona tus compras",
    icono:"https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
    link:"/configurar/marca",
   
  },

]
//tipo usuario
export const TipouserData = [
  {
    descripcion: "empleado",
    icono: "🪖",
  },
  {
    descripcion: "administrador",
    icono: "👑",
  },
];
//tipodoc
export const TipoDocData = [
  {
    descripcion: "Dni",
    icono: "🪖",
  },
  {
    descripcion: "Libreta electoral",
    icono: "👑",
  },
  {
    descripcion: "Otros",
    icono: "👑",
  },
];

// NUEVOS DATOS FALSOS PARA REPORTES
export const DataReportes = [
  {
    id: "1",
    title: "Ventas del Mes",
    description: "Un resumen de las ventas totales y promedio diario.",
    icon: <v.iconobars />,
    chartData: [65, 59, 80, 81, 56, 55, 40], // Datos para el gráfico falso
  },
  {
    id: "2",
    title: "Inventario Bajo",
    description: "Productos que necesitan reabastecimiento pronto.",
    icon: <v.iconostockminimo />,
    chartData: [30, 40, 45, 22, 15, 60, 70],
  },
  {
    id: "3",
    title: "Productos Populares",
    description: "Los 5 productos más vendidos de este período.",
    icon: <v.iconopie />,
    chartData: [80, 50, 30, 70, 90, 20, 10],
  },
   {
    id: "4",
    title: "Usuarios Activos",
    description: "Resumen de la actividad de los usuarios.",
    icon: <v.iconoUser />,
    chartData: [10, 40, 35, 50, 49, 60, 70],
  },
];