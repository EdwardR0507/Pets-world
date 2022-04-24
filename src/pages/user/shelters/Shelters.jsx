import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShelterCard from "../../../components/ShelterCard";

const Shelters = () => {
  const navigate = useNavigate();
  const { shelters } = useSelector((state) => state.shelter);
  const [search, setSearch] = useState("");

  const filteredShelters = shelters.filter((shelter) => {
    return shelter.nombreMascota.toLowerCase().includes(search.toLowerCase());
  });

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
      <Typography variant="h2">Mis Refugios</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/user/shelters/register")}
      >
        Añadir nuevo refugio
      </Button>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        padding={{ xs: 2, md: 3, lg: 4 }}
      >
        {filteredShelters.length > 0 ? (
          filteredShelters.map((shelter) => (
            <Grid item xs={2} sm={4} md={4} key={shelter.id}>
              <ShelterCard {...shelter} />
            </Grid>
          ))
        ) : (
          <Typography
            variant="h4"
            align="center"
            sx={{
              margin: "auto",
            }}
          >
            No hay refugios registrados con ese nombre
          </Typography>
        )}
      </Grid>

      <FormControl sx={{ width: "20rem" }}>
        <TextField
          label="Buscar otros refugios"
          name="nombre"
          value={search}
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </FormControl>
    </Box>
  );
};

export default Shelters;
