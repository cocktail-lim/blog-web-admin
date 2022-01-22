import { LOGIN_SUCCESS } from '../types/login';

export interface UserInfo {
  avatar: string;
  intro: string;
  isSilence: boolean;
  nickname: string;
  token: string;
  userId: number;
  username: string;
}

export const loginRes = (userInfo: UserInfo) => {
  return {
    type: LOGIN_SUCCESS,
    userInfo,
  };
};
