import { Box, FormControl, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShelterCard from "../../components/ShelterCard";
import { getShelters } from "../../features/shelter/shelterSlice";

const SearchShelters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shelters } = useSelector((state) => state.shelter);
  const [search, setSearch] = useState("");

  const filteredShelters = shelters.filter((shelter) => {
    return shelter.nombre.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    dispatch(getShelters());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">Refugios</Typography>
      <FormControl sx={{ width: "20rem", margin: "20px auto" }}>
        <TextField
          label="Buscar Refugio"
          name="nombre"
          value={search}
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </FormControl>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        padding={{ xs: 2, md: 3, lg: 4 }}
      >
        {filteredShelters.length > 0 ? (
          filteredShelters.map((shelter) => (
            <Grid item xs={2} sm={4} md={4} key={shelter.id}>
              <ShelterCard
                nombre={shelter.nombre}
                direccion={shelter.direccion}
                urlLink={shelter.urlLink}
                handleNavigate={() => navigate(`/shelters/${shelter.id}`)}
              />
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
    </Box>
  );
};

export default SearchShelters;
