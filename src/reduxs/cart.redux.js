import Axios from 'axios';
// eslint-disable-next-line
import Qs from 'qs';

// 购物车相关
const GET_CART_INFO = 'GET_CART_INFO';

//reducer
const initState = {
    cartDate: {
        cartProductVoList: [],
        allChecked: true,
        cartTotalPrice: 0
    }
};

export function cartInfo(state = initState, action) {
    switch (action.type) {
        case GET_CART_INFO:
            // 获取用户购物车信息
            return {
                ...state,
                cartDate: {
                    ...action.payload
                }
            }
        default:
            return {
                ...state
            };
    }
}

//获取购物车信息
function checkCartInfo(payload) {
    return {payload, type: GET_CART_INFO}
}
export function getCartInfo() {
    return dispatch => {
        Axios
            .post('/cart/list.do')
            .then(res => {
                if (res.status === 200) {
                    let payload = null;
                    if (res.data.status === 0) {
                        // 获取成功
                        payload = {
                            ...res.data.data
                        }
                    } else {
                        // 用户未登录
                        payload = initState.cartDate;
                    }
                    dispatch(checkCartInfo(payload))
                }
            })
    }
}