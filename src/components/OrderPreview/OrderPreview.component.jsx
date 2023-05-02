import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import io from "socket.io-client";
import MenuCard from "../MenuCard/MenuCard.component";

const OrderPreview = ({ order, handleUpdate }) => {
  if (!order) return;
  const {
    _id,
    customer,
    orderedProducts,
    orderValue,
    orderStatus,
    shippingAddress,
  } = order;

  return (
    <div className="modal-content order-preview">
      <div
        style={{
          margin: "1rem 0",
          textAlign: "end",
        }}
      >
        {orderStatus === "processing" ? (
          <Button
            onClick={() => handleUpdate(_id, "on the way")}
            variant="contained"
          >
            On the way
          </Button>
        ) : null}
        {orderStatus === "on the way" ? (
          <Button
            onClick={() => handleUpdate(_id, "delivered")}
            variant="contained"
          >
            Delivered
          </Button>
        ) : null}
      </div>
      <div>
        <Typography
          sx={{ textTransform: "capitalize" }}
          variant="subtitle1"
          gutterBottom
        >
          Customer Name : {customer.fullName}
        </Typography>
        <Typography
          sx={{ textTransform: "capitalize" }}
          variant="subtitle1"
          gutterBottom
        >
          Order Value : {orderValue}
        </Typography>
        <Typography
          sx={{ textTransform: "capitalize" }}
          variant="subtitle1"
          gutterBottom
        >
          Status : {orderStatus}
        </Typography>
        <Typography
          sx={{ textTransform: "capitalize" }}
          variant="subtitle1"
          gutterBottom
        >
          Shipping Address : {shippingAddress}
        </Typography>
      </div>
      <div>
        <Grid sx={{ flexGrow: 1, margin: "2rem auto" }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              {orderedProducts.map((item) => (
                <Grid key={item.menu._id} item>
                  <MenuCard menu={item.menu} />
                  <Typography variant="subtitle1" align="center" gutterBottom>
                    Quantity : {item.quantity}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OrderPreview;
