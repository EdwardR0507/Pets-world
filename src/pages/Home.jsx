import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
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
          justifyContent: "center",
          wordBreak: "break-word",
          width: "40%",
        }}
      >
        <Typography variant="h1">Pets World</Typography>
        <Typography variant="p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
          voluptatem consectetur, illo ullam doloremque ducimus vero officia
          laudantium sunt harum soluta quidem tenetur eius assumenda veritatis
          rem qui cum incidunt. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Est voluptatem consectetur, illo ullam doloremque
          ducimus vero officia laudantium sunt harum soluta quidem tenetur eius
          assumenda veritatis rem qui cum incidunt. rem qui cum incidunt. Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Est voluptatem
          consectetur, illo ullam doloremque ducimus vero officia laudantium
          sunt harum soluta quidem tenetur eius assumenda veritatis rem qui cum
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
        sx={{ width: "400px", height: "400px", backgroundColor: "green" }}
      ></Box>
    </Box>
  );
};

export default Home;
