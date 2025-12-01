import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Sign In Page */}
        <Route path="/" element={<SignIn />} />

        {/* Sign Up Page */}
        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<Dashboard />} />


      </Routes>
    </BrowserRouter>
  );
}
