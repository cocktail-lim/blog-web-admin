import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '@/pages/main';

const MainRouter = () => (
  <Routes>
    <Route path='/' element={<Main />} />
  </Routes>
);

export default MainRouter;
