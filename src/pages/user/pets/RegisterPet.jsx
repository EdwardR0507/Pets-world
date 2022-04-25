import { useEffect, useRef, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import DateInput from "../../../ui/DateInput";
import SelectInput from "../../../ui/SelectInput";
import TextInput from "../../../ui/TextInput";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getOwnerById } from "../../../features/owner/ownerSlice";
import { registerPet } from "../../../features/user/userSlice";
import { convertDate } from "../../../helpers/convertDate";
import { toBase64 } from "../../../helpers/convertToB64";
import { useNavigate } from "react-router-dom";

const RegisterPet = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [visible, setVisibility] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { owner } = useSelector((state) => state.owner);
  const { loading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    watch,
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

  useEffect(() => {
    if (Object.keys(owner).length === 0) {
      dispatch(getOwnerById());
    }
  }, [dispatch, owner]);

  // Mock data
  const otherRace = watch("raza") === "OTRA";
  const especies = [
    {
      value: "PERRO",
      label: "Perro",
    },
    {
      value: "GATO",
      label: "Gato",
    },
    {
      value: "HAMSTERS",
      label: "Hamster",
    },
  ];

  const tamaños = [
    {
      value: "PEQUEÑO",
      label: "Pequeño",
    },
    {
      value: "MEDIANO",
      label: "Mediano",
    },
    {
      value: "GRANDE",
      label: "Grande",
    },
  ];

  const generos = [
    {
      value: "MACHO",
      label: "Macho",
    },
    {
      value: "HEMBRA",
      label: "Hembra",
    },
  ];

  const onSubmit = async (data) => {
    let encoded = await conversion();
    const fechaNacimiento = convertDate(data);
    otherRace && delete data.raza;
    const newData = {
      ...data,
      fechaNacimiento,
      encoded,
    };
    dispatch(registerPet(newData))
      .then(unwrapResult)
      .then((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "Mascota registrada",
            text: "La mascota ha sido registrada correctamente",
          }).then(() => navigate("/user/home"));
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
          md: "130vh",
        },
      }}
    >
      <Typography variant="h2">Registro de Mascotas</Typography>

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
            <SelectInput
              name="especie"
              label="Especie"
              options={especies}
              register={register}
              fullWidth
              required
              errors={errors}
            />
            <SelectInput
              name="raza"
              label="Raza"
              register={register}
              filterValue={watch("especie", false)}
              options={[]}
              select
              fullWidth
              required
              disabled={otherRace}
              errors={errors}
            />

            {otherRace && (
              <TextInput
                label="Ingrese la Raza"
                name="razaEspecifica"
                register={register}
                required
                pattern={{
                  value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
                  message: "Solo se permiten letras, espacios y acentos",
                }}
                errors={errors}
              />
            )}

            <TextInput
              label="Color"
              name="color"
              register={register}
              required
              pattern={{
                value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
                message: "Solo se permiten letras, espacios y acentos",
              }}
              errors={errors}
            />
            <SelectInput
              name="tamaño"
              label="Tamaño"
              register={register}
              options={tamaños}
              fullWidth
              required
              errors={errors}
            />
            <TextInput
              label="Características"
              name="caracteristica"
              register={register}
              multiline
              rows={4}
              fullWidth
              required
              pattern={{
                value: /^[a-zA-ZÀ-ÿ\d\s.,:()]{1,40}$/,
                message: "Solo se permiten letras, espacios y acentos",
              }}
              errors={errors}
            />
            <TextInput
              label="Nombre"
              name="nombre"
              register={register}
              required
              pattern={{
                value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
                message: "Solo se permiten letras, espacios y acentos",
              }}
              errors={errors}
            />
            <SelectInput
              name="genero"
              label="Género"
              register={register}
              options={generos}
              fullWidth
              required
              errors={errors}
            />
            <DateInput register={register} label="Fecha de Nacimiento" />
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
                  md: "100px",
                },
              }}
            >
              <AddCircleIcon fontSize="large" />
              {!visible ? "Añadir imagen" : "Elegir otra imagen"}
              <input
                type="file"
                hidden
                required
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

export default RegisterPet;
