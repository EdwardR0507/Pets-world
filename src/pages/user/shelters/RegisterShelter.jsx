import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../ui/TextInput";

const RegisterShelter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.shelter);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "calc(100vh - 64px)",
      }}
    >
      <Typography variant="h2">Registro de Refugio</Typography>
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
            height: "400px",
          }}
        >
          <TextInput
            label="DNI de representante"
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
            Registrar
          </Button>
        </form>
        <Box
          sx={{ width: "400px", height: "400px", backgroundColor: "green" }}
        ></Box>
      </Box>
    </Box>
  );
};

export default RegisterShelter;
