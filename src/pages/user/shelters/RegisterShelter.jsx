import { useRef, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Swal from "sweetalert2";
import { registerShelter } from "../../../features/user/userSlice";
import { toBase64 } from "../../../helpers/convertToB64";
import TextInput from "../../../ui/TextInput";

const RegisterShelter = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [visible, setVisibility] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.shelter);
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
    let encoded = await conversion();
    const dataToSend = {
      ...data,
      numeroAsociados: parseInt(data.numeroAsociados, 10),
      encoded,
    };

    dispatch(registerShelter(dataToSend))
      .then(unwrapResult)
      .then((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "Refugio registrado",
            text: "El refugio ha sido registrado correctamente",
          }).then(() => {
            navigate("/user/home");
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
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
          md: "110vh",
        },
      }}
    >
      <Typography variant="h2">Registro de Refugio</Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-evenly",
          }}
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
              label="Nombre del Refugio"
              name="nombre"
              register={register}
              required
              pattern={{
                value: /^[a-zA-ZÀ-ÿ\d\s.,:()]{1,40}$/,
                message: "Solo se permiten letras, espacios y acentos",
              }}
              errors={errors}
            />
            <TextInput
              label="DNI de representante"
              name="dniRepresentante"
              register={register}
              required
              pattern={{
                value: /^[0-9]{8}$/,
                message: "Ingrese un dni válido",
              }}
              errors={errors}
            />
            <TextInput
              label="Número de asociados"
              name="numeroAsociados"
              register={register}
              type="number"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                min: 0,
                max: 99999,
              }}
              required
              pattern={{
                value: /^[0-9]*$/,
                message: "Ingrese un Número",
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
              label="Distrito"
              name="distrito"
              register={register}
              required
              pattern={{
                value: /^[a-zA-ZÀ-ÿ\s\d-]{1,40}$/,
                message: "No se permiten caracteres especiales",
              }}
              errors={errors}
            />
            <TextInput
              label="Teléfono de contacto"
              name="numeroContacto"
              register={register}
              required
              pattern={{
                value: /^[0-9]{9}$/,
                message: "Ingrese un teléfono válido",
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
            width: {
              xs: "100%",
              md: "20%",
            },
          }}
        >
          Registrar
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterShelter;
