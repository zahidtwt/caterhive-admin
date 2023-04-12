import { Button } from '@mui/material';
import React, { useState } from 'react';
import './FileInput.styles.scss';

const FileInput = ({ label, handleChange, error, ...otherProps }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => handleChange(fileReader.result);
  };
  return (
    <div className="file-input">
      <Button
        fullWidth
        variant="outlined"
        sx={{
          padding: '13px',
        }}
        component="label"
        color={error ? 'error' : 'primary'}
      >
        {fileName || label}
        <input type="file" hidden onChange={handleFileChange} {...otherProps} />
      </Button>
      {error ? (
        <p
          class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root"
          id=":r3:-helper-text"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default FileInput;
