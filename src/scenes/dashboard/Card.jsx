import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

function Card(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { info, tipo, cobro, icono } = props

    return (
        <Box width="100%" m="0 30px" p="12px 0">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icono}
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                    >
                        {info}
                    </Typography>
                </Box>
                {/* <Box>
              <ProgressCircle progress={progress} />
            </Box> */}
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                    {tipo}
                </Typography>
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{ color: colors.greenAccent[600] }}
                >
                    {cobro}
                </Typography>
            </Box>
        </Box>
    );

}

export default Card;
