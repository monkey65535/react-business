import Axios from 'axios';
// action 账号相关
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_REGISTER = 'USER_REGISTER';
const GET_USER_INFO = 'GET_USER_INFO';
const CHECK_USER_NAME = 'CHECK_USER_NAME';
const CHCEK_USER_QUESTION = 'CHCEK_USER_QUESTION';
const RESET_PASSWORD = 'RESET_PASSWORD';
// 购物车相关
const GET_CART_INFO = 'GET_CART_INFO';
// 操作相关
const CLEAR_ERRMSG = 'CLER_ERRMSG';
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
    },
    errorMsg: '',
    userQusetion: ''
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
        case USER_LOGIN:
            // 获取用户信息
            return {
                ...state,
                userAbout: {
                    ...action.payload.data
                },
                errorMsg: action.payload.errorMsg
            }
        case USER_REGISTER:
            action
                .history
                .push('/result/register');
            return {
                ...state
            };
        case USER_LOGOUT:
            // 退出
            return {
                ...initState
            }
        case CHECK_USER_NAME:
            action
                .history
                .push('/pass-reset/question');
            return {
                ...state,
                userQusetion: action.question
            }
        case GET_CART_INFO:
            // 获取用户购物车信息
            return {
                ...state,
                cartDate: {
                    ...action.payload
                }
            }
        case CLEAR_ERRMSG:
            return {
                ...state,
                errorMsg: action.msg
            }
        default:
            return {
                ...state
            }
    }
}




// 清除错误提示
export function clearErrorMsg(message) {
    return {type: CLEAR_ERRMSG, msg: message}
}

// action creater  登录
function actionLogin(payload) {
    return {payload, type: USER_LOGIN}
}
export function userLogin({username, password}) {
    return dispatch => {
        Axios
            .post('/user/login.do', {username, password})
            .then(res => {
                if (res.status === 200) {
                    const resData = res.data;
                    let payload = null;
                    if (resData.status === 0) {
                        //登录成功
                        payload = {
                            data: {
                                ...resData.data
                            },
                            errorMsg: ''
                        }
                    } else {
                        payload = {
                            data: {
                                ...initState.userAbout
                            },
                            errorMsg: resData.msg
                        }
                    }
                    dispatch(actionLogin(payload));
                }
            });
    }
}
//  注册
function actionRegister(history) {
    return {history, type: USER_REGISTER}
}
export function userRegister({
    username,
    password,
    confirmPassword,
    phone,
    email,
    question,
    answer
}, history) {
    return dispatch => {
        // Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        // request
        // username,password,email,phone,question,answer
        // Axios
        //     .post('/user/register.do', {
        //     username,
        //     password,
        //     email,
        //     phone,
        //     question,
        //     answer
        // })
        //     .then(res => {
        //         console.log(res);
        //         if (res.status === 200) {
        //             if (res.data.status === 0) {
        //                 dispatch(actionRegister(history));
        //             } else if (res.data.status === 1) {
        //                 // 用户已存在
        //                 dispatch(clearErrorMsg('用户已存在'));
        //             } else {
        //                 // 失败
        //                 dispatch(clearErrorMsg('未知错误，请重试'));
        //             }
        //         }
        //     })
        Axios({
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            url:'/user/register.do',
            data:{
                username,
                password,
                email,
                phone,
                question,
                answer
            }
        }).then(res=>{
            console.log(res);
        })
    }
}
// 验证用户名是否重复
export function checkUserName(username) {
    return dispatch => {
        Axios
            .post('/user/check_valid.do', {
            str: username,
            type: 'username'
        })
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 1) {
                        dispatch(clearErrorMsg(res.data.msg))
                    }
                }
            })
    }
}
//  退出
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
// 重置密码流程 验证用户名是否有密码提示问题
function checkUsername(history, question) {
    return {history, question, type: CHECK_USER_NAME}
}
export function checkUserHasQuestion(username, history) {
    return dispatch => {
        Axios
            .post('/user/forget_get_question.do', {username})
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 1) {
                        dispatch(clearErrorMsg(res.data.msg));
                    } else {
                        dispatch(checkUsername(history, res.data.data));
                    }
                }
            })
    }
}
// 验证密码提示问题 重置密码 获取购物车信息
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