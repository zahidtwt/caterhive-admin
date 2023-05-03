import { Button, Card, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

const MenuCard = ({ menu, deleteMenu }) => {
  const { _id, title, thumbnail, price, description } = menu;

  return (
    <Card
      sx={{ width: 300, margin: "1rem", boxShadow: 1 }}
      // style={{ backgroundColor: "red" }}
    >
      <CardMedia sx={{ minHeight: 220 }} image={thumbnail} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: "nowrap",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            marginBottom: "1rem",
            marginTop: "1rem",
            color: "text.primary",
          }}
        >
          {price} BDT
        </Typography>
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
            onClick={() => deleteMenu(_id)}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
