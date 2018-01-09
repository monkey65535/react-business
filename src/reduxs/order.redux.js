import Axios from 'axios';
import {message} from 'antd';
import Qs from 'qs';

// action 
const ADD_ADDRESS = 'ADD_ADDRESS';
const DEL_ADDRESS = 'DEL_ADDRESS';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const SELECT_ADDRESS = 'SELECT_ADDRESS';
const GET_ADDRESS_LIST = 'GET_ADDRESS_LIST';


//reducer
const initState = {
    cartProductVoList: []
};

export function orderInfo(state = initState, action) {
    switch (action.type) {
        default:
            return state
    }
}