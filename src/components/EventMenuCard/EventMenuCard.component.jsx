import Typography from '@mui/material/Typography';
import React from 'react';
import FoodItemCard from './../FoodItemCard/FoodItemCard.component';
import './EventMenuCard.styles.scss';

const EventMenuCard = ({ eventMenu }) => {
  const { title, appetizers, mainCourses, desserts, drinks } = eventMenu;

  const price = [appetizers, mainCourses, desserts, drinks].reduce(
    (acc, curr) => {
      return acc + curr.reduce((a, b) => a + b.price, 0);
    },
    0
  );
  return (
    <div className="event-menu-card">
      <Typography
        variant="h4"
        sx={{
          marginBottom: '1rem',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginBottom: '1rem',
        }}
      >
        Price: {price} Per Plate
      </Typography>

      <SectionPreview name={'appetizers'} foodItems={appetizers} />
      <SectionPreview name={'Main Course'} foodItems={mainCourses} />
      <SectionPreview name={'desserts'} foodItems={desserts} />
      <SectionPreview name={'drinks'} foodItems={drinks} />
    </div>
  );
};

export default EventMenuCard;

const SectionPreview = ({ name, foodItems = [] }) => {
  return (
    <section className="section">
      <div className="food-item-container">
        {foodItems.map((foodItem) => (
          <FoodItemCard key={foodItem._id} foodItem={foodItem} size="small" />
        ))}
      </div>
      <Typography
        sx={{ textDecoration: 'underline' }}
        variant="h5"
        textTransform={'capitalize'}
      >
        {name}
      </Typography>
    </section>
  );
};
