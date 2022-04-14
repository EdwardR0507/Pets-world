import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import TextInput from "../../ui/TextInput";
const Login = () => {
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
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)",
      }}
    >
      <Typography variant="h1">Iniciar Sesión</Typography>
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
          name="usuario"
          register={register}
          variant="outlined"
          required
          pattern={{
            value: /^[a-zA-Z0-9_-]{4,16}$/,
            message:
              "El usuario debe tener al menos 4 caracteres y puede contener letras y números",
          }}
          errors={errors}
        />
        <TextInput
          label="Contraseña"
          name="contraseña"
          register={register}
          variant="outlined"
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
