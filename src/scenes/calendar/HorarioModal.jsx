import React, { useContext, useState } from 'react';
import { Button, Modal, TextField, Grid, useTheme, Box, Container, Typography, useMediaQuery } from '@mui/material';
// import moment from "moment"
import { tokens } from "../../theme";

import { DayContext } from '../../context/day.context';

import { v4 as uuidv4 } from 'uuid';

export default function HorarioModal(props) {
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
    const { day } = useContext(DayContext)

    // state para manejar el estado del formulario y poder extraer cosas de el y pasarselas al metodo handleSubmit
    const [turnoDayForm, setTurnoDayForm] = useState({
        entrada1: "",
        salida1: "",
        entrada2: "",
        salida2: ""
    });

    const handleTurnoDayFormChange = (event) => {
        const { name, value } = event.target;
        setTurnoDayForm((prevState) => (
            { ...prevState, [name]: value }
        ));
    }

    // maneja lo que hace el modal cuando se presiona el boton de cerrar
    const handleClose = () => {
        setOpen(false);
    };

    // const isAfterMidnight = (day, time) => {
    //     const momentTime = moment(`${day}T${time}`, "YYYY-MM-DDTHH:mm");
    //     console.log(momentTime)
    //     const midnight = moment(`${day}T00:00`, "YYYY-MM-DDTHH:mm");
    //     console.log(momentTime.isAfter(midnight))
    //     return momentTime.isAfter(midnight);
    //     // const momentTime = moment(`${day}T${time}`, "YYYY-MM-DDTHH:mm");
    //     // console.log(momentTime.format("YYYY-MM-DDTHH:mm"))
    //     // const nextDay = moment(day).add(1, "day").format("YYYY-MM-DD");
    //     // const midnight = moment(`${nextDay}T00:00`, "YYYY-MM-DDTHH:mm");
    //     // console.log(momentTime.isAfter(midnight))
    //     // return momentTime.isAfter(midnight);
    // };

    const handleSubmit = (event) => {
        event.preventDefault();

        // console.log(day)

        // TODO considerar abandonar el metodo de start y end con fechas y usar el title para representarlo en el calendar y como en la otra app generar el objeto propio
        // que sera el que usemoas para el state

        if (turnoDayForm.entrada1 && turnoDayForm.salida1 && turnoDayForm.entrada2 && turnoDayForm.salida2) {
            let id = uuidv4()
            onEventAdded([{
                id: id,
                groupId: id,
                title: `${turnoDayForm.entrada1} - ${turnoDayForm.salida1}`,
                date: `${day}`,
                // start: `${day}T${turnoDayForm.entrada1}:00`,
                // *por propositos de recordar que existian estas propiedades y como las habia escrito en su epoca
                // start: '2023-03-16T20:00:00',
                // end: `${day}T${turnoDayForm.salida1}:00`,
            }, {
                id: id,
                groupId: id,
                title: `${turnoDayForm.entrada2} - ${turnoDayForm.salida2}`,
                date: `${day}`,

                // start: `${day}T${turnoDayForm.entrada2}:00`,
                // end: `${day}T${turnoDayForm.salida2}:00`,
            }, {
                id: id,
                groupId: id,
                partidos: 1,
            }])
        } else {
            let id = uuidv4()
            onEventAdded([{
                id: id,
                groupId: id,
                title: `${turnoDayForm.entrada1} - ${turnoDayForm.salida1}`,
                date: `${day}`,

                // start: `${day}T${turnoDayForm.entrada1}:00`,
                // end: `${day}T${turnoDayForm.salida1}:00`,
            },
            {
                id: id,
                groupId: id,
                partidos: 0
            }])
        }

        // onEventAdded({
        //     id: "12315",
        //     title: "soy evento",
        //     // start: Date.now(),
        //     start: `${day}T20:00:00`,
        //     // start: '2023-03-16T20:00:00',
        //     // end: Date.now(),
        //     end: `${day}T22:00:00`,
        // })


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
                            justifyContent: "space-around",
                            alignItems: "space-around"
                        }} padding={5} width={boxWidth} height={boxHeight} backgroundColor={colors.primary[400]} borderRadius="35px" >
                            <h2 id="turno-modal">Horario</h2>
                            <Grid container justifyContent="space-evenly"
                                alignItems="center" spacing={2}>
                                <Grid item xs={6} sm={6}>
                                    <Typography padding={"1rem"} variant='h6' fontSize="0.90rem">
                                        Entrada 1
                                    </Typography>
                                    {/* <h4></h4> */}
                                    <TextField id="entrada1" name="entrada1" label="Inicio turno 1" type="time" onChange={handleTurnoDayFormChange} InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Typography padding={"1rem"} variant='h6' fontSize="0.90rem">
                                        Salida 1
                                    </Typography>
                                    <TextField id="salida1" name="salida1" label="Fin turno 1" type="time" onChange={handleTurnoDayFormChange} InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>

                                <Grid item xs={6} sm={6}>
                                    <Typography padding={"1rem"} variant='h6' fontSize="0.90rem">
                                        Entrada 2
                                    </Typography>
                                    <TextField id="entrada2" name="entrada2" label="Inicio turno 2" type="time" onChange={handleTurnoDayFormChange} InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Typography padding={"1rem"} variant='h6' fontSize="0.90rem">
                                        Salida 2
                                    </Typography>
                                    <TextField id="salida2" name="salida2" label="Fin turno 2" type="time" onChange={handleTurnoDayFormChange} InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>
                            </Grid>
                            <Typography padding={"0.5rem"} variant='h6' fontSize="0.60rem">
                                Llena el turno 2 solo si tienes un turno partido
                            </Typography>
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