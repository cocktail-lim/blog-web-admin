import request from '@/utils/request';
import type { RequestConfig, RequestFunc } from '@/utils/commonTypes';
import type { MenuItemStructure } from '@/store/actions/menu';

export interface MenuRequest {
  roleName: string;
}

export interface MenuReponse {
  menuList: MenuItemStructure[];
}

export const getMenuList: RequestFunc<MenuRequest, MenuReponse> = (
  config: RequestConfig<MenuRequest>
): Promise<MenuReponse> => {
  return request(config);
};
