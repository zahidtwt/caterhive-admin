import { Button, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import DayMenuForm from "../../components/DayMenuForm/DayMenuForm.component";
import CustomModal from "../../components/Modal/Modal.component";
import { deleteDayMenuById, getAllDayMenus } from "../../services/dayMenu";
import DayMenuCard from "./../../components/DayMenuCard/DayMenuCard.component";

const DayMenuPage = () => {
  const [dayMenus, setDayMenus] = useState([]);
  const [modal, setModal] = useState(false);

  const getDayMenus = useCallback(async () => {
    const data = await getAllDayMenus({});

    setDayMenus(data);
  }, []);

  useEffect(() => {
    getDayMenus();
  }, [getDayMenus]);

  async function deleteDayMenu(id) {
    try {
      await deleteDayMenuById(id);

      const data = await getAllDayMenus({});
      setDayMenus(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Typography gutterBottom variant="h3" component="div">
        Day Menus
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
        <DayMenuForm setDayMenus={setDayMenus} setModal={setModal} />
      </CustomModal>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {dayMenus.map((dayMenu) => {
          return (
            dayMenu && (
              <DayMenuCard
                key={dayMenu._id}
                dayMenu={dayMenu}
                deleteDayMenu={deleteDayMenu}
              />
            )
          );
        })}
      </Grid>{" "}
    </div>
  );
};

export default DayMenuPage;
