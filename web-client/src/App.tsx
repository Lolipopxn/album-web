import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Register from "./page/Register";
import MainLogin from './page/PageGeneral';
import Add from './page/pageAdd';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mainLogin" element={<MainLogin />} />
        <Route path="/Add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
