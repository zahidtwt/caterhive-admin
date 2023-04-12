import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/common/CustomButton/CustomButton.component';
import InputField from '../../components/common/InputField/InputField.component';
import { getAllAreas } from '../../services/area';
import { createNewCaterer, loginCaterer } from '../../services/caterer';
import FileInput from './../../components/common/FileInput/FileInput.component';
import './Signup.styles.scss';
import signupValidator from './signup.validator';

const Signup = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    brandImg: '',
    activeFrom: '',
    activeTo: '',
    password: '',
    confirmPassword: '',
    operationalAreas: [],
  });

  const [serverError, setServerError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [areas, setAreas] = useState([]);

  const updateForm = (data) => {
    setErrorMessage(null);
    setServerError(null);
    setFormData({ ...formData, ...data });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateForm({ [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = signupValidator.validate(formData);

      if (error) {
        setErrorMessage({
          [error?.details[0]?.path[0]]: error?.message,
        });
        return;
      }

      const {
        businessName,
        email,
        phone,
        password,
        confirmPassword,
        brandImg,
        operationalAreas,
        activeFrom,
        activeTo,
      } = formData;

      if (password !== confirmPassword)
        return setErrorMessage({ confirmPassword: 'Password does not match' });
      await createNewCaterer({
        businessName,
        email,
        phone,
        password,
        brandImg,
        operationalAreas,
        activeDays: `${activeFrom} - ${activeTo}`,
      });

      await loginCaterer(email, password);
      document.location = '/';
    } catch (error) {
      setServerError(error.response.data);
    }
  };

  const getAreas = useCallback(async () => {
    const allAreas = await getAllAreas();

    setAreas(allAreas);
  }, [setAreas]);

  useEffect(() => {
    getAreas();
  }, [getAreas]);

  const { businessName, email, phone, password, confirmPassword } = formData;
  const weekDays = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <InputField
          label={'business Name'}
          name="businessName"
          value={businessName}
          handleChange={handleChange}
          error={errorMessage?.businessName}
        />
        <InputField
          label={'Email'}
          name="email"
          value={email}
          handleChange={handleChange}
          error={errorMessage?.email}
        />
        <InputField
          label={'Phone'}
          name="phone"
          value={phone}
          handleChange={handleChange}
          error={errorMessage?.phone}
        />
        <InputField
          label="Password"
          name="password"
          value={password}
          type="password"
          handleChange={handleChange}
          error={errorMessage?.password}
        />
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          handleChange={handleChange}
          error={errorMessage?.confirmPassword}
        />
        <FileInput
          label="Brand Image"
          handleChange={(fileStr) => {
            if (!fileStr) return;
            updateForm({ brandImg: fileStr });
          }}
          error={errorMessage?.brandImg}
        />

        <div>Service Available</div>
        <div className="service-available">
          <DropDown
            name={'activeFrom'}
            label={'From'}
            updateForm={updateForm}
            options={weekDays}
          />
          <DropDown
            name={'activeTo'}
            label={'To'}
            updateForm={updateForm}
            options={weekDays}
          />
        </div>
        <Autocomplete
          multiple
          sx={{
            marginBottom: '30px',
          }}
          options={areas}
          onChange={(e, newValue) => {
            e.preventDefault();
            updateForm({
              operationalAreas: newValue.map((area) => area._id),
            });
          }}
          filterSelectedOptions
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Operational Areas"
            />
          )}
        />

        {serverError ? <p className="error-message">{serverError}</p> : null}
        <CustomButton type="submit" theme={'contained'} label={'Submit'} />

        <div className="signup-link">
          I already have an account{' '}
          <Link to="/login" underline="hover">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

const DropDown = ({ options = [], updateForm, name, label }) => {
  return (
    <Autocomplete
      disablePortal
      onChange={(e, value) => updateForm({ [name]: value })}
      sx={{
        display: 'inline-block',
        margin: ' 10px 10px 30px 0',
        width: '50%',
      }}
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
