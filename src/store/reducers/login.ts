import { LOGIN_SUCCESS } from '../types/login';
import type { LoginStructure } from '../actions/login';

interface Action {
  type: string;
  param: LoginStructure;
}

const inititalState = {
  uid: '',
};

export const userInfo = (state = inititalState, action: Action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.param.uid;
    default:
      return state;
  }
};
