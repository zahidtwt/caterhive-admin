import React from "react";
import MenuCard from "./../MenuCard/MenuCard.component";
import "./DayMenuCard.styles.scss";
import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuSmallCard from "../MenuCard/MenuSmallCard";

const DayMenuCard = ({ dayMenu, dayName, deleteDayMenu }) => {
  const { _id, price, menus = [], title = "Day Menu" } = dayMenu;

  return (
    <div className="day-menu-card">
      {dayName ? <h2>{dayName}</h2> : null}
      <div className="menu-container">
        {menus.map((menu) => (
          <MenuSmallCard key={menu._id} menu={menu} />
        ))}
      </div>
      <div className="content">
        <p>{title}</p>
        <p>Price: {price}</p>
      </div>
      <Stack direction="row" spacing={2}>
        {/* <Button
          variant="contained"
          startIcon={<EditIcon />}
          color="info"
          size="small"
        >
          Edit
        </Button> */}
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          color="error"
          size="small"
          onClick={() => deleteDayMenu(_id)}
        >
          Delete
        </Button>
      </Stack>
    </div>
  );
};

export default DayMenuCard;
