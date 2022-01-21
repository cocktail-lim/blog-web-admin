import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from '@/components/login/index';
import { loginRes } from '@/store/actions/login';
import type { UserInfo } from '@/apis/login';
import type { RootState, AppDispatch } from '@/store/store';
import './index.scss';

const LoginPage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const loginCallback = (userInfo: UserInfo) => {
    const dispatch: AppDispatch = useDispatch();
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
