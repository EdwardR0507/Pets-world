import { FormControl, TextField } from "@mui/material";

const SelectInput = ({
  children,
  label,
  name,
  register,
  variant = "outlined",
  errors,
  ...rest
}) => {
  return (
    <FormControl sx={{ width: "20rem", margin: "5px 0" }}>
      <TextField
        label={label}
        variant={variant}
        name={name}
        select
        {...rest}
        {...register(name, {
          required: true,
        })}
        error={!!errors?.[name]}
        helperText={errors?.[name]?.message}
      >
        {children}
      </TextField>
    </FormControl>
  );
};

export default SelectInput;
