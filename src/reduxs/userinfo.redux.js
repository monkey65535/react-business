import Axios from 'axios';
import Qs from 'qs';
// action 账号相关
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_REGISTER = 'USER_REGISTER';
const GET_USER_INFO = 'GET_USER_INFO';
// 重置密码相关
const SET_FORGET_USERNAME = 'SET_FORGET_USERNAME';
const CHECK_USER_NAME = 'CHECK_USER_NAME';
const CHCEK_USER_QUESTION = 'CHCEK_USER_QUESTION';
const RESET_PASSWORD = 'RESET_PASSWORD';
// 购物车相关
const GET_CART_INFO = 'GET_CART_INFO';
//获取当前登录用户的详细信息 并强制登录
const GET_INFORMATION = 'GET_INFORMATION';
// 登录状态更新个人信息
const UPDATE_INFORMATION = 'UPDATE_INFORMATION';
// 操作相关
const CLEAR_ERRMSG = 'CLER_ERRMSG';

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
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
    forgetPassword: {
        username: '',
        question: '',
        token: ''
    },
    userInformation: {
        username: '',
        id: '',
        email: '',
        phone: '',
        question: '',
        answer: '',
        role: '',
        createTime: '',
        updateTime: ''
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
        case SET_FORGET_USERNAME:
            // 找回密码的用户名
            return {
                ...state,
                forgetPassword: {
                    ...state.forgetPassword,
                    username: action.username
                }
            }
        case CHECK_USER_NAME:
            // 获取密码提示问题
            action
                .history
                .push('/pass-reset/question');
            return {
                ...state,
                forgetPassword: {
                    ...state.forgetPassword,
                    username: action.username,
                    question: action.question
                }

            }
        case CHCEK_USER_QUESTION:
            // 通过密码提示问题验证
            action
                .history
                .push('/pass-reset/password');
            return {
                ...state,
                forgetPassword: {
                    ...state.forgetPassword,
                    token: action.token
                }
            }
        case RESET_PASSWORD:
            action
                .history
                .push('/result/success');
            return {
                ...state
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
            // 注册相关提示信息修改
            return {
                ...state,
                errorMsg: action.msg
            }
        case GET_INFORMATION:
            return {
                ...state,
                userInformation: {
                    ...action.payload
                }
            }
        case UPDATE_INFORMATION:
            action
                .history
                .push('/usercenter');
            return {
                ...state,
                userInformation: {
                    ...action.payload
                }
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
            .post('/user/login.do', Qs.stringify({username, password}))
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
        // username,password,email,phone,question,answer
        Axios
            .post('/user/register.do', Qs.stringify({
            username,
            password,
            email,
            phone,
            question,
            answer
        }))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        dispatch(actionRegister(history));
                    } else if (res.data.status === 1) {
                        // 用户已存在
                        dispatch(clearErrorMsg(res.data.msg));
                    } else {
                        // 失败
                        dispatch(clearErrorMsg('未知错误，请重试'));
                    }
                }
            })
    }
}
// 验证用户名是否重复
export function checkUserName(username) {
    return dispatch => {
        Axios
            .post('/user/check_valid.do', Qs.stringify({str: username, type: 'username'}))
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
function setForgetUsername(username) {
    return {username, type: SET_FORGET_USERNAME}
}

function checkUsername(history, question, username) {
    return {history, question, username, type: CHECK_USER_NAME}
}
export function checkUserHasQuestion(username, history) {
    return dispatch => {
        dispatch(setForgetUsername(username));
        Axios
            .post('/user/forget_get_question.do', Qs.stringify({username}))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 1) {
                        dispatch(clearErrorMsg(res.data.msg));
                    } else {
                        dispatch(checkUsername(history, res.data.data, username));
                    }
                }
            })
    }
}
// 验证密码提示问题
function setToken(token, history) {
    return {token, history, type: CHCEK_USER_QUESTION};
}
export function checkAnswer(answer, history) {
    return (dispatch, getState) => {
        const {username, question} = getState().userInfo.forgetPassword
        Axios
            .post('/user/forget_check_answer.do', Qs.stringify({username, question, answer}))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        // 请求成功，存储token
                        dispatch(setToken(res.data.data, history));
                    } else {
                        // 失败
                        dispatch(clearErrorMsg(res.data.msg))
                    }
                }
            })
    }

}

// 重置密码
function resetPwd(history) {
    return {history, type: RESET_PASSWORD}
}
export function resetPassword(passwordNew, history) {
    return (dispatch, getState) => {
        // username,passwordNew,forgetToken
        const {username, token} = getState().userInfo.forgetPassword;
        Axios
            .post('/user/forget_reset_password.do', Qs.stringify({username, passwordNew, forgetToken: token}))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        // 修改成功
                        dispatch(resetPwd(history))
                    } else if (res.data.status === 1 && res.data.msg === '修改密码操作失效') {
                        // 修改密码操作失效
                        dispatch(clearErrorMsg(res.data.msg));
                    } else {
                        // token失效 history.push('/pass-reset');
                        dispatch(clearErrorMsg('操作已超时'));
                    }
                }
            })
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

// 获取当前登录用户的详细信息，并强制登录
function getUserInfo_2(payload) {
    return {payload, type: GET_INFORMATION};
}
export function getUserInformation(history, pathname) {
    return dispatch => {
        Axios
            .post('/user/get_information.do')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        dispatch(getUserInfo_2({
                            ...res.data.data
                        }));
                    } else {
                        // 需要登录
                        history.push('/login');
                    }
                }
            })
    }
}

//修改当前用户的个人信息
function updateInfo(payload, history) {
    return {payload, history, type: UPDATE_INFORMATION};
}
export function updateUserInformation(information, history) {
    return dispatch => {
        Axios
            .post('/user/update_information.do', Qs.stringify({
            ...information
        }))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        // 更新成功
                        dispatch(updateInfo(res.data.data, history));
                    } else if (res.data.status === 1) {
                        // 需要登录
                        history.push('/login');
                    } else {
                        alert('error');
                    }
                }
            })
    }
}

// 登录状态下修改个人信息
export function passwordUpdate(passwordOld,passwordNew,message){
    return dispatch => {
        Axios.post('/user/reset_password.do',Qs.stringify({passwordOld,passwordNew})).then(res=>{
            if(res.status === 200){
                message.info(res.data.msg)
            }
        })
    }
}
