import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShelterCard from "../../../components/ShelterCard";
import { getSheltersByDNI } from "../../../features/user/userSlice";

const Shelters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shelters } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSheltersByDNI());
  }, [dispatch]);

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
        {shelters.length > 0 ? (
          shelters.map((shelter) => (
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
            No tienes refugios registrados
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Shelters;
