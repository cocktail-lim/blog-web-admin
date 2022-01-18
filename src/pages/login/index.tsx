import React from 'react';
import Login from '@/components/login/index';
import './index.scss';

const LoginPage: React.FC = () => {
  return (
    <div className='loginpage-content'>
      <div className='login-card'>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
