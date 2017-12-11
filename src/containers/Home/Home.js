import React, {Component} from 'react';
import Axios from 'axios';
import {message} from 'antd';
class Home extends Component {
    render() {
        Axios.get('./product/list.do?keyword=1').then(res=>{
            console.log('res',res);
        },rej=>{
            message.destroy();
        })
        return (
            <div>
                首页
                <i className="fa fa-user"></i>
            </div>
        );
    }
}

export default Home;