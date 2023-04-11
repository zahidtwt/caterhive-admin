import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Unauthenticated = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<div> Login</div>} />
        <Route path="/signup" element={<div> SignUp</div>} />
        <Route path="/*" element={<Navigate to={'login'} />} />
      </Routes>
    </div>
  );
};

export default Unauthenticated;
