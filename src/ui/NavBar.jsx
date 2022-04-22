import { AppBar, IconButton, Toolbar, Stack, Button } from "@mui/material";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            LOGO
          </Link>
        </IconButton>
        <Stack direction="row" spacing={8}>
          <Button color="inherit">
            <Link
              to="/auth/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Registro
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/auth/login"
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
