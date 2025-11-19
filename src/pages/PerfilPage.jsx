// src/pages/PerfilPage.jsx

import React from 'react';

// Asegúrate de que exportas la función. Usamos 'export function' para que
// coincida con el import que hicimos en routes.jsx: 'import { PerfilPage } from ...'
export function PerfilPage() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>✅ ¡Perfil Funcionando!</h1>
            <p>Si ves esto, el componente está cargando correctamente.</p>
        </div>
    );
}

// Si usaras 'export default', la importación en routes.jsx debería ser
// 'import PerfilPage from ...' 