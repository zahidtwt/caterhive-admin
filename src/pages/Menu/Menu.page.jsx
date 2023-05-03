import { Button, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CustomModal from "../../components/Modal/Modal.component";
import { deleteMenuById, getAllMenus } from "../../services/menu";
import MenuCard from "./../../components/MenuCard/MenuCard.component";
import MenuForm from "./../../components/MenuForm/MenuForm.component";

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [modal, setModal] = useState(false);

  const getMenus = useCallback(async () => {
    const data = await getAllMenus({});
    setMenus(data);
  }, []);

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  async function deleteMenu(id) {
    try {
      await deleteMenuById(id);
      const data = await getAllMenus({});
      setMenus(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Typography gutterBottom variant="h3" component="div">
        Menus
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
        Add new menu
      </Button>
      <CustomModal open={modal} setOpen={setModal}>
        <MenuForm setMenus={setMenus} setModal={setModal} />
      </CustomModal>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {menus.map((menu) => (
          <Grid item xs={2} sm={4} md={4} key={menu._id}>
            <MenuCard menu={menu} deleteMenu={deleteMenu} />
          </Grid>
        ))}
      </Grid>{" "}
    </div>
  );
};

export default MenuPage;
