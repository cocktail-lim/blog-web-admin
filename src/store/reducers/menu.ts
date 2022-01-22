import { UPDATE_MENU } from '../types/menu';
import type { MenuStructure } from '../actions/menu';

interface UpdateMenuAction {
  type: string;
  list: MenuStructure[];
}

const initialState: MenuStructure[] = [
  {
    title: '首页',
    children: [],
  },
];

export const menuList = (state = initialState, action: UpdateMenuAction) => {
  switch (action.type) {
    case UPDATE_MENU:
      return action.list;
    default:
      return state;
  }
};
