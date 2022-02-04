import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import './main.css';

const Main = React.lazy(() => import('@/pages/main'));
const Login = React.lazy(() => import('@/pages/login'));
const HomePage = React.lazy(() => import('@/pages/home/index'));
const UserList = React.lazy(() => import('@/pages/userList/index'));
const BlogAdd = React.lazy(() => import('@/pages/blogAdd/index'));
const BlogList = React.lazy(() => import('@/pages/blogList/index'));

export function suspensFunc(elementNode: ReactElement): ReactElement {
  return (
    <React.Suspense fallback={<Spin className='spin-loading' />}>{elementNode}</React.Suspense>
  );
}

const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={suspensFunc(<Main />)}>
        <Route path='home' element={suspensFunc(<HomePage />)} />
        <Route path='userList' element={suspensFunc(<UserList />)} />
        <Route path='blogAdd' element={suspensFunc(<BlogAdd />)} />
        <Route path='blogList' element={suspensFunc(<BlogList />)} />
      </Route>
      <Route path='/login' element={suspensFunc(<Login />)} />
    </Routes>
  );
};

export default MainRouter;
