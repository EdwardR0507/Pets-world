import {
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Stack,
  Button,
} from "@mui/material";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            LOGO
          </Link>
        </IconButton>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit">
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              ¿Quienes somos?
            </Link>
          </Button>
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit">
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Registro
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Iniciar Sesión
            </Link>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
