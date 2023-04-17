import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { createNewDayMenu } from '../../services/dayMenu';
import { getAllMenus } from '../../services/menu';
import CustomButton from '../common/CustomButton/CustomButton.component';
import InputField from '../common/InputField/InputField.component';
import dayMenuValidator from './dayMenuForm.validator';

const DayMenuForm = ({ setDayMenus, setModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    menus: [],
  });
  const [serverError, setServerError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);
  const [menuSearch, setMenuSearch] = useState('');

  const handleChange = (e) => {
    setServerError(null);
    setErrorMessage(null);
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = dayMenuValidator.validate(formData);

      if (error) {
        setErrorMessage({
          [error?.details[0]?.path[0]]: error?.message,
        });
        return;
      }

      const newDayMenu = await createNewDayMenu(formData);

      setDayMenus((dayMenus) => [...dayMenus, newDayMenu]);

      setModal(false);
    } catch (error) {
      setServerError(error.response.data);
    }
  };

  const getMenus = useCallback(async () => {
    const menus = await getAllMenus({ search: menuSearch });

    setMenuOptions(menus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMenuOptions]);

  useEffect(() => {
    getMenus();
  }, [getMenus, menuSearch]);

  return (
    <div className="custom">
      <form className="form" onSubmit={handleSubmit}>
        <InputField
          label={'title'}
          name="title"
          value={formData.title}
          handleChange={handleChange}
          error={errorMessage?.title}
        />
        <InputField
          label={'price'}
          name="price"
          value={formData.price}
          handleChange={handleChange}
          error={errorMessage?.price}
        />

        <Autocomplete
          multiple
          sx={{
            marginBottom: '30px',
          }}
          options={menuOptions}
          onChange={(e, newValue) => {
            e.preventDefault();
            setServerError(null);
            setErrorMessage(null);
            setFormData({ ...formData, menus: newValue.map((val) => val._id) });
          }}
          filterSelectedOptions
          getOptionLabel={(option) => option.title || option}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => setMenuSearch(e.target.value)}
              variant="outlined"
              label="Food Items"
            />
          )}
        />

        {serverError ? <p className="error-message">{serverError}</p> : null}
        <CustomButton type="submit" theme={'contained'} label={'Submit'} />
      </form>
    </div>
  );
};

export default DayMenuForm;
