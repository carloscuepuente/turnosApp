import React, { useContext, useState } from 'react';
import { Button, Modal, TextField, Grid, useTheme, Box, Container, Typography, useMediaQuery } from '@mui/material';
import moment from "moment"
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
    const { day } = useContext(DayContext) //formato 2023-04-18 o YYYY-MM-DD


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

    // *maneja lo que hace el modal cuando se presiona el boton de cerrar
    const handleClose = () => {
        setOpen(false);
    };

    // * formulas para los calculos llevarselas para un archivo aparte luego
    const getDuration = (tiempo1, tiempo2) => {
        const momentTiempo1 = moment(tiempo1, "HH:mm");
        const momentTiempo2 = moment(tiempo2, "HH:mm");

        // si el momento2 es despues del momento1 le sumamos un dia para los calculos
        if (momentTiempo2.isBefore(momentTiempo1)) {
            momentTiempo2.add(1, "day")
        };
        // regresa el valor absoluto de la diferencia por lo que siempre es positivo
        const duration = momentTiempo2.diff(momentTiempo1, "minutes");

        return duration
    };

    const isTimeBetween = (primerIntervalTime, segundoIntervalTime, tiempo) => {
        // donde primerIntervalTime es el limite inferior de la ventana a comparar aka 22:00
        // donde segundoIntervalTime es el limite inferior de la ventana a comparar aka 06:00 dia siguiente
        // donde tiempo1 es el la entrada al turno
        // donde tiempo2 es la salida del turno

        // parseamos los tiempos a moments
        // const momentprimerTime = moment(`${day} ${primerIntervalTime}`, `YYYY-MM-DD HH:mm`); esto no sirve problema con las zonas horarias
        const momentprimerTime = moment(primerIntervalTime, `HH:mm`);
        // let momentsegundoTime = moment(`${day} ${segundoIntervalTime}`, `YYYY-MM-DD HH:mm`);
        const momentsegundoTime = moment(segundoIntervalTime, `HH:mm`);
        // const momentTiempo = moment(`${day} ${tiempo}`, `YYYY-MM-DD HH:mm`);
        const momentTiempo = moment(tiempo, `HH:mm`);

        // chequeamos la correlacion de los tiempos y si son superiores les sumamos dias
        if (momentsegundoTime.isBefore(momentprimerTime)) {
            momentsegundoTime.add(1, "day")
        };

        if (momentTiempo.isBefore(momentprimerTime)) {
            momentTiempo.add(1, "day")
        };

        // chequear aqui si uno o el otro estan dentro del intervalo de 22:00 a 06:00
        // regresar true o false en funcion de ello
        // el tercer y el cuarto elemento del isBetween, es la granularidad y la inclusion de los limites respectivamente
        if (momentTiempo.isBetween(momentprimerTime, momentsegundoTime, undefined, [])) {
            // //chequear aqui arriba el caso limite de cuando son la misma hora aka 22:00 entrada y limiteinferiror 22:00
            return true
        } else {
            return false
        };
    }

    const getNocturnidad = (entrada, salida, limiteInferior = "22:00", limiteSuperior = "06:00") => {

        // si la entrada y la salida esta dentro del intervalo, hay nocturnidada y es la diferencia de tiempo
        if (isTimeBetween(limiteInferior, limiteSuperior, entrada) && isTimeBetween(limiteInferior, limiteSuperior, salida)) {

            const nocturnidada = getDuration(entrada, salida);
            return nocturnidada
        };

        // si la entrada esta fuera del intervalo y la salida dentro, hay nocturnidad y es la diferencia entre la salida y el limiteInferior
        if (!isTimeBetween(limiteInferior, limiteSuperior, entrada) && isTimeBetween(limiteInferior, limiteSuperior, salida)) {

            const nocturnidad = getDuration(limiteInferior, salida);
            return nocturnidad
        }

        // si la entrada esta dentro del intervalo y la salida fuera, hay nocturnidad y es la diferencia entre limiteSuperior y la entrada
        if (isTimeBetween(limiteInferior, limiteSuperior, entrada) && !isTimeBetween(limiteInferior, limiteSuperior, salida)) {
            const nocturnidad = getDuration(entrada, limiteSuperior);
            return nocturnidad
        }

        // si ni la entrada ni la salida entan dentro del intervalo, no hay nocturnidad regresar un cero
        if (!isTimeBetween(limiteInferior, limiteSuperior, entrada) && !isTimeBetween(limiteInferior, limiteSuperior, salida)) {
            const nocturnidada = 0
            return nocturnidada
        };
    };

    const isPlusMadrugue = (entrada, limiteInferior = "04:00", limiteSuperior = "06:55") => {

        // si la entrada esta dentro del intervalo, plusMadrugue true
        if (isTimeBetween(limiteInferior, limiteSuperior, entrada)) {
            return true
        };

        // si la entrada esta fuera del intervalo, plusMadruge false
        if (!isTimeBetween(limiteInferior, limiteSuperior, entrada)) {
            return false
        }

    };

    const isPlusManutencion = (entrada, salida) => {
        // vamos a chequear las dos ventanas de tiempo por separado

        // la de 14 a 16 usamos la funcion isTimeBetween para ver si 14 y 16 estan dentro del inicio y fin de turno y si ademas el turno es de mas de 6 o 360 min
        if (isTimeBetween(entrada, salida, "14:00") && isTimeBetween(entrada, salida, "16:00") && parseInt(getDuration(entrada, salida)) >= 360) {
            return true
        };
        if (isTimeBetween(entrada, salida, "21:00") && isTimeBetween(entrada, salida, "23:00") && parseInt(getDuration(entrada, salida)) >= 360) {
            return true
        };

        return false


    };


    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(day)

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
                resumen: "resumen",
                // date: `${day}`, //genera un evento vacio en el calendario ponerle otro nombre para ver si asi no lo genera
                id: id,
                groupId: id,
                partidos: true,
                turnoDuracion: `${getDuration(turnoDayForm.entrada1, turnoDayForm.salida1) + getDuration(turnoDayForm.entrada2, turnoDayForm.salida2)}`,
                nocturnidad: `${getNocturnidad(turnoDayForm.entrada1, turnoDayForm.salida1) + getNocturnidad(turnoDayForm.entrada2, turnoDayForm.salida2)}`,
                plusMadrugue: isPlusMadrugue(turnoDayForm.entrada1), //todo falta testing de esta !
                plusTransporte: true,
                plusManutencion: (isPlusManutencion(turnoDayForm.entrada1, turnoDayForm.salida1) || isPlusManutencion(turnoDayForm.entrada2, turnoDayForm.salida2)) ? true : false
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
                resumen: "resumen",
                // date: `${day}`,
                id: id,
                groupId: id,
                partidos: 0,
                turnoDuracion: `${getDuration(turnoDayForm.entrada1, turnoDayForm.salida1)}`,
                nocturnidad: `${getNocturnidad(turnoDayForm.entrada1, turnoDayForm.salida1)}`,
                plusMadrugue: isPlusMadrugue(turnoDayForm.entrada1),
                plusTransporte: true,
                plusManutencion: isPlusManutencion(turnoDayForm.entrada1, turnoDayForm.salida1)
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




