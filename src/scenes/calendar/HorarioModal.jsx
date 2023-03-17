import React from 'react';
import { Button, Modal, TextField, Grid, useTheme, Box, Container } from '@mui/material';
import { tokens } from "../../theme";


export default function HorarioModal(props) {
    // extrayendo del hook los colores y cosas del tema
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


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
                            transform: 'translate(-50%, -50%)'
                        }} padding={5} width="50vw" height="50vh" backgroundColor={colors.primary[400]} borderRadius="35px" >
                            <h2 id="turno-modal">Horario</h2>
                            <Grid container justifyContent="space-between"
                                alignItems="center" spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <h4>Inicio Turno 1</h4>
                                    <TextField id="iniTur_1" name="iniTur_1" label="Inicio turno 1" type="time" InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h4>Fin Turno 1</h4>
                                    <TextField id="finTur_1" name="finTur_1" label="Fin turno 1" type="time" InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <h4>Inicio Turno 2</h4>
                                    <TextField id="iniTur_2" name="iniTur_2" label="Inicio turno 2" type="time" InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h4>Fin Turno 2</h4>
                                    <TextField id="finTur_2" name="finTur_2" label="Fin turno 2" type="time" InputLabelProps={{
                                        shrink: true,
                                    }} fullWidth />
                                </Grid>
                            </Grid>
                            <h6>Llena el turno 2 si tienes un turno partido</h6>
                            <div style={{ marginTop: '20px', padding: "15px" }}>

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