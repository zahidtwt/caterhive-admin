import { Button, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import DayMenuCard from '../../components/DayMenuCard/DayMenuCard.component';
import CustomModal from '../../components/Modal/Modal.component';
import RoutineMenuForm from '../../components/RoutineMenuForm/RoutineMenuForm.component';
import { getAllRoutineMenus } from '../../services/routineMenu';

const RoutineMenuPage = () => {
  const [routineMenus, setRoutineMenus] = useState([]);
  const [modal, setModal] = useState(false);

  const getMenus = useCallback(async () => {
    const data = await getAllRoutineMenus({});

    setRoutineMenus(data);
  }, []);

  useEffect(() => {
    getMenus();
  }, [getMenus]);

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
        Add/Change routine menu
      </Button>
      <CustomModal open={modal} setOpen={setModal}>
        <RoutineMenuForm
          setRoutineMenus={setRoutineMenus}
          setModal={setModal}
        />
      </CustomModal>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {routineMenus
          ? Object.keys(routineMenus).map((day) => (
              <DayMenuCard dayMenu={routineMenus[day]} dayName={day} />
            ))
          : null}
        <Grid item xs={2} sm={4} md={4}></Grid>
      </Grid>{' '}
    </div>
  );
};

export default RoutineMenuPage;
