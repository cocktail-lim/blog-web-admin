import { UPDATE_MENU } from '../types/menu';

export interface MenuItemStructure {
  menuId: number;
  menuName: string;
  menuUrl: string;
  children: MenuItemStructure[];
}

export const updateMenu = (menuList: MenuItemStructure[]) => {
  return {
    type: UPDATE_MENU,
    list: menuList,
  };
};
