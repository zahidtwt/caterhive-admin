import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { getOwnData } from '../../services/caterer';
import { createNewEventMenu } from '../../services/eventMenus';
import { getAllFoodItemsByCategory } from '../../services/foodItems';
import CustomButton from '../common/CustomButton/CustomButton.component';
import InputField from '../common/InputField/InputField.component';
import eventMenuValidatorSchema from './eventMenuForm.validator';

const EventMenuForm = ({ setModal, setEventMenus }) => {
  const [formData, setFormData] = useState({
    title: '',
    appetizers: [],
    mainCourses: [],
    desserts: [],
    drinks: [],
    minEventOrder: '',
    discountOnEachHundred: '',
    maxDiscount: '',
  });
  const [foodItemOptions, setFoodItemOptions] = useState({
    caterer: '',
    appetizers: [],
    mainCourses: [],
    desserts: [],
    drinks: [],
  });
  const [foodItemSearch, setFoodItemSearch] = useState(null);

  const [serverError, setServerError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateFoodItems = (data) => {
    setErrorMessage(null);
    setServerError(null);
    setFormData({ ...formData, ...data });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrorMessage(null);
    setServerError(null);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = eventMenuValidatorSchema.validate(formData);

      if (error) {
        setErrorMessage({
          [error?.details[0]?.path[0]]: error?.message,
        });
        return;
      }

      const newEventMenu = await createNewEventMenu(formData);

      setEventMenus((eventMenus) => [...eventMenus, newEventMenu]);
      setModal(false);
    } catch (error) {
      setServerError(error.response.data);
    }
  };

  const getFoodItems = useCallback(async () => {
    const user = await getOwnData();

    setFormData((formData) => ({ ...formData, caterer: user._id }));

    const appetizers = await getAllFoodItemsByCategory({
      search: foodItemSearch,
      caterer: user._id,
      category: 'Appetizer',
    });
    const mainCourses = await getAllFoodItemsByCategory({
      search: foodItemSearch,
      caterer: user._id,
      category: 'Main Course',
    });
    const desserts = await getAllFoodItemsByCategory({
      search: foodItemSearch,
      caterer: user._id,
      category: 'Desert',
    });
    const drinks = await getAllFoodItemsByCategory({
      search: foodItemSearch,
      caterer: user._id,
      category: 'Drinks',
    });

    setFoodItemOptions({
      appetizers,
      mainCourses,
      desserts,
      drinks,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFoodItems();
  }, [getFoodItems, foodItemSearch]);

  const { title, minEventOrder, maxDiscount, discountOnEachHundred } = formData;

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

        <Autocomplete
          multiple
          sx={{
            marginBottom: '30px',
          }}
          options={foodItemOptions.appetizers}
          onChange={(e, newValue) => {
            e.preventDefault();
            setErrorMessage(null);
            setServerError(null);
            updateFoodItems({
              appetizers: newValue.map((foodItem) => foodItem._id),
            });
          }}
          filterSelectedOptions
          getOptionLabel={(option) => option.title || option}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) =>
                setFoodItemSearch({ appetizers: e.target.value })
              }
              variant="outlined"
              label="Appetizers"
              error={errorMessage?.appetizers}
            />
          )}
        />

        <Autocomplete
          multiple
          sx={{
            marginBottom: '30px',
          }}
          options={foodItemOptions.mainCourses}
          onChange={(e, newValue) => {
            e.preventDefault();
            setErrorMessage(null);
            setServerError(null);
            updateFoodItems({
              mainCourses: newValue.map((foodItem) => foodItem._id),
            });
          }}
          filterSelectedOptions
          getOptionLabel={(option) => option.title || option}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) =>
                setFoodItemSearch({ mainCourses: e.target.value })
              }
              variant="outlined"
              label="Main Courses"
              error={errorMessage?.mainCourses}
            />
          )}
        />

        <Autocomplete
          multiple
          sx={{
            marginBottom: '30px',
          }}
          options={foodItemOptions.desserts}
          onChange={(e, newValue) => {
            e.preventDefault();
            setErrorMessage(null);
            setServerError(null);
            updateFoodItems({
              desserts: newValue.map((foodItem) => foodItem._id),
            });
          }}
          filterSelectedOptions
          getOptionLabel={(option) => option.title || option}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => setFoodItemSearch({ desserts: e.target.value })}
              variant="outlined"
              label="Desserts"
              error={errorMessage?.desserts}
            />
          )}
        />

        <Autocomplete
          multiple
          sx={{
            marginBottom: '30px',
          }}
          options={foodItemOptions?.drinks}
          onChange={(e, newValue) => {
            e.preventDefault();
            setErrorMessage(null);
            setServerError(null);
            updateFoodItems({
              drinks: newValue.map((foodItem) => foodItem._id),
            });
          }}
          filterSelectedOptions
          getOptionLabel={(option) => option.title || option}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => setFoodItemSearch({ drinks: e.target.value })}
              variant="outlined"
              label="Drinks"
              error={errorMessage?.drinks}
            />
          )}
        />
        <InputField
          label={'Minimum Order quantity'}
          name="minEventOrder"
          value={minEventOrder}
          handleChange={handleChange}
          error={errorMessage?.minEventOrder}
        />
        <InputField
          label={'discount On Each Hundred'}
          name="discountOnEachHundred"
          value={discountOnEachHundred}
          handleChange={handleChange}
          error={errorMessage?.discountOnEachHundred}
        />
        <InputField
          label={'maxium Discount'}
          name="maxDiscount"
          value={maxDiscount}
          handleChange={handleChange}
          error={errorMessage?.maxDiscount}
        />

        {serverError ? <p className="error-message">{serverError}</p> : null}
        <CustomButton type="submit" theme={'contained'} label={'Submit'} />
      </form>
    </div>
  );
};

export default EventMenuForm;
