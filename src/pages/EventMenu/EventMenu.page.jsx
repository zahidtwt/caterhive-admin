import { Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import EventMenuCard from '../../components/EventMenuCard/EventMenuCard.component';
import EventMenuForm from '../../components/EventMenuForm/EventMenuForm.component';
import CustomModal from '../../components/Modal/Modal.component';
import { getAllEventMenus } from '../../services/eventMenus';

const EventMenuPage = () => {
  const [eventMenus, setEventMenus] = useState([]);
  const [modal, setModal] = useState(false);

  const getEventMenus = useCallback(async () => {
    const allEventMenus = await getAllEventMenus({});

    console.log(allEventMenus);
    setEventMenus(allEventMenus);
  }, []);

  useEffect(() => {
    getEventMenus();
  }, [getEventMenus]);

  return (
    <div className="container">
      <Button
        variant="contained"
        sx={{
          display: 'block',
          marginBottom: '2rem',
          marginLeft: 'auto',
        }}
        onClick={() => setModal(true)}
      >
        Add event new menu
      </Button>
      <CustomModal open={modal} setOpen={setModal}>
        <EventMenuForm setModal={setModal} setEventMenus={setEventMenus} />
      </CustomModal>
      <div className="grid grid-1x2">
        {eventMenus.map((eventMenu) => (
          <EventMenuCard key={eventMenu._id} eventMenu={eventMenu} />
        ))}
      </div>
    </div>
  );
};

export default EventMenuPage;
