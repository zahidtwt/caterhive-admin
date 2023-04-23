import React, { useCallback, useEffect, useState } from 'react';
import { getAllCategories } from '../../services/category';
import { createNewFoodItem } from '../../services/foodItems';
import CustomButton from '../common/CustomButton/CustomButton.component';
import InputField from '../common/InputField/InputField.component';
import Dropdown from './../common/Dropdown/Dropdown.component';
import FileInput from './../common/FileInput/FileInput.component';
import foodItemValidatorSchema from './foodItemForm.validator';

const FoodItemForm = ({ setFoodItems, setModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    category: '',
    price: '',
  });
  const [categories, setCategories] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setServerError(null);
    setErrorMessage(null);
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = foodItemValidatorSchema.validate(formData);

      if (error) {
        setErrorMessage({
          [error?.details[0]?.path[0]]: error?.message,
        });
        return;
      }

      const newFoodItem = await createNewFoodItem(formData);

      setFoodItems((foodItems) => [...foodItems, newFoodItem]);
      setModal(false);
    } catch (error) {
      setServerError(error.response.data);
    }
  };

  const getCategories = useCallback(async () => {
    const allCategories = await getAllCategories();
    console.log(allCategories);
    setCategories(allCategories);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const { title, description, price } = formData;

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
          label={'Price'}
          name="price"
          value={price}
          handleChange={handleChange}
          error={errorMessage?.price}
        />
        <Dropdown
          name={'category'}
          label={'Category'}
          updateForm={({ category }) => {
            setFormData({ ...formData, category: category._id });
          }}
          options={categories.map((category) => ({
            ...category,
            label: category.name,
          }))}
        />
        <FileInput
          label={'Select an Image'}
          handleChange={(file) => setFormData({ ...formData, imgUrl: file })}
        />

        {serverError ? <p className="error-message">{serverError}</p> : null}
        <CustomButton type="submit" theme={'contained'} label={'Submit'} />
      </form>
    </div>
  );
};

export default FoodItemForm;
