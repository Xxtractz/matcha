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
      <TextField className={className} type={type} name={name} disabled />
    </div>
  );
};

// Selection Options
export const selecFormInput = (
  div_className,
  inputLabel,
  name,
  onChange,
  options
) => {
  return (
    <div className={div_className}>
      <InputLabel>{inputLabel}</InputLabel>
      <Select native name={name} onChange={onChange} required>
        {options.map((optionsValue, index) => {
          return <option key={index}>{optionsValue}</option>;
        })}
      </Select>
    </div>
  );
};

// TextArea Input
export const textAreaFormInput = (
  divClassName,
  inputLabel,
  textAreaClassName,
  textAreaBackground,
  name,
  onChange
) => {
  return (
    <div className={divClassName}>
      <InputLabel>{inputLabel}</InputLabel>
      <textarea
        className={textAreaClassName}
        style={{ background: textAreaBackground }}
        aria-label="empty textarea"
        name={name}
        onChange={onChange}
        required
        rows="10"
        minLength="20"
      ></textarea>
    </div>
  );
};
