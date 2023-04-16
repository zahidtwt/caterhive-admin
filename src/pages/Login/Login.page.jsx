import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginCaterer } from '../../services/caterer';
import CustomButton from './../../components/common/CustomButton/CustomButton.component';
import InputField from './../../components/common/InputField/InputField.component';
import './Login.styles.scss';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { email, password } = formData;

      await loginCaterer(email, password);

      document.location = '/';
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="login custom">
      <form className="login-form" onSubmit={handleSubmit}>
        <InputField
          label={'Email'}
          name="email"
          value={formData.email}
          handleChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          value={formData.password}
          type="password"
          handleChange={handleChange}
        />

        <CustomButton type="submit" theme={'contained'} label={'Submit'} />

        <div className="signup-link">
          Don't have an account{' '}
          <Link to="/signup" underline="hover">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
