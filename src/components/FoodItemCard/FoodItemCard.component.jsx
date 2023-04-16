import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const FoodItemCard = ({ foodItem }) => {
  const { title, imgUrl, description } = foodItem;
  return (
    <Card sx={{ width: 250, height: 400 }}>
      <CardMedia sx={{ height: 220 }} image={imgUrl} title={title} />
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

export default FoodItemCard;
