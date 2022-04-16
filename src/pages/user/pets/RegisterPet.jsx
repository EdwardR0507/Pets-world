import { Box, MenuItem, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import DateInput from "../../../ui/DateInput";
import SelectInput from "../../../ui/SelectInput";
import TextInput from "../../../ui/TextInput";
const RegisterPet = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
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
            register={register}
            fullWidth
            required
            errors={errors}
          >
            <MenuItem value="perro">Perro</MenuItem>
          </SelectInput>
          <SelectInput
            name="raza"
            label="Raza"
            register={register}
            select
            fullWidth
            required
            errors={errors}
          >
            <MenuItem value="doberman">Doberman</MenuItem>
            <MenuItem value="pitbull">Pitbull</MenuItem>
            <MenuItem value="labrador">Labrador</MenuItem>
            <MenuItem value="bulldog">Bulldog</MenuItem>
            <MenuItem value="pastor">Pastor</MenuItem>
            <MenuItem value="otro">Otro</MenuItem>
          </SelectInput>

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
            fullWidth
            required
            errors={errors}
          >
            <MenuItem value="pequeño">Pequeño</MenuItem>
            <MenuItem value="mediano">Mediano</MenuItem>
            <MenuItem value="grande">Grande</MenuItem>
          </SelectInput>
          <TextInput
            label="Características"
            name="caracteristicas"
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
            fullWidth
            required
            errors={errors}
          >
            <MenuItem value="Macho">Macho</MenuItem>
            <MenuItem value="Hembra">Hembra</MenuItem>
          </SelectInput>
          <DateInput
            name="fechaNacimiento"
            register={register}
            label="Fecha de Nacimiento"
          />

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
