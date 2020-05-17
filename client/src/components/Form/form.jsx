import React from "react";
import { InputLabel } from "@material-ui/core";
import { TextField, Select } from "@material-ui/core";

// Custom Form inputs using
export const CustomFormInput = (
  inputLabel,
  className,
  name,
  type,
  label,
  helperText,
  error,
  value,
  onChange,
  required,
  autoComplete
) => {
  return (
    <div>
      <InputLabel>{inputLabel}</InputLabel>
      <TextField
        className={className}
        name={name}
        type={type}
        label={label}
        helperText={helperText}
        error={error}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
};

// Disabled Form Inputs
export const disabledFormInput = (
  label,
  className,
  type,
  name,
  defaultValue
) => {
  return (
    <div className="col-6">
      <InputLabel>{label}</InputLabel>
      <TextField
        className={className}
        type={type}
        name={name}
        defaultValue={defaultValue}
        disabled
      />
    </div>
  );
};

export const selecFormInput = (
  div_className,
  inputLabel,
  name,
  defaultValue,
  onChange,
  options
) => {
  return (
    <div className={div_className}>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        native
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((optionsValue) => {
          return <option value={optionsValue}>{optionsValue}</option>;
        })}
      </Select>
    </div>
  );
};
