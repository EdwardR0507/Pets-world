import { FormControl, TextField } from "@mui/material";

const TextInput = ({
  label,
  name,
  register,
  pattern,
  variant = "outlined",
  errors,
  type = "text",
  ...rest
}) => {
  return (
    <FormControl sx={{ width: "20rem", margin: "5px 0" }}>
      <TextField
        label={label}
        variant={variant}
        name={name}
        type={type}
        {...register(name, {
          required: true,
          pattern: {
            value: pattern.value,
            message: pattern.message,
          },
        })}
        error={!!errors?.[name]}
        helperText={errors?.[name]?.message}
      />
    </FormControl>
  );
};

export default TextInput;
