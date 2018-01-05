import Axios from 'axios';
import {message} from 'antd';
import Qs from 'qs';

// 购物车相关
const GET_CART_INFO = 'GET_CART_INFO';
// 添加商品到购物车
const ADD_GOODS_TO_CART = 'ADD_GOODS_TO_CART';
// 更新购物车某个产品数量
const UPDATE_GOODS_TO_CART = 'UPDATE_GOODS_TO_CART';
// 移除购物车某个产品
const DELETE_GOODS_TO_CART = 'DELETE_GOODS_TO_CART';
// 购物车选中某个商品
const SELECT_GOODS_TO_CART = 'SELECT_GOODS_TO_CART';
// 购物车取消选中某个商品
const UN_SELECT_GOODS_TO_CART = 'UN_SELECT_GOODS_TO_CART';
// 购物车全选
const CART_ALL_CHECKED = 'CART_ALL_CHECKED';
// 购物车取消全选
const CART_ALL_UN_CHECKED = 'CART_ALL_UN_CHECKED';
// 查询购物车商品数量
const GET_CART_GOODS_NUM = 'GET_CART_GOODS_NUM';

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
            // 添加商品
        case ADD_GOODS_TO_CART:
            action
                .history
                .push('/result/success');
            return {
                ...state,
                cartDate: {
                    ...action.payload
                }
            }
        case UPDATE_GOODS_TO_CART:
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
// 添加商品到购物车
function addGoods(payload, history) {
    return {payload, history, type: ADD_GOODS_TO_CART}
}
export function addGoodsToCart({
    productId,
    count
}, history) {
    return dispatch => {
        Axios
            .post('/cart/add.do', Qs.stringify({productId, count}))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        dispatch(addGoods(res.data.data, history));
                    } else {
                        message.info(res.data.msg);
                    }
                }
            })
    }
}
// 更新商品数量
function updateGoods(payload) {
    return {payload, type: UPDATE_GOODS_TO_CART}
}
export function updateGoodsToCart(productId, count) {
    return dispatch => {
        Axios
            .post('/cart/update.do', Qs.stringify({productId, count}))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        dispatch(updateGoods(res.data.data))
                    }
                }
            })
    }
}

// 移除购物车某个产品
function deleteGoods(payload) {
    return {payload, type: DELETE_GOODS_TO_CART}
};
export function deleteGoodsToCart(productIds) {
    return dispatch => {
        Axios
            .post('/cart/delete_product.do', Qs.stringify({
            productIds: productIds.join(',')
        }))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        dispatch(deleteGoods(res.data.data))
                    }
                }
            })
    }
}