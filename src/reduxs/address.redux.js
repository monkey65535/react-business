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
    list: []
};

export function addressInfo(state = initState, action) {
    switch (action.type) {
        case GET_ADDRESS_LIST:
            return {
                ...action.payload
            }
        default:
            return state
    }
}

// action func
function getAddressList(payload) {
    return {payload, type: GET_ADDRESS_LIST}
}
export function getAddressLists(pageNum = 1, pageSize = 10) {
    return dispatch => {
        Axios
            .post('/shipping/list.do', Qs.stringify({pageNum, pageSize}))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        dispatch(getAddressList(res.data.data))
                    }
                }
            })
    }
}