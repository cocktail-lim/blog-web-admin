import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '@/pages/main';
import Login from '@/pages/login';

const MainRouter = () => (
  <Routes>
    <Route path='/' element={<Main />} />
    <Route path='/login' element={<Login />} />
  </Routes>
);

export default MainRouter;
