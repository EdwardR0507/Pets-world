import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Pet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets } = useSelector((state) => state.pet);

  const pet = pets.find((pet) => pet.id === Number(id));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "calc(100vh - 64px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "200px",
        }}
      >
        <Typography variant="h2"> {pet.nombre}</Typography>
        <Typography variant="h4">
          {pet.especie} - {pet.raza || pet.razaEspecifica}
        </Typography>
        <Typography variant="h6">Registrado el {pet.fechaRegistro}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "50%",
          justifyContent: "space-evenly",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="body2"> Fecha de Nacimiento: </Typography>
          <Typography variant="body2">Color:</Typography>
          <Typography variant="body2">Tamaño:</Typography>
          <Typography variant="body2">Características:</Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="body2"> {pet.fechaNacimiento} </Typography>
          <Typography variant="body2"> {pet.color} </Typography>
          <Typography variant="body2"> {pet.tamaño} </Typography>
          <Typography variant="body2">{pet.caracteristica} </Typography>
        </Stack>
      </Box>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Volver
      </Button>
    </Box>
  );
};

export default Pet;
