import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';

const MenuCard = ({ menu }) => {
  const { title, thumbnail, price, description } = menu;

  return (
    <Card sx={{ width: 250, height: 400, margin: '1rem' }}>
      <CardMedia sx={{ height: 220 }} image={thumbnail} title={title} />
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            marginBottom: '1rem',
          }}
        >
          {price} BDT
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: 'nowrap',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
