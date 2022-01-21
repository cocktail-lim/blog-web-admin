import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginRequest } from '@/apis/login';
import type { LoginParam, LoginResponse } from '@/apis/login';
import type { RequestConfig } from '@/utils/commonTypes';
import type { RequestError } from '@/utils/request';
import './index.scss';

type LoginProps = {
  backUrl?: string;
};

const Login: React.FC<LoginProps> = (props) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const param: RequestConfig<LoginParam> = {
    api: '/login',
    method: 'post',
    data: {
      username: account,
      password,
    },
  };

  const login = async () => {
    try {
      const response: LoginResponse = await loginRequest(param);
    } catch (e) {
      const err = e as RequestError;
      message.error(err.message);
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
