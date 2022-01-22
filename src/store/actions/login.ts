import { LOGIN_SUCCESS } from '../types/login';
import { UserInfo } from '@/apis/login';

export const loginRes = (userInfo: UserInfo) => {
  return {
    type: LOGIN_SUCCESS,
    userInfo,
  };
};
