import { LOGIN_SUCCESS } from '../types/login';
import type { UserInfo } from '@/apis/login';

interface Action {
  type: string;
  userInfo: UserInfo;
}

const inititalState = {
  avatar: '',
  intro: '',
  isSilence: true,
  nickname: '',
  token: '',
  userId: -1,
  username: '',
};

export const userInfo = (state: UserInfo = inititalState, action: Action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.userInfo;
    default:
      return state;
  }
};
