import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swall from "sweetalert2";
import DashboardSection from "../../components/DashboardSection";
import {
  getOwnerById,
  registerOwner,
  verifyOwner,
} from "../../features/owner/ownerSlice";
import { getShelters } from "../../features/shelter/shelterSlice";
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

  useEffect(() => {
    dispatch(getShelters());
  }, [dispatch]);

  const handleRegister = () => {
    if (isOwner) {
      navigate("/user/pets/register");
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
        .then((res) => {
          if (res) {
            navigate("/user/pets/register");
          }
        })
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
    navigate("/user/shelters");
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
              src={user.urlLink}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h5">{user?.nombres}</Typography>
            <Typography variant="body1"> @{user?.nombreUsuario} </Typography>
          </Box>
          <Stack spacing={2}>
            <Button variant="contained" color="primary" onClick={handleMyLosts}>
              Registrar mascota perdida
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/loss/search")}
            >
              Buscar mascotas perdidas
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/shelters")}
            >
              Buscar refugios
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
          <Typography variant="body1">Aquí podrás...</Typography>
          <Divider />

          <DashboardSection
            title="Registrar Mascota"
            description="Registra tus mascotas para poder solicitar ayuda en caso pérdida."
            handleClick={handleRegister}
          />
          <Divider />

          <DashboardSection
            title="Ver Tus Mascotas"
            description="Realiza un seguimiento a tus mascotas registradas."
            handleClick={handleMyPets}
          />

          <Divider />

          <DashboardSection
            title="Ver Tus Refugios"
            description="En caso encuentres animales sin hogar o necesites que cuiden a tu mascota, puedes contactar con un refugio. Si deseas abrir uno, puedes registrarlo."
            handleClick={handleMyShelters}
          />
        </Box>
      </Box>
    )
  );
};

export default HomeUser;
