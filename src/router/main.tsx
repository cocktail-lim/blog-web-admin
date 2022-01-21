import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import './main.css';

const Main = React.lazy(() => import('@/pages/main'));
const Login = React.lazy(() => import('@/pages/login'));

function suspensFunc(elementNode: ReactElement): ReactElement {
  return (
    <React.Suspense fallback={<Spin className='spin-loading' />}>{elementNode}</React.Suspense>
  );
}

const MainRouter: React.FC<ReactElement> = () => (
  <Routes>
    <Route path='/' element={suspensFunc(<Main />)} />
    <Route path='/login' element={suspensFunc(<Login />)} />
  </Routes>
);

export default MainRouter;
