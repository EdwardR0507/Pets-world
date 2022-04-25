import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Shelter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shelters } = useSelector((state) => state.shelter);

  const shelter = shelters.find((shelter) => shelter.id === Number(id));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: {
          xs: "100%",
          md: "calc(100vh - 64px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: {
            xs: "100%",
            md: "350px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: {
              xs: "100%",
              md: "500px",
            },
            height: {
              xs: "100%",
              md: "300px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: "60%",
            }}
          >
            <Typography variant="h2"> {shelter.nombre}</Typography>
            <Typography variant="h4">
              {shelter.numeroAsociados} Asociados
            </Typography>
            <Typography variant="h6">
              Registrado el {shelter.fechaRegistro}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Stack spacing={2}>
              <Typography variant="body2">Dirección:</Typography>
              <Typography variant="body2">Distrito:</Typography>
              <Typography variant="body2">Número de Contacto:</Typography>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="body2" align="right">
                {shelter.direccion}
              </Typography>
              <Typography variant="body2" align="right">
                {shelter.distrito}
              </Typography>
              <Typography variant="body2" align="right">
                {shelter.numeroContacto}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box>
          <img src={shelter.urlLink} alt="foto" />
        </Box>
      </Box>

      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Volver
      </Button>
    </Box>
  );
};

export default Shelter;
