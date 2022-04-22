import { unwrapResult } from "@reduxjs/toolkit";
import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { registerPet } from "../../../features/pet/petSlice";
import DateInput from "../../../ui/DateInput";
import SelectInput from "../../../ui/SelectInput";
import TextInput from "../../../ui/TextInput";
import { useEffect } from "react";
import { getOwnerById } from "../../../features/owner/ownerSlice";
import { convertDate } from "../../../helpers/convertDate";

const RegisterPet = () => {
  const dispatch = useDispatch();
  const { owner } = useSelector((state) => state.owner);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (Object.keys(owner).length === 0) {
      dispatch(getOwnerById());
    }
  }, [dispatch]);

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
      value: "HAMSTER",
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

  const onSubmit = (data) => {
    const fechaNacimiento = convertDate(data);
    otherRace && delete data.raza;
    const newData = {
      ...data,
      fechaNacimiento,
    };
    dispatch(registerPet(newData))
      .then(unwrapResult)
      .then((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "Mascota registrada",
            text: "La mascota ha sido registrada correctamente",
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
        height: "145vh",
      }}
    >
      <Typography variant="h2">Registro de Mascotas</Typography>
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
              value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
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

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={false}
            sx={{
              margin: "1rem 0",
              borderRadius: "0.5rem",
              border: "none",
            }}
          >
            Registrar
          </Button>
        </form>
        <Box
          sx={{ width: "500px", height: "500px", backgroundColor: "green" }}
        ></Box>
      </Box>
    </Box>
  );
};

export default RegisterPet;
