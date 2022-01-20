import { UPDATE_MENU } from '../types/menu';

export interface MenuStructure {
  title: string;
  hidden: boolean;
  children: Omit<MenuStructure, 'children'>[];
}

export const updateMenu = (menuList: MenuStructure[]) => {
  return {
    type: UPDATE_MENU,
    list: menuList,
  };
};
