import { Button } from '@mui/material';
import React from 'react';
import './CustomButton.styles.scss';

const CustomButton = ({ label, theme, handleClick, ...otherProps }) => {
  return (
    <Button
      variant={theme}
      sx={{ padding: '13px' }}
      onClick={handleClick}
      {...otherProps}
    >
      Submit
    </Button>
  );
};

export default CustomButton;
