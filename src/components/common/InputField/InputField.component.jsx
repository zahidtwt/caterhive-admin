import { TextField } from '@mui/material';
import React from 'react';

const InputField = ({
  label,
  handleChange,
  element = 'text',
  error,
  ...otherProps
}) => {
  return (
    <TextField
      sx={{ margin: '0 0 30px ', textTransform: 'capitalize' }}
      onChange={handleChange}
      fullWidth
      margin="normal"
      label={label}
      variant="outlined"
      error={error ? true : false}
      helperText={error}
      {...otherProps}
    />
  );
};

export default InputField;
