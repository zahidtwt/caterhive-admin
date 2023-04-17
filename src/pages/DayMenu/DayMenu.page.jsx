import { Button, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import DayMenuForm from '../../components/DayMenuForm/DayMenuForm.component';
import CustomModal from '../../components/Modal/Modal.component';
import { getAllDayMenus } from '../../services/dayMenu';

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

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          display: 'block',
          marginBottom: '2rem',
          marginLeft: 'auto',
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
        {dayMenus.map((menu) => (
          <Grid item xs={2} sm={4} md={4} key={menu._id}>
            <h1>{menu.price}</h1>
          </Grid>
        ))}
      </Grid>{' '}
    </div>
  );
};

export default DayMenuPage;
