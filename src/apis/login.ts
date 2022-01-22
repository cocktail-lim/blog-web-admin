import request from '@/utils/request';
import type { RequestConfig, RequestFunc } from '@/utils/commonTypes';
import type { UserInfo } from '@/store/actions/login';

export interface LoginParam {
  username: string;
  password: string;
}

export interface LoginResponse {
  userInfo: UserInfo;
}

export const loginRequest: RequestFunc<LoginParam, LoginResponse> = (
  config: RequestConfig<LoginParam>
): Promise<LoginResponse> => {
  return request(config);
};
