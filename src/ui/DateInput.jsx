import { FormControl, TextField } from "@mui/material";

const DateInput = ({ name = "date", label, register, errors, ...rest }) => {
  return (
    <FormControl sx={{ width: "20rem", margin: "5px 0" }}>
      <TextField
        name={name}
        label={label}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          max: "2022-04-25",
        }}
        required
        {...register(name, {
          required: true,
        })}
        error={!!errors?.[name]}
        helperText={errors?.[name]?.message}
        {...rest}
      />
    </FormControl>
  );
};

export default DateInput;
