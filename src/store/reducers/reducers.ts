import { combineReducers } from 'redux';
import { userInfo } from './login';
import { menuList } from './menu';

export default function createReducer() {
  return combineReducers({
    userInfo,
    menuList,
  });
}
