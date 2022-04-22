import { useState, useEffect } from "react";
import { FormControl, TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import filterRaces from "../helpers/filterSelect";

const SelectInput = ({
  label,
  name,
  filterValue,
  options,
  register,
  variant = "outlined",
  errors,
  ...rest
}) => {
  const [optionsState, setOptionsState] = useState(options);

  useEffect(() => {
    if (filterValue) {
      setOptionsState(filterRaces(filterValue));
    }
  }, [options, filterValue]);

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
        defaultValue=""
        error={!!errors?.[name]}
        helperText={errors?.[name]?.message}
      >
        {optionsState.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

export default SelectInput;
