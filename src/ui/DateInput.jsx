import { FormControl, TextField } from "@mui/material";

const DateInput = ({ name, label, register, errors }) => {
  return (
    <FormControl sx={{ width: "20rem", margin: "5px 0" }}>
      <TextField
        name={name}
        label={label}
        type="date"
        // sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        required
        {...register(name, {
          required: true,
        })}
        error={!!errors?.[name]}
        helperText={errors?.[name]?.message}
      />
    </FormControl>
  );
};

export default DateInput;
