import request from '@/utils/request';
import type { RequestConfig, RequestFunc } from '@/utils/commonTypes';
import type { MenuStructure } from '@/store/actions/menu';

export interface MenuRequest {
  roleName: string;
}

export const getMenuList: RequestFunc<MenuRequest, MenuStructure[]> = (
  config: RequestConfig<MenuRequest>
): Promise<MenuStructure[]> => {
  return request(config);
};
