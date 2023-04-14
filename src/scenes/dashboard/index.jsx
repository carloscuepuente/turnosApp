
import React from 'react';
// import { Button, Modal, TextField, Grid, useTheme, Box, Container } from '@mui/material';
// import { tokens } from "../../theme";


export default function Dashboard() {

    const borrarLocalStorage = () => {
        localStorage.clear()
    }

    return (
        <>
            <div>
                pagina en construccion, pincha el calendario
            </div>
            <button onClick={borrarLocalStorage}>borrar el localStorage</button>
        </>

    )


};





