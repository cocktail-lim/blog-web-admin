import request from '@/utils/request';
import type { RequestError } from '@/utils/request';
import type { RequestConfig } from '@/utils/commonTypes';

export interface LoginParam {
  username: string;
  password: string;
}

export interface LoginResponse {
  userInfo: {
    avatar: string;
    intro: string;
    isSilence: boolean;
    nickname: string;
    token: string;
    userId: number;
    username: string;
  };
}

interface LoginRequestFunc {
  (config: RequestConfig<LoginParam>): Promise<LoginResponse>;
}

const loginRequest: LoginRequestFunc = (
  config: RequestConfig<LoginParam>
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    request(config)
      .then((response: LoginResponse) => {
        resolve(response);
      })
      .catch((e: RequestError) => {
        reject && reject(e);
      });
  });
};

export { loginRequest };
