import { LOGIN_SUCCESS } from '../types/login';

export interface LoginStructure {
  uid: string;
}

export const loginRes = (param: LoginStructure) => {
  return {
    type: LOGIN_SUCCESS,
    param,
  };
};
