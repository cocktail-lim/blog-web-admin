import { createStore } from 'redux';
import createReducer from '@/store/reducers/reducers';

const store = createStore(createReducer());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
