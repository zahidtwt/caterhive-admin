import { Button } from '@mui/material';
import React from 'react';
import './CustomButton.styles.scss';

const CustomButton = ({
  label = 'Submit',
  theme,
  handleClick,
  ...otherProps
}) => {
  return (
    <Button
      variant={theme}
      sx={{ padding: '13px', color: '#fff' }}
      onClick={handleClick}
      {...otherProps}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
