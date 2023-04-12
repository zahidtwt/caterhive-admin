import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../../pages/Login/Login.page';
import Signup from '../../pages/Signup/Signup.page';

const Unauthenticated = () => {
  return (
    <main className="container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Navigate to={'login'} />} />
      </Routes>
    </main>
  );
};

export default Unauthenticated;
