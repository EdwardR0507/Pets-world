import { AppBar, Box, IconButton, Toolbar, Stack, Button } from "@mui/material";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const NavBar = () => {
  const {
    auth: { token },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <Link
              to={token ? "/user/home" : "/"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  display: "block",
                  height: "40px",
                }}
              />
            </Link>
          </IconButton>
          {token ? (
            <Stack direction="row" spacing={4}>
              <Button color="inherit">
                <Link
                  to="/user/pets/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Registrar Mascota
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/user/pets"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Ver Mascotas
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/user/shelters"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Ver Mis Refugios
                </Link>
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={4}>
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
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
