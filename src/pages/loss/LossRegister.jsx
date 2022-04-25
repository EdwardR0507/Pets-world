import { useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextInput from "../../ui/TextInput";
import SelectInput from "../../ui/SelectInput";
import { registerLoss } from "../../features/loss/lossSlice";
import DateInput from "../../ui/DateInput";
import { convertDate } from "../../helpers/convertDate";
import { getPetsByOwnerId } from "../../features/user/userSlice";
import { toBase64 } from "../../helpers/convertToB64";
import { useNavigate } from "react-router-dom";

const LossRegister = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [visible, setVisibility] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.shelter);
  const { pets } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getPetsByOwnerId());
  }, [dispatch]);

  const petsArray = pets.map((pet) => {
    return {
      label: `${pet.nombre} - ${pet.raza || pet.razaEspecifica}`,
      value: pet.id,
    };
  });

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
    const fechaPerdida = convertDate(data);
    const newData = {
      ...data,
      fechaPerdida,
      encoded,
    };
    dispatch(registerLoss(newData))
      .then(unwrapResult)
      .then((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "¡Registro exitoso!",
            text: "El registro de la pérdida se ha realizado con éxito. Deseamos de todo corazón que encuentres pronto a tu mascota.",
          }).then(() => {
            navigate("/user/home");
          });
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
    pets.length > 0 && (
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
        <Typography variant="h2">Registrar Mascota Perdida</Typography>
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
    )
  );
};

export default LossRegister;
