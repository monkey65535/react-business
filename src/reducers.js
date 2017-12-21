import {combineReducers} from 'redux';
import {userInfo} from './reduxs/userinfo.redux';
import {cartInfo} from './reduxs/cart.redux';
import {goodsList} from './reduxs/goodList.redux';
// 合并reducers
export default combineReducers({userInfo,cartInfo,goodsList});