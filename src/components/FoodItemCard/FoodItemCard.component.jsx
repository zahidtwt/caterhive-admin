import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const FoodItemCard = ({ foodItem, size = 'large' }) => {
  const { title, imgUrl, description, price, category } = foodItem;

  const sizes = {
    large: {
      cardSize: { width: 250, height: 400 },
      imgSize: { height: 220 },
      margin: '1rem',
    },
    small: {
      cardSize: { width: 170, height: 250 },
      imgSize: { height: 120 },
      margin: '0.5rem',
    },
  };
  return (
    <Card sx={sizes[size].cardSize}>
      <CardMedia sx={sizes[size].imgSize} image={imgUrl} title={title} />
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            marginBottom: sizes[size].margin,
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
            marginBottom: sizes[size].margin,
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
