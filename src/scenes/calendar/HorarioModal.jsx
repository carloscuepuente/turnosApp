import React from 'react';
import { Button, Modal, TextField, Grid, useTheme, Box, Container, Typography, useMediaQuery } from '@mui/material';
import { tokens } from "../../theme";


export default function HorarioModal(props) {
    // extrayendo del hook los colores y cosas del tema
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const boxWidth = isSmallScreen ? "90vw" : "80vw";
    const boxHeight = isSmallScreen ? "90vh" : "80vh";

    const { open, setOpen, onEventAdded } = props
    // console.log(props)

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the form data

        onEventAdded({
            // title: "soy evento",
            // start: Date.now(),
            start: '2023-03-16T20:00:00',
            // end: Date.now(),
            end: '2023-03-16T22:00:00',
        })


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
                                    <TextField id="iniTur_1" name="iniTur_1" label="Inicio turno 1" type="time" InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Typography padding={"1rem"} variant='h6' fontSize="0.90rem">
                                        Salida 1
                                    </Typography>
                                    <TextField id="finTur_1" name="finTur_1" label="Fin turno 1" type="time" InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>

                                <Grid item xs={6} sm={6}>
                                    <Typography padding={"1rem"} variant='h6' fontSize="0.90rem">
                                        Entrada 2
                                    </Typography>
                                    <TextField id="iniTur_2" name="iniTur_2" label="Inicio turno 2" type="time" InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Typography padding={"1rem"} variant='h6' fontSize="0.90rem">
                                        Fin Turno 2
                                    </Typography>
                                    <TextField id="finTur_2" name="finTur_2" label="Fin turno 2" type="time" InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>
                            </Grid>
                            <Typography padding={"0.5rem"} variant='h6' fontSize="0.60rem">
                                Llena el turno 2 si tienes un turno partido
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