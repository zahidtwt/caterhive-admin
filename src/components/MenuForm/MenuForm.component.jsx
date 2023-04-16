import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllFoodItems } from '../../services/foodItems';
import { createNewMenu } from '../../services/menu';
import CustomButton from '../common/CustomButton/CustomButton.component';
import FileInput from '../common/FileInput/FileInput.component';
import InputField from '../common/InputField/InputField.component';
import menuValidatorSchema from './menuForm.validator';

const MenuForm = ({ setMenus, setModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    price: '',
    tags: '',
    foodItems: [],
  });
  const [foodItemOptions, setFoodItemOptions] = useState([]);
  const [foodItemSearch, setFoodItemSearch] = useState('');
  const [serverError, setServerError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateForm = (data) => {
    setErrorMessage(null);
    setServerError(null);
    setFormData({ ...formData, ...data });
  };

  const handleChange = (e) => {
    setServerError(null);
    setErrorMessage(null);
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = menuValidatorSchema.validate(formData);

      if (error) {
        setErrorMessage({
          [error?.details[0]?.path[0]]: error?.message,
        });
        return;
      }

      const newMenu = await createNewMenu(formData);

      setMenus((menus) => [...menus, newMenu]);
      setModal(false);
    } catch (error) {
      setServerError(JSON.stringify(error.response.data));
    }
  };

  const getFoodItems = useCallback(async () => {
    const data = await getAllFoodItems({ search: foodItemSearch });

    setFoodItemOptions(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFoodItems();
  }, [getFoodItems, foodItemSearch]);

  const { title, description, price, tags } = formData;

  return (
    <div className="custom">
      <form className="form" onSubmit={handleSubmit}>
        <InputField
          label={'title'}
          name="title"
          value={title}
          handleChange={handleChange}
          error={errorMessage?.title}
        />
        <InputField
          label={'description'}
          name="description"
          value={description}
          handleChange={handleChange}
          error={errorMessage?.description}
        />
        <InputField
          label={'price'}
          name="price"
          value={price}
          handleChange={handleChange}
          error={errorMessage?.price}
        />
        <InputField
          label={'tags'}
          name="tags"
          value={tags}
          placeholder="Type tags separated by comma ( Chicken, Beef )"
          handleChange={handleChange}
          error={errorMessage?.tags}
        />
        <FileInput
          label={'Select an Thumbnail'}
          handleChange={(file) => updateForm({ thumbnail: file })}
          error={errorMessage?.thumbnail}
        />
        <Autocomplete
          multiple
          sx={{
            marginBottom: '30px',
          }}
          options={foodItemOptions}
          onChange={(e, newValue) => {
            e.preventDefault();
            updateForm({
              foodItems: newValue.map((foodItem) => foodItem._id),
            });
          }}
          filterSelectedOptions
          getOptionLabel={(option) => option.title || option}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => setFoodItemSearch(e.target.value)}
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

export default MenuForm;
