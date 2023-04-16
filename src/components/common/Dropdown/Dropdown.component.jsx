import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

const Dropdown = ({
  width = '100%',
  options = [],
  updateForm,
  name,
  label,
}) => {
  return (
    <Autocomplete
      disablePortal
      onChange={(e, value) => updateForm({ [name]: value })}
      sx={{
        display: 'inline-block',
        margin: ' 10px 10px 30px 0',
        width,
      }}
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default Dropdown;
