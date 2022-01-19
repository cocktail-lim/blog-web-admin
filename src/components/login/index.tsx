import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import { RequestParam } from '@/utils/commonTypes';
import './index.scss';

type LoginProps = {
  backUrl?: string;
};

const Login: React.FC<LoginProps> = (props) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const param: RequestParam = {
    api: '/login',
    method: 'post',
    data: {
      username: account,
      password,
    },
  };

  const login = async () => {
    try {
      const response = await request(param);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='login-main'>
      <p className='login-title'>Admin Login</p>
      <Input
        className='account-input'
        size='large'
        placeholder='Account'
        prefix={<UserOutlined />}
        onChange={(e) => setAccount(e.target.value)}
      />
      <Input
        className='password-input'
        type={'password'}
        size='large'
        placeholder='Password'
        prefix={<LockOutlined />}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className='login-button' type='primary' onClick={login}>
        Login
      </Button>
    </div>
  );
};

export default Login;
