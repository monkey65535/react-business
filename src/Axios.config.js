// Axios拦截器
import {message} from 'antd';
import Axios from 'axios';
Axios.interceptors.request.use(config => {
    message.loading('加载中', 0);
    return config;
});


Axios.interceptors.response.use(config=>{
    message.destroy();
    return config;
})