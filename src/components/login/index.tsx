import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import './index.scss';

type LoginProps = {
  backUrl?: string;
};

const Login: React.FC<LoginProps> = (props) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios.post('http://10.11.107.140:8080/login', {
      username: account,
      password,
    });
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
