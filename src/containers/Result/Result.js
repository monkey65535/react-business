import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import NavSimple from '../../components/NavSimple/NavSimple';
import './Result.scss';
class Result extends Component {
    render() {
        const {params} = this.props.match;
        let text = '';
        if(params.type === 'register'){
            text = '注册'
        }else if(params.type === 'success') {
            text = '操作'
        }else{
            text = '';
        }
        // 判断params.type,如果没有则返回index
        const isParams = text ? null : (<Redirect to='/'></Redirect>)
        return (
            <div>
                {isParams}
                <NavSimple></NavSimple>
                <div className="page-wrap w">
                    <div className="result-con">
                        <h1 className="result-title">恭喜您，{text}成功</h1>
                        <div className="result-content">
                            <Link className="link" to='/'>回到首页</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;