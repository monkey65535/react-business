import Axios from 'axios';
import {message} from 'antd';
import Qs from 'qs';

// action
const GET_ORDER_LIST = 'GET_ORDER_LIST';
const CREATE_ORDER = 'CREATE_ORDER';
const GET_ORDER_LIST_TO_MAP = 'GET_ORDER_LIST_TO_MAP';
//reducer
const initState = {
    orderItemVoList: [],
    imageHost: '',
    productTotalPrice: 0,
    orderListInfo:{}
};

export function orderInfo(state = initState, action) {
    switch (action.type) {
        case GET_ORDER_LIST:
            return {
                ...state,
                ...action.payload
            }
        case CREATE_ORDER:
            action
                .history
                .push(`/order-detail/${action.payload.orderNo}`);
            return {
                ...state
            }
        case GET_ORDER_LIST_TO_MAP:
            return {
                ...state,
                orderListInfo:{
                    ...action.payload
                }
            }
        default:
            return state
    }
}

// 获取订单商品信息
function get_order_list(payload) {
    return {payload, type: GET_ORDER_LIST}
}
export function getOrderList() {
    return dispatch => {
        Axios
            .post('/order/get_order_cart_product.do')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        dispatch(get_order_list(res.data.data))
                    } else {
                        message.error(res.data.msg);
                    }
                }
            })
    }
}

function createOrder(payload, history) {
    return {payload, history, type: CREATE_ORDER}
}

export function createOrderToList(shippingId, history) {
    return dispatch => {
        Axios
            .post('/order/create.do', Qs.stringify({shippingId}))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        dispatch(createOrder(res.data.data, history))
                    } else {
                        message.error(res.data.msg);
                    }
                }
            })
    }
}

function orderList(payload) {
    return {payload, type: GET_ORDER_LIST_TO_MAP}
}
export function orderListToMap(pageSize = 10, pageNum = 1, history) {
    return dispatch => {
        Axios
            .post('/order/list.do', Qs.stringify({pageNum, pageSize}))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        dispatch(orderList(res.data.data));
                    } else {
                        message.error(res.data.msg);
                        if (res.data.status === 10) {
                            history.push('/login');
                        } else {
                            message.error(res.data.msg);
                            history.push('/')
                        }
                    }
                }
            });
    }
}