import request from '@/utils/request';
import type { RequestConfig, RequestFunc } from '@/utils/commonTypes';

export interface UserListParam {
  current: number;
  size?: number;
  roleName?: string;
  nickname?: string;
}

export interface UserItem {
  id: number;
  avatar: string;
  roleName: string;
  nickname: string;
  createTime: string;
  updateTime: string;
  isSilence: number;
}

export interface UserListResponse {
  total: number;
  userList: UserItem[];
}

export const userListRequest: RequestFunc<UserListParam, UserListResponse> = (
  config: RequestConfig<UserListParam>
): Promise<UserListResponse> => {
  return request(config);
};
