import request from '@/utils/request';
import type { RequestError } from '@/utils/request';
import type { RequestConfig } from '@/utils/commonTypes';

export interface LoginParam {
  username: string;
  password: string;
}

export interface UserInfo {
  avatar: string;
  intro: string;
  isSilence: boolean;
  nickname: string;
  token: string;
  userId: number;
  username: string;
}

export interface LoginResponse {
  userInfo: UserInfo;
}

interface LoginRequestFunc {
  (config: RequestConfig<LoginParam>): Promise<LoginResponse>;
}

const loginRequest: LoginRequestFunc = (
  config: RequestConfig<LoginParam>
): Promise<LoginResponse> => {
  return request(config);
};

export { loginRequest };
