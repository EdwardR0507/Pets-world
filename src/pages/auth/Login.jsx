import { Box, Button, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../../features/auth/authSlice";
import TextInput from "../../ui/TextInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .then(unwrapResult)
      .then(() => {
        navigate("/user/home");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
        });
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)",
      }}
    >
      <Typography variant="h2">Iniciar Sesión</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "250px",
          height: "250px",
        }}
      >
        <TextInput
          label="Usuario"
          name="nombreUsuario"
          register={register}
          required
          pattern={{
            value: /^[a-zA-Z0-9._-]{4,16}$/,
            message:
              "El usuario debe tener al menos 4 caracteres y puede contener letras y números",
          }}
          errors={errors}
        />
        <TextInput
          label="Contraseña"
          name="password"
          register={register}
          type="password"
          required
          pattern={{
            value:
              /^(?=.*[A-Z])(?=.*[0-9]{2,})(?=.*[#$%&?]{2,})(?=.*[a-z]).{8,}$/,
            message:
              "La contraseña debe tener al menos 8 caracteres, 1 letra mayúscula, 2 números y 2 caracteres especiales(#$%&?)",
          }}
          errors={errors}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          type="submit"
          sx={{
            margin: "1rem 0",
            borderRadius: "0.5rem",
            border: "none",
          }}
        >
          Iniciar Sesión
        </Button>
      </form>
    </Box>
  );
};

export default Login;
