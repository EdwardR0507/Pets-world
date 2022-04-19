import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Pet = () => {
  const { id } = useParams();
  const { pets } = useSelector((state) => state.pet);

  const pet = pets.find((pet) => pet.id === Number(id));
  console.log("pet:", pet);
  // Return the pet data after fixed the issue with register pet
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
        <Typography variant="h2"> Firulais {id}</Typography>
        <Typography variant="h4">Perro - Labrador</Typography>
        <Typography variant="h6"> Registrado el 16/04/22 </Typography>
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
          <Typography variant="body2"> 16/04/22 </Typography>
          <Typography variant="body2"> Marrón </Typography>
          <Typography variant="body2"> Grande </Typography>
          <Typography variant="body2"> Muy activo </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Pet;
