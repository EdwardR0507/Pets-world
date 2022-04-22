import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swall from "sweetalert2";
import DashboardSection from "../../components/DashboardSection";
import {
  getOwnerById,
  registerOwner,
  verifyOwner,
} from "../../features/owner/ownerSlice";
import { getUserByUsername } from "../../features/user/userSlice";

const HomeUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    auth: { nombreUsuario },
  } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.user);

  const { isOwner } = useSelector((state) => state.owner);

  useEffect(() => {
    dispatch(getUserByUsername(nombreUsuario));
  }, [dispatch, nombreUsuario]);

  useEffect(() => {
    dispatch(verifyOwner(nombreUsuario));
  }, [dispatch, nombreUsuario]);

  useEffect(() => {
    isOwner && dispatch(getOwnerById());
  }, [dispatch, isOwner]);

  const handleRegister = () => {
    if (isOwner) {
      navigate("/user/register-pet");
    } else {
      dispatch(
        registerOwner({
          historial_id: 1,
          numero_mascotas: 0,
          rate: 0,
          usuario_id: user.id,
        })
      )
        .then(unwrapResult)
        .then(() => navigate("/user/register-pet"))
        .catch((error) => {
          Swall.fire({
            icon: "error",
            title: "Error",
            text: error,
          });
        });
    }
  };

  const handleMyPets = () => {
    if (isOwner) {
      navigate("/user/pets");
    } else {
      Swall.fire({
        icon: "error",
        title: "Error",
        text: "Debe registrar una mascota",
      });
    }
  };

  const handleMyShelters = () => {
    navigate("/user/pets");
  };

  const handleMyLosts = () => {
    if (isOwner) {
      navigate("/loss/register");
    } else {
      Swall.fire({
        icon: "error",
        title: "Error",
        text: "Debe registrar una mascota",
      });
    }
  };

  return (
    user && (
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
            height: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              height: "140px",
            }}
          >
            <Avatar
              alt="User"
              src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              sx={{ width: 56, height: 56 }}
            />
            <Typography variant="h5">{user?.nombres}</Typography>
            <Typography variant="body1"> @{user?.nombreUsuario} </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "1rem",
              height: "200px",
            }}
          >
            <Typography variant="body1">
              Últimas 3 mascotas registradas:
            </Typography>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              <ListItem>
                <Link
                  to="/user/pets/1"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Mascota 1
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/user/pets/2"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Mascota 2
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/user/pets/3"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Mascota 3
                </Link>
              </ListItem>
            </List>
          </Box>
          <Stack spacing={2}>
            <Button variant="contained" color="primary" onClick={handleMyLosts}>
              Registrar pérdida
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/loss/search")}
            >
              Buscar mascotas perdidas
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "700px",
            height: "500px",
          }}
        >
          <Typography variant="h4">
            ¡Bienvenido Nuevamente a Pets World!
          </Typography>
          <Typography variant="body1">
            Aquí podrás ver toda la información de tu perfil y mascotas
          </Typography>
          <Divider />

          <DashboardSection
            title="Registrar Mascota"
            description="Podrás registrar una nueva mascota en la plataforma haciendo click en el botón IR."
            handleClick={handleRegister}
          />
          <Divider />

          <DashboardSection
            title={"Ver Tus Mascotas"}
            description={
              "Podrás ver todas las mascotas registradas en la plataforma haciendo click en el botón IR (no olvidar que debes tener almenos 1 mascota registrada)."
            }
            handleClick={handleMyPets}
          />

          <Divider />

          <DashboardSection
            title="Ver Refugios"
            description="Podrás ver todos los refugios registrados en la plataforma haciendo click en el botón IR."
            handleClick={handleMyShelters}
          />
        </Box>
      </Box>
    )
  );
};

export default HomeUser;
