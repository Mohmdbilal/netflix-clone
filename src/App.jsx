import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar';
import {AuthContextProvider} from './context/AuthContext';
import Home from './pages/Home'; // ✅ Home component
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  return (
    <>
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>}/>
      </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
