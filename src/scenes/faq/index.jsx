import React from 'react';
import {
    Box,
    useTheme,
    Grid,
    useMediaQuery,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography

} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Header from '../../components/Header';
import { tokens } from '../../theme';



export default function Faq() {
    const borrarLocalStorage = () => {
        localStorage.clear()
    }
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Box m="20px">

            <Box
                display={smScreen ? "flex" : "block"}
                flexDirection={smScreen ? "row" : "column"}
                justifyContent={smScreen ? "space-between" : "start"}
                alignItems={smScreen ? "center" : "start"}
                m="10px 0"
            >
                <Header title="Variables" />

            </Box>


            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>


                <Grid item xs={12}  >
                    <Box
                        width="100%"
                        // backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Accordion sx={{
                            backgroundColor: `${colors.primary[400]}`,
                            width: "80%"
                        }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Plus de nocturnidad</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Se establece este plus por cada hora efectiva de trabajo entre las 22:00 horas y las 06:00 horas.
                                    Su cuantía mínima será de 1,45 euros adicionales al precio de la hora ordinaria, una vez aplicado para el año 2022 el incremento
                                    previsto en el artículo 26 del presente convenio.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                </Grid>
                <Grid item xs={12}  >
                    <Box
                        width="100%"
                        // backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Accordion sx={{
                            backgroundColor: `${colors.primary[400]}`,
                            width: "80%"
                        }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Hora perentoria</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    En la definición de horas perentorias se estará a la regulación del artículo 37 del presente convenio, y, salvo su compensación con descanso en los términos que en el mismo se regula, se abonará como mínimo la cantidad equivalente al valor de la hora ordinaria del nivel correspondiente del convenio sectorial incrementada en un 75 %. El precio de la hora ordinaria se determinará aplicando la siguiente fórmula: Percepción mínima fija bruta anual/1712.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
                <Grid item xs={12}  >
                    <Box
                        width="100%"
                        // backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Accordion sx={{
                            backgroundColor: `${colors.primary[400]}`,
                            width: "80%"
                        }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Complemento por festivo</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Los trabajadores que presten servicios en día festivo (excepto domingos) percibirán una cuantía mínima de 2,57 euros adicionales al precio de la hora ordinaria por cada hora efectiva trabajada en festivo, una vez aplicado para el año 2022 el incremento previsto en el artículo 26 del presente convenio.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
                <Grid item xs={12}  >
                    <Box
                        width="100%"
                        // backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Accordion sx={{
                            backgroundColor: `${colors.primary[400]}`,
                            width: "80%"
                        }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Complemento de Domingo</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Los trabajadores y trabajadoras que presten servicios en domingo percibirán una cuantía mínima de 2,52 euros por hora adicional al precio de la hora ordinaria de trabajo efectivo en domingo, una vez aplicado para el año 2022 el incremento previsto en el artículo 26 del presente convenio. El percibo de este complemento no será en ningún caso acumulable con el complemento de festivo.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
                <Grid item xs={12}  >
                    <Box
                        width="100%"
                        // backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Accordion sx={{
                            backgroundColor: `${colors.primary[400]}`,
                            width: "80%"
                        }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Plus de jornada fraccionada</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Los trabajadores y trabajadoras que presten sus servicios en régimen de jornada fraccionada percibirán, por cada día de trabajo efectivo en dicho régimen, una cantidad mínima de 10,22 euros, una vez aplicado para el año 2022 el incremento previsto en el artículo 26 del presente convenio.                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
                <Grid item xs={12}  >
                    <Box
                        width="100%"
                        // backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Accordion sx={{
                            backgroundColor: `${colors.primary[400]}`,
                            width: "80%"
                        }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Plus de madrugue</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    El personal afectado devengará, en concepto de plus de madrugue, la cantidad de 5,80 euros por día trabajado en estas condiciones, siempre que su jornada laboral tenga su comienzo entre las 4 y las 6,55 horas, una vez aplicado para el año 2022 el incremento previsto en el artículo 26 del presente convenio.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
                <Grid item xs={12}  >
                    <Box
                        width="100%"
                        // backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Accordion sx={{
                            backgroundColor: `${colors.primary[400]}`,
                            width: "80%"
                        }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Plus de transporte</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    El personal percibirá la cantidad de 2,55 euros por cada día de asistencia al trabajo. una vez aplicado para el año 2022 el incremento previsto en el artículo 26 del presente convenio.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
                <Grid item xs={12}  >
                    <Box
                        width="100%"
                        // backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">

                        <Accordion sx={{
                            backgroundColor: `${colors.primary[400]}`,
                            width: "80%"
                        }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Ayuda de manutención</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    El personal percibirá por cada día de asistencia al trabajo la cantidad de 5,80 euros en concepto de ayuda de manutención, siempre que su turno/horario incluyese en su totalidad las 14 y las 16 horas, o las 21 y las 23 horas y la duración de la jornada diaria continuada, sea igual o superior de seis horas, una vez aplicado para el año 2022 el incremento previsto en el artículo 26 del presente convenio.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>



            </Grid>
            borrar los datos guardados por la aplicacion
            < button onClick={borrarLocalStorage} > borrar el localStorage</button >
        </Box >



    )
}
