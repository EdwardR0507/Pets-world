import { useState, useEffect } from "react";
import { FormControl, TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import  filtrarRazas  from "../helpers/filterSelect"

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
  useEffect(()=>{
    if(filterValue){
      setOptionsState(filtrarRazas(filterValue));
    }
  },[options])

  return (
    <FormControl sx={{ width: "20rem", margin: "5px 0" }}>
      <TextField
        label={label}
        variant={variant}
        name={name}
        select
        {...rest}
        {...register(name, {
          required: true
        })}
        defaultValue=''
        error={!!errors?.[name]}
        helperText={errors?.[name]?.message}
      >
        {optionsState.map((option, i)=>
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        )}
      </TextField>
    </FormControl>
  );
};

export default SelectInput;
