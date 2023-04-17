import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';

const MenuCard = ({ menu }) => {
  const { title, thumbnail, description } = menu;

  return (
    <Card sx={{ width: 250, height: 400, margin: '1rem' }}>
      <CardMedia sx={{ height: 220 }} image={thumbnail} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
