import { Button, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import FoodItemCard from "../../components/FoodItemCard/FoodItemCard.component";
import CustomModal from "../../components/Modal/Modal.component";
import { getAllFoodItems } from "../../services/foodItems";
import FoodItemForm from "./../../components/FoodItemForm/FoodItemForm.component";

const FoodItemsPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [modal, setModal] = useState(false);

  const getFoodItems = useCallback(async () => {
    const data = await getAllFoodItems({});

    setFoodItems(data);
  }, []);

  useEffect(() => {
    getFoodItems();
  }, [getFoodItems]);
  return (
    <div>
      <Typography gutterBottom variant="h3" component="div">
        Food Items
      </Typography>
      <Button
        variant="contained"
        sx={{
          display: "block",
          marginBottom: "2rem",
          marginLeft: "auto",
        }}
        onClick={() => setModal(true)}
      >
        Add new Food Item
      </Button>
      <CustomModal open={modal} setOpen={setModal}>
        <FoodItemForm setFoodItems={setFoodItems} setModal={setModal} />
      </CustomModal>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {foodItems.map((foodItem) => (
          <Grid item xs={2} sm={4} md={4} key={foodItem._id}>
            <FoodItemCard foodItem={foodItem} />
          </Grid>
        ))}
      </Grid>{" "}
    </div>
  );
};

export default FoodItemsPage;
