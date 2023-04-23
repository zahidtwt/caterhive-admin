import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const FoodItemCard = ({ foodItem }) => {
  const { title, imgUrl, description, price, category } = foodItem;
  return (
    <Card sx={{ width: 250, height: 400 }}>
      <CardMedia sx={{ height: 220 }} image={imgUrl} title={title} />
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
          sx={{
            marginBottom: '1rem',
          }}
          component="div"
        >
          {category.name}
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

export default FoodItemCard;
