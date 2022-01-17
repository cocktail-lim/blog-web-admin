import { LOGIN_SUCCESS } from '../../types/login';
import { loginRes, LoginStructure } from '../../actions/login/index';

interface Action {
  type: 'LOGIN_SUCCESS';
  param: LoginStructure;
}

const inititalState = {
  userId: '',
};

export const login = (state = inititalState, action: Action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.param.uid;
    default:
      return state;
  }
};
