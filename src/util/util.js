import {message} from 'antd';

const conf = {
    serverHost: ''
}
// 获取服务端地址
export function getServerUrl(path) {
    return conf.serverHost + path;
}
// 成功提示
export function successTips(msg) {
    message.success(msg || '操作成功');
}
// 错误提示
export function errorTips(msg) {
    message.error(msg || '哪里不对了哟~');
}

// 表单验证  支持非空判断，手机号码，邮箱验证
export function validate(value,type){
    value = value.trim();
    // 非空验证
    if(type === 'require'){
        return !!value;
    }

    // 验证手机号
    if(value === 'phone'){
        return /^1\d{10}$/.test(value);
    }
    //邮箱验证
    if(value === 'email'){
        return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
    }

}
//链接跳转
export function goLink({history, params, to}) {
    if (history && to) {
        if (params) {
            history.push(`${to}/${params}`);
        } else {
            history.push(to);
        }
    }
}