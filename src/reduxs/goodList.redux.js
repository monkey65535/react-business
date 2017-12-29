import Axios from 'axios';
import QS from 'qs';
const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
const INIT_PRODUCT_LIST = 'INIT_PRODUCT_LIST';
// reducer
const initState = {
    pageNum: 1,
    pageSiez: 20,
    orderBy: 'default',
    keyword: '',
    categoryId: '',
    list: []
};
export function goodsList(state = initState, action) {
    switch (action.type) {
        case GET_PRODUCT_LIST:
            return {
                ...state,
                ...action.payload
            }
        case INIT_PRODUCT_LIST:
            return {
                ...initState
            }
        default:
            return state;
    }
}
// action creater
export function initProductList(){
    return {type : INIT_PRODUCT_LIST}
}
function getProductList({payload}) {
    return {payload, type: GET_PRODUCT_LIST};
}
export function getProducts({paramsType, paramsName, pageNum, orderBy}) {
    return dispatch => {
        let keyword = '';
        let categoryId = '';
        paramsType === 'keyword'
            ? keyword = paramsName
            : categoryId = paramsName;

        Axios
            .post('/product/list.do', QS.stringify({keyword, categoryId, pageNum, orderBy}))
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 0) {
                        dispatch(getProductList({payload: res.data.data}))
                    } else {
                        alert(res.data.msg);
                    }
                }
            })
    }
}