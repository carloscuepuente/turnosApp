import React, { useContext, useState } from 'react';
import { Button, Modal, TextField, Grid, useTheme, Box, Container, Typography, useMediaQuery } from '@mui/material';
import moment from "moment"
import { tokens } from "../../theme";

import { DayContext } from '../../context/day.context';

import { v4 as uuidv4 } from 'uuid';

export default function PerentoriasModal(props) {
    // extrayendo del hook los colores y cosas del tema
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // para manejar el tamaño del modal
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const boxWidth = isSmallScreen ? "90vw" : "80vw";
    const boxHeight = isSmallScreen ? "90vh" : "80vh";

    // metodos pasadas desde el componente padre Calendar
    const { open, setOpen, onEventAdded } = props;

    // para acceder al contexto dia del componente Calendar
    const { day } = useContext(DayContext) //formato 2023-04-18 o YYYY-MM-DD


    // state para manejar el estado del formulario y poder extraer cosas de el y pasarselas al metodo handleSubmit
    const [turnoDayForm, setTurnoDayForm] = useState({
        horas: "",
    });

    const handleTurnoDayFormChange = (event) => {
        const { name, value } = event.target;
        setTurnoDayForm((prevState) => (
            { ...prevState, [name]: value }
        ));
    }

    // *maneja lo que hace el modal cuando se presiona el boton de cerrar
    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(day)

        if (turnoDayForm.horas) {
            let id = uuidv4()

            onEventAdded([{
                id: id,
                groupId: id,
                title: `${turnoDayForm.horas}`,
                date: `${day}`,
                // start: `${day}T${turnoDayForm.entrada1}:00`,
                // *por propositos de recordar que existian estas propiedades y como las habia escrito en su epoca
                // start: '2023-03-16T20:00:00',
                // end: `${day}T${turnoDayForm.salida1}:00`,
            }, {
                type: "resumen",
                fecha: `${day}`, //genera un evento vacio en el calendario ponerle otro nombre para ver si asi no lo genera
                id: id,
                groupId: id,
                partidos: true,
                perentoria: `${turnoDayForm.horas}`
            }])
        }



        handleClose();
    };

    // console.log(selectedStuff)

    return (
        <>
            {/* <Button variant="contained" color="secondary" onClick={handleOpen}>
                Open Modal
            </Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="turno-modal"
                aria-describedby="modal with turno information"
            >
                <Container>
                    <form onSubmit={handleSubmit}>

                        <Box style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: 'translate(-50%, -50%)',
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "stretch"
                        }} padding={5} width={boxWidth} height={boxHeight} backgroundColor={colors.primary[400]} borderRadius="35px" >
                            <h2 id="turno-modal">Perentoria del {moment(day).format("D MMM")}</h2>
                            <Grid container justifyContent="space-evenly"
                                alignItems="center" spacing={2}>
                                <Grid item xs={6} sm={6}>
                                    <Typography padding={"1rem"} variant='h6' fontSize="0.90rem">
                                        Perentorias
                                    </Typography>
                                    <TextField helperText="Ejemplo 1.75 o 0.25 solo acepta . como separador" id='horas' name="horas" label="horas" InputLabelProps={{
                                        shrink: true,
                                    }} onChange={handleTurnoDayFormChange} inputProps={{ inputMode: 'numeric', pattern: '^[0-9]+(?:[,.](?:00|25|50|75))?$' }} fullWidth />
                                </Grid>

                            </Grid>
                            <div style={{ display: "flex", marginTop: '15px', padding: "15px" }}>

                                <Button variant="contained" color="secondary" type="submit">
                                    Save Changes
                                </Button>
                                <Button variant="contained" onClick={handleClose} style={{ marginLeft: '10px' }}>
                                    Close
                                </Button>
                            </div>
                        </Box>
                    </form>
                </Container>
            </Modal>
        </>
    );
};


// <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
// https://mui.com/material-ui/react-text-field/