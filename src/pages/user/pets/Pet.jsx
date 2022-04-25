import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Pet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets } = useSelector((state) => state.user);

  const pet = pets.find((pet) => pet.id === Number(id));

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
              height: {
                xs: "100%",
                md: "150px",
              },
            }}
          >
            <Typography variant="h2" align="center">
              {pet.nombre}
            </Typography>
            <Typography variant="h4">
              {pet.especie} - {pet.raza || pet.razaEspecifica}
            </Typography>
            <Typography variant="h6">
              Registrado el {pet.fechaRegistro}
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
              <Typography variant="body2"> Fecha de Nacimiento: </Typography>
              <Typography variant="body2">Color:</Typography>
              <Typography variant="body2">Tamaño:</Typography>
              <Typography variant="body2">Características:</Typography>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="body2" align="right">
                {pet.fechaNacimiento}
              </Typography>
              <Typography variant="body2" align="right">
                {pet.color}
              </Typography>
              <Typography variant="body2" align="right">
                {pet.tamaño}
              </Typography>
              <Typography variant="body2" align="right">
                {pet.caracteristica}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: {
              xs: "100%",
              md: "300px",
            },
          }}
        >
          <img
            src={pet.urlLink}
            alt="mascota"
            style={{
              maxWidth: "100%",
            }}
          />
        </Box>
      </Box>

      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Volver
      </Button>
    </Box>
  );
};

export default Pet;
