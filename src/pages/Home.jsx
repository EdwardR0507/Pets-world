import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import petsImage from "../assets/images/pets.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        height: {
          xs: "100%",
          md: "calc(100vh - 64px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          wordBreak: "break-word",
          width: {
            xs: "100%",
            md: "40%",
          },
          height: "500px",
        }}
      >
        <Typography variant="h1" align="center">
          Pets World
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontSize: {
              xs: "1rem",
              md: "1.5rem",
            },
          }}
          align={window.innerWidth > 600 ? "center" : "left"}
        >
          La mejor comunidad para cuidar a tus mascotas y todos los animalitos
          sin hogar. Buscamos formar una comunidad responsable y comprometida
          para así hacer escuchar a los que no tienen voz además perseguimos el
          objetivo de disminuir la tasa de mascotas perdidas y abandonadas en
          nuestro país.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            margin: "1rem 0",
            borderRadius: "0.5rem",
            border: "none",
          }}
          onClick={() => navigate("/auth/register")}
        >
          Registrate
        </Button>
        <Link
          to="/auth/login"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: {
            xs: "100%",
            md: "40%",
          },
          height: {
            xs: "100%",
            md: "500px",
          },
        }}
      >
        <img
          src={petsImage}
          alt="pets"
          style={{
            maxWidth: "100%",
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
