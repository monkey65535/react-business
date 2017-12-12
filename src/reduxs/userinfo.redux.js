import Axios from 'axios';
// action
const USER_LOGOUT = 'USER_LOGOUT';
const GET_USER_INFO = 'GET_USER_INFO';
const GET_CART_INFO = 'GET_CART_INFO';
//reducer
const initState = {
    userAbout: {
        username: '',
        id: '',
        email: '',
        phone: '',
        role: '',
        createTime: '',
        updateTime: ''
    },
    cartDate: {
        cartProductVoList: [],
        allChecked: true,
        cartTotalPrice: 0
    }
};
export function userInfo(state = initState, action) {
    switch (action.type) {
        case GET_USER_INFO:
            // 获取用户信息
            return {
                ...state,
                userAbout: {
                    ...action.payload
                }
            }

        case USER_LOGOUT:
            // 退出
            return {
                ...initState
            }
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
            }
    }
}


// action creater 登录 注册 退出
function actionLogout() {
    return {type: USER_LOGOUT}
}
export function userLogout() {
    return dispatch => {
        Axios
            .post('/user/logout.do')
            .then(res => {
                if (res.status === 200 && res.data.status === 0) {
                    dispatch(actionLogout());
                }
            })
    }
}
// 获取登录用户信息
function checkUserInfo(payload) {
    return {payload, type: GET_USER_INFO}
}
export function getUserInfo() {
    return dispatch => {
        Axios
            .post('/user/get_user_info.do')
            .then(res => {
                if (res.status === 200) {
                    let payload = null;
                    if (res.data.status === 0) {
                        // 已登陆
                        payload = res.data.data;
                    } else {
                        // 未登录
                        payload = initState.userAbout;
                    }
                    dispatch(checkUserInfo(payload))
                }
            });
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