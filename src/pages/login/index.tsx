import React from 'react';
import Login from '@/components/login/index';
import './index.scss';

const LoginPage: React.FC = () => {
  return (
    <div className='loginpage-content'>
      <div className='card-outline'>
        <div className='login-card'>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
