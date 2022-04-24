import { Box, Button, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import TextInput from "../../ui/TextInput";
import SelectInput from "../../ui/SelectInput";
import { registerLoss } from "../../features/loss/lossSlice";
import DateInput from "../../ui/DateInput";
import { convertDate } from "../../helpers/convertDate";
import { getPetsByOwnerId } from "../../features/user/userSlice";
import { useEffect } from "react";

const LossRegister = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.shelter);
  const { pets } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getPetsByOwnerId());
  }, [dispatch]);

  const petsArray = pets.map((pet) => {
    return {
      label: `${pet.nombre} - ${pet.raza}`,
      value: pet.id,
    };
  });

  const onSubmit = (data) => {
    const fechaPerdida = convertDate(data);
    const newData = {
      ...data,
      fechaPerdida,
    };
    dispatch(registerLoss(newData))
      .then(unwrapResult)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "El registro de la pérdida se ha realizado con éxito. Deseamos de todo corazón que encuentres pronto a tu mascota.",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
        });
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    pets.length > 0 && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "130vh",
        }}
      >
        <Typography variant="h2">Registrar Pérdida</Typography>
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
              name="mascotaId"
              label="Mascota"
              options={petsArray}
              register={register}
              fullWidth
              required
              errors={errors}
            />

            <DateInput register={register} label="Fecha de Pérdida" />
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
              label="Dirección de pérdida"
              name="direccion"
              register={register}
              required
              pattern={{
                value: /^[a-zA-ZÀ-ÿ\s\d,-.:()]{1,40}$/,
                message: "No se permiten caracteres especiales",
              }}
              errors={errors}
            />
            <TextInput
              label="Teléfono de contacto"
              name="telefonoA"
              register={register}
              required
              pattern={{
                value: /^[0-9]{9}$/,
                message: "Ingrese un teléfono válido",
              }}
              errors={errors}
            />
            <TextInput
              label="Teléfono de respaldo"
              name="telefonoB"
              register={register}
              required
              pattern={{
                value: /^[0-9]{9}$/,
                message: "Ingrese un teléfono válido",
              }}
              errors={errors}
            />
            <TextInput
              label="Mensaje"
              name="mensaje"
              register={register}
              multiline
              rows={4}
              fullWidth
              required
              pattern={{
                value: /^[a-zA-ZÀ-ÿ\d\s.,:()]{1,500}$/,
                message: "Solo se permiten letras, espacios y acentos",
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
              Registrar Pérdida
            </Button>
          </form>
          <Box
            sx={{ width: "500px", height: "500px", backgroundColor: "green" }}
          ></Box>
        </Box>
      </Box>
    )
  );
};

export default LossRegister;
