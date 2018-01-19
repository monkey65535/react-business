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
        case ADD_ADDRESS:
            let orderList = [...state.list];
            orderList = orderList.push(action.payload);
            return {
                ...state,
                list:[...orderList]
            }
        default:
            return state
    }
}

// action func
function getAddressList(payload) {
    return {payload, type: GET_ADDRESS_LIST}
}
export function getAddressLists(pageSize = 50) {
    return dispatch => {
        Axios
            .post('/shipping/list.do', Qs.stringify({pageSize}))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        dispatch(getAddressList(res.data.data))
                    }
                }
            })
    }
}
function add_address(payload) {
    return {payload, type: ADD_ADDRESS}
}
export function addAddressToUser({
    userId,
    receiverName,
    receiverPhone,
    receiverMobile,
    receiverProvince,
    receiverCity,
    receiverAddress,
    receiverZip
}) {
    return dispatch => {
        Axios
            .post('/shipping/add.do', Qs.stringify({
            userId,
            receiverName,
            receiverPhone,
            receiverMobile,
            receiverProvince,
            receiverCity,
            receiverAddress,
            receiverZip
        }))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        message.success('添加成功');
                        const id = res.data.data.shippingId;
                        const newAddress = {
                            userId,
                            receiverName,
                            receiverPhone,
                            receiverMobile,
                            receiverProvince,
                            receiverCity,
                            receiverAddress,
                            receiverZip,
                            id
                        };
                        dispatch(add_address(newAddress));
                    } else {
                        message.error('添加失败，请重试');
                    }
                }
            })
    }
}