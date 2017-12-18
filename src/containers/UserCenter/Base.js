import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Base extends Component {
    render() {
        const {
            username,
            id,
            email,
            phone,
            question,
            answer
        } = this.props.userInformation;
        const isLogin = !username && !id
            ? (
                <div className="loading"></div>
            )
            : (
                <div className="user-info">
                    <div className="form-line">
                        <div className="label">
                            用户名：
                        </div>
                        <span className="text">{username}</span>
                    </div>
                    <div className="form-line">
                        <div className="label">
                            手机：
                        </div>
                        <span className="text">{phone}</span>
                    </div>
                    <div className="form-line">
                        <div className="label">
                            邮箱：
                        </div>
                        <span className="text">{email}</span>
                    </div>
                    <div className="form-line">
                        <div className="label">
                            问题：
                        </div>
                        <span className="text">{question}</span>
                    </div>
                    <div className="form-line">
                        <div className="label">
                            答案：
                        </div>
                        <span className="text">{answer}</span>
                    </div>
                    <div className="form-line">
                        <Link className="btn btn-submit" to='/usercenter/update'>编辑</Link>
                    </div>
                </div>
            );
        return (
            <div className="panel-body">
                {isLogin}
            </div>
        );
    }
}

export default Base;