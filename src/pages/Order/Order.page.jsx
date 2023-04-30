import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment/moment";
import React, { useCallback, useEffect, useState } from "react";
import { getOwnOrder, updateOrderById } from "../../services/order";
import CustomModal from "./../../components/Modal/Modal.component";
import OrderPreview from "./../../components/OrderPreview/OrderPreview.component";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [modal, setModal] = useState(false);

  const getOrders = useCallback(async () => {
    const orders = await getOwnOrder();

    setOrders(orders);
  }, []);

  const handleUpdate = useCallback(async (id, creds) => {
    const order = await updateOrderById(id, { orderStatus: creds });

    setOrder(order);
    setOrders((orders) =>
      orders.map((ord) => (ord._id === order._id ? order : ord))
    );
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div>
      <h1>Orders</h1>

      <CustomModal open={modal} setOpen={setModal}>
        <OrderPreview order={order} handleUpdate={handleUpdate} />
      </CustomModal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell align="center">Order Value</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Order Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const { customer, orderValue, orderedAt, orderStatus } = order;
              return (
                <TableRow
                  onClick={() => {
                    setModal(true);
                    setOrder(order);
                  }}
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {customer.fullName}
                  </TableCell>
                  <TableCell align="center">{orderValue}</TableCell>
                  <TableCell
                    sx={{ textTransform: "capitalize" }}
                    align="center"
                  >
                    {orderStatus}
                  </TableCell>
                  <TableCell
                    sx={{ textTransform: "capitalize" }}
                    align="center"
                  >
                    {moment(orderedAt).format("lll")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderPage;
