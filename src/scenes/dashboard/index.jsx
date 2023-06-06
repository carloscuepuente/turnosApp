import React, { useState } from 'react';
import {
    Box,
    useTheme,
    Grid,
    TextField,
    useMediaQuery

} from "@mui/material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PercentIcon from '@mui/icons-material/Percent';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

import Header from '../../components/Header';
import { tokens } from '../../theme';
import moment from "moment"
import Card from './Card';


export default function Dashboard() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const [mes, setMes] = useState(moment().format("YYYY-MM"))

    const handleChange = (event) => {
        setMes(event.target.value)
    }

    const getLocalStorage = (key) => {
        let value
        try {
            let rawValue = JSON.parse(
                window.localStorage.getItem(key)
            );

            value = rawValue.filter(item => item.type === "resumen" && moment(item.fecha).format("MM") === moment(mes).format("MM"))

        } catch (e) {
            value = []
        };
        return value
    }

    const data = getLocalStorage("turnos");
    const perentoriasData = getLocalStorage("perentorias")

    const totalDuracion = data.reduce((acumulador, turno) => acumulador + parseInt(turno.turnoDuracion), 0)
    const totalNocturnidad = data.reduce((acumulador, turno) => acumulador + parseInt(turno.nocturnidad), 0)
    const totalPartidos = data.reduce((acumulador, turno) => acumulador + turno.partidos, 0)
    const totalMadrugue = data.reduce((acumulador, turno) => acumulador + turno.plusMadrugue, 0)
    const totalManutencion = data.reduce((acumulador, turno) => acumulador + turno.plusManutencion, 0)
    const totalTransporte = data.reduce((acumulador, turno) => acumulador + turno.plusTransporte, 0)
    const totalPerentorias = perentoriasData.reduce((acumulador, dia) => acumulador + parseFloat(dia.perentoria), 0)

    // console.log(getLocalStorage("turnos"))

    return (
        <Box m="20px">

            <Box
                display={smScreen ? "flex" : "block"}
                flexDirection={smScreen ? "row" : "column"}
                justifyContent={smScreen ? "space-between" : "start"}
                alignItems={smScreen ? "center" : "start"}
                m="10px 0"
            >
                <Header title="Resumen" />

            </Box>


            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                <Grid item xs={12}  >
                    <TextField
                        value={mes}
                        onChange={handleChange}
                        type='month'
                        label="Resumen de"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        color="secondary"
                        inputProps={{
                            style: {
                                filter: "invert(100%)"
                            }
                        }}
                        InputProps={{
                            style: {
                                color: "black"
                            }
                        }}
                    />

                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={3} xl={3} >
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Card
                            info={(totalDuracion / 60).toFixed(2)}
                            tipo={"Horas Trabajadas"}
                            cobro={"Este mes"}
                            icono={<AccessTimeFilledIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />} />

                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3} >
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Card
                            info={(((totalDuracion / 60) / 155.63) * 100).toFixed(2)}
                            tipo={"% Jornada"}
                            cobro={"Este mes"}
                            icono={<PercentIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />

                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3} >
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Card
                            info={totalPartidos}
                            tipo={"Partidos"}
                            cobro={"Mes Vencido"}
                            icono={<HourglassDisabledIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />

                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3} >
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Card
                            info={totalTransporte}
                            tipo={"Plus Transporte"}
                            cobro={"Mes Vencido"}
                            icono={<DirectionsCarIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />

                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3} >
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Card
                            info={(totalNocturnidad / 60).toFixed(2)}
                            tipo={"Horas Nocturnidad"}
                            cobro={"Mes Vencido"}
                            icono={<BedtimeIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}

                        />

                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3} >
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Card
                            info={totalMadrugue}
                            tipo={"Madrugues"}
                            cobro={"Mes Vencido"}
                            icono={<WbTwilightIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />

                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3} >
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Card
                            info={totalManutencion}
                            tipo={"Total Manutención"}
                            cobro={"Mes Vencido"}
                            icono={<RestaurantIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />

                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} xl={3} >
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Card
                            info={totalPerentorias.toFixed(2)}
                            tipo={"Perentorias"}
                            cobro={"Mes Vencido"}
                            icono={<MoreTimeIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />

                    </Box>

                </Grid>








            </Grid>

        </Box>

    )


};





