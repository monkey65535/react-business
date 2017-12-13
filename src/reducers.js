import {combineReducers} from 'redux';
import {userInfo} from './reduxs/userinfo.redux';
// 合并reducers
export default combineReducers({userInfo});