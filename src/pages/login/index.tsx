import React from 'react';
import Login from '@/components/login/index';
import { loginRes } from '@/store/actions/login';
import { useAppDispatch } from '@/hooks/redux';
import type { UserInfo } from '@/store/actions/login';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginCallback = (userInfo: UserInfo) => {
    dispatch(loginRes(userInfo));
    navigate('/home');
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
