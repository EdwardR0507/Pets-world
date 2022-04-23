import { Box, Button, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerUser } from "../../features/auth/authActions";
import TextInput from "../../ui/TextInput";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data))
      .then(unwrapResult)
      .then(() => {
        navigate("/auth/login");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
        });
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "145vh",
      }}
    >
      <Typography variant="h2">Registro de Usuario</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "40%",
            height: "700px",
          }}
        >
          <TextInput
            label="Nombres"
            name="nombre"
            register={register}
            required
            pattern={{
              value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
              message: "Solo se permiten letras, espacios y acentos",
            }}
            errors={errors}
          />
          <TextInput
            label="Apellido Paterno"
            name="apellidoPaterno"
            register={register}
            required
            pattern={{
              value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
              message: "Solo se permiten letras, espacios y acentos",
            }}
            errors={errors}
          />
          <TextInput
            label="Apellido Materno"
            name="apellidoMaterno"
            register={register}
            required
            pattern={{
              value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
              message: "Solo se permiten letras, espacios y acentos",
            }}
            errors={errors}
          />
          <TextInput
            label="DNI"
            name="dni"
            register={register}
            required
            pattern={{
              value: /^[0-9]{8}$/,
              message: "Ingrese un dni válido",
            }}
            errors={errors}
          />
          <TextInput
            label="Dirección"
            name="direccion"
            register={register}
            required
            pattern={{
              value: /^[a-zA-ZÀ-ÿ\s\d-]{1,40}$/,
              message: "No se permiten caracteres especiales",
            }}
            errors={errors}
          />
          <TextInput
            label="Teléfono"
            name="telefono"
            register={register}
            required
            pattern={{
              value: /^[0-9]{9}$/,
              message: "Ingrese un teléfono válido",
            }}
            errors={errors}
          />
          <TextInput
            label="Usuario"
            name="nombreUsuario"
            register={register}
            required
            pattern={{
              value: /^[a-zA-Z0-9_-]{4,16}$/,
              message:
                "El usuario debe tener al menos 4 caracteres y puede contener letras y números",
            }}
            errors={errors}
          />
          <TextInput
            label="Email"
            name="email"
            register={register}
            required
            pattern={{
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Ingrese un email válido",
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
            type="submit"
            disabled={loading}
            sx={{
              margin: "1rem 0",
              borderRadius: "0.5rem",
              border: "none",
            }}
          >
            Registrarse
          </Button>
        </form>
        <Box
          sx={{ width: "500px", height: "500px", backgroundColor: "green" }}
        ></Box>
      </Box>
    </Box>
  );
};

export default Register;
