import { useRef, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerUser } from "../../features/auth/authSlice";
import TextInput from "../../ui/TextInput";
import { toBase64 } from "../../helpers/convertToB64";

const Register = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [visible, setVisibility] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const inputRef = useRef();

  const conversion = async () => {
    const file = inputRef.current.files[0];
    if (file !== undefined) {
      const base64 = await toBase64(file);
      return base64;
    }
  };

  const processImage = (event) => {
    setVisibility(true);
    if (event.target.files[0]) {
      setFileUrl(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onSubmit = async (data) => {
    const encoded = await conversion();
    const dataToSend = {
      ...data,
      encoded,
    };
    dispatch(registerUser(dataToSend))
      .then(unwrapResult)
      .then((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "Usuario registrado",
            text: "El usuario ha sido registrado correctamente",
          }).then(() => navigate("/auth/login"));
        }
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
        height: {
          xs: "100%",
          md: "130vh",
        },
      }}
    >
      <Typography variant="h2">Registro de Usuario</Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
          justifyContent="space-evenly"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
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
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: {
                xs: "100%",
                md: "500px",
              },
            }}
          >
            <IconButton
              aria-label="add"
              component="label"
              sx={{
                position: "absolute",
                left: "0",
                top: "0",
                marginLeft: {
                  xs: "0",
                  md: `${!visible && "100px"}`,
                },
              }}
            >
              <AddCircleIcon fontSize="large" />
              {!visible ? "Añadir imagen" : "Elegir otra imagen"}
              <input
                type="file"
                required
                hidden
                onChange={processImage}
                ref={inputRef}
              />
            </IconButton>
            <Box
              sx={{
                marginTop: {
                  xs: "4rem",
                  md: "0",
                },
                width: {
                  xs: "100%",
                  md: "300px",
                },
              }}
            >
              {visible && (
                <img
                  src={fileUrl}
                  alt={"pet"}
                  style={{
                    maxWidth: "100%",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{
            marginTop: {
              xs: "4rem",
              md: "2rem",
            },
            marginBottom: {
              xs: "2rem",
              md: "0",
            },
            borderRadius: "0.5rem",
            border: "none",
          }}
        >
          Registrar
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
