import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import weekDays from '../../data/weekDays.json';
import { getAllDayMenus } from '../../services/dayMenu';
import { createNewRoutineMenu } from '../../services/routineMenu';
import CustomButton from '../common/CustomButton/CustomButton.component';
import Dropdown from '../common/Dropdown/Dropdown.component';
import routineMenuValidatorSchema from './routineMenuForm.validator';

const RoutineMenuForm = ({ setRoutineMenus, setModal }) => {
  const [formData, setFormData] = useState({
    day: '',
    dayMenu: '',
  });
  const [dayMenuOptions, setDayMenuOptions] = useState([]);
  const [dayMenuSearch, setDayMenuSearch] = useState('');
  const [serverError, setServerError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateForm = (data) => {
    setErrorMessage(null);
    setServerError(null);
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = routineMenuValidatorSchema.validate(formData);

      if (error) {
        setErrorMessage({
          [error?.details[0]?.path[0]]: error?.message,
        });
        return;
      }

      const weekMenu = await createNewRoutineMenu(formData);

      setRoutineMenus(weekMenu);
      setModal(false);
    } catch (error) {
      console.log(error);
      setServerError(JSON.stringify(error.response.data));
    }
  };

  const getDayMenus = useCallback(async () => {
    const data = await getAllDayMenus({ search: dayMenuSearch });

    setDayMenuOptions(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDayMenus();
  }, [getDayMenus, dayMenuSearch]);

  return (
    <div className="custom">
      <form className="form" onSubmit={handleSubmit}>
        <Dropdown
          name={'day'}
          label={'Chose a day'}
          updateForm={updateForm}
          options={weekDays}
        />
        <Autocomplete
          sx={{
            marginBottom: '30px',
          }}
          options={dayMenuOptions}
          onChange={(e, newValue) => {
            e.preventDefault();
            updateForm({
              dayMenu: newValue?._id,
            });
          }}
          filterSelectedOptions
          getOptionLabel={(option) => option.title || option}
          renderInput={(params) => (
            <TextField
              error={errorMessage?.dayMenu}
              {...params}
              onChange={(e) => setDayMenuSearch(e.target.value)}
              variant="outlined"
              label="Menu for the day"
            />
          )}
        />

        {serverError ? <p className="error-message">{serverError}</p> : null}
        <CustomButton type="submit" theme={'contained'} label={'Submit'} />
      </form>
    </div>
  );
};

export default RoutineMenuForm;
