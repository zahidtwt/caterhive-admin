import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllEventMenus } from '../../services/eventMenus';
import { createNewEventService } from '../../services/eventService';
import CustomButton from '../common/CustomButton/CustomButton.component';
import Dropdown from '../common/Dropdown/Dropdown.component';
import eventServiceValidatorSchema from './eventServiceForm.validator';

const EventServiceForm = ({ setEventServices, setModal }) => {
  const [formData, setFormData] = useState({
    tier: '',
    eventMenu: '',
  });
  const [eventMenuOptions, setEventMenuOptions] = useState([]);
  const [eventMenuSearch, setEventMenuSearch] = useState('');
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

      const { error } = eventServiceValidatorSchema.validate(formData);

      if (error) {
        setErrorMessage({
          [error?.details[0]?.path[0]]: error?.message,
        });
        return;
      }

      const eventServices = await createNewEventService(formData);

      setEventServices(eventServices);

      setModal(false);
    } catch (error) {
      console.log(error);
      setServerError(JSON.stringify(error.response.data));
    }
  };

  const getEventMenus = useCallback(async () => {
    const data = await getAllEventMenus({ search: eventMenuSearch });

    setEventMenuOptions(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getEventMenus();
  }, [getEventMenus, eventMenuSearch]);

  return (
    <div className="custom">
      <form className="form" onSubmit={handleSubmit}>
        <Dropdown
          name={'tier'}
          label={'Chose a tier'}
          updateForm={updateForm}
          options={['Basic', 'Standard', 'Premium']}
        />
        <Autocomplete
          sx={{
            marginBottom: '30px',
          }}
          options={eventMenuOptions}
          onChange={(e, newValue) => {
            e.preventDefault();
            updateForm({
              eventMenu: newValue?._id,
            });
          }}
          filterSelectedOptions
          getOptionLabel={(option) => option.title || option}
          renderInput={(params) => (
            <TextField
              error={errorMessage?.dayMenu}
              {...params}
              onChange={(e) => setEventMenuSearch(e.target.value)}
              variant="outlined"
              label="Event Menu"
            />
          )}
        />

        {serverError ? <p className="error-message">{serverError}</p> : null}
        <CustomButton type="submit" theme={'contained'} label={'Submit'} />
      </form>
    </div>
  );
};

export default EventServiceForm;
