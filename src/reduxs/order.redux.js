import Axios from 'axios';
import {message} from 'antd';
import Qs from 'qs';

// action 
const GET_ORDER_LIST = 'GET_ORDER_LIST';


//reducer
const initState = {
    orderItemVoList: [],
    imageHost:'',
    productTotalPrice:0
};

export function orderInfo(state = initState, action) {
    switch (action.type) {
        case GET_ORDER_LIST:
        return {
            ...state,
            ...action.payload
        }
        default:
            return state
    }
}

// 获取订单商品信息
function get_order_list(payload){
    return {payload,type:GET_ORDER_LIST}
}
export function getOrderList(){
    return dispatch => {
        Axios.post('/order/get_order_cart_product.do').then(res=>{
            if(res.status === 200){
                if(res.data.status === 0){
                    dispatch(get_order_list(res.data.data))
                }else{
                    message.error(res.data.msg);
                }
            }
        })
    }
}