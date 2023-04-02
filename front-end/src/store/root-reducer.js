import { combineReducers } from 'redux';
import { adminReducer } from './admin/admin-reducer';
import { userReducer } from './user/user-reducer'

export const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});