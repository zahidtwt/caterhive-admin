import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import EventServiceForm from "../../components/EventServiceForm/EventServiceForm.component";
import CustomModal from "../../components/Modal/Modal.component";
import { getAllEventServices } from "../../services/eventService";
import EventMenuCard from "./../../components/EventMenuCard/EventMenuCard.component";

const EventServicePage = () => {
  const [eventServices, setEventServices] = useState(null);
  const [modal, setModal] = useState(false);

  const getMenus = useCallback(async () => {
    const data = await getAllEventServices({});

    console.log(data);
    setEventServices(data);
  }, []);

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  if (!eventServices) return;

  return (
    <div>
      <Typography gutterBottom variant="h3" component="div">
        Event Service
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
        Add/Change Event Services
      </Button>
      <CustomModal open={modal} setOpen={setModal}>
        <EventServiceForm
          setEventServices={setEventServices}
          setModal={setModal}
        />
      </CustomModal>
      <div className="grid grid-1x2">
        {eventServices
          ? Object.keys(eventServices).map((tier) => (
              <div style={{ marginBottom: "2rem" }}>
                <Typography
                  variant="h2"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {tier}
                </Typography>
                <EventMenuCard eventMenu={eventServices[tier]} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default EventServicePage;
