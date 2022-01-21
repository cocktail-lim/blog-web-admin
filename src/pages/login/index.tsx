import React from 'react';
import Login from '@/components/login/index';
import { loginRes } from '@/store/actions/login';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { UserInfo } from '@/apis/login';
import './index.scss';

const LoginPage: React.FC = () => {
  const userInfo = useAppSelector((state) => state.userInfo);
  const loginCallback = (userInfo: UserInfo) => {
    const dispatch = useAppDispatch();
    dispatch(loginRes(userInfo));
  };

  return (
    <div className='loginpage-content'>
      <div className='card-outline'>
        <div className='login-card'>
          <Login api={'/login'} loginSuccessCallback={loginCallback} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
