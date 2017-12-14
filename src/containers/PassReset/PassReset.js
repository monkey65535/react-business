import React, {Component} from 'react';
import NavSimple from '../../components/NavSimple/NavSimple';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearErrorMsg,checkUserHasQuestion} from '../../reduxs/userinfo.redux';

// 加载页面组件
import IsUser from './IsUser';
import IsQuestion from './IsQuestion';
import ResetPassword from './ResetPassword';

@connect(state => state, {clearErrorMsg,checkUserHasQuestion})
class PassReset extends Component {
    constructor() {
        super();
        this.submitUsername = this
            .submitUsername
            .bind(this);
        this.submitQuestion = this
            .submitQuestion
            .bind(this);
        this.submitPassword = this
            .submitPassword
            .bind(this);
    }
    componentDidMount() {
        if (this.props.userInfo.errorMsg) {
            this
                .props
                .clearErrorMsg('');
        }
    }
    submitUsername(username, history) {
        if (!username) {
            this
                .props
                .clearErrorMsg('用户名不能为空');
            return;
        }
        //提交用户名验证
        this.props.checkUserHasQuestion(username,history);
    }
    submitQuestion({
        question,
        answer
    }, history) {
        if (!question || !answer) {
            this
                .props
                .clearErrorMsg('请输入密码提示问题和答案');
            return;
        }
        // 提交
    }
    submitPassword({
        oldPassword,
        newPassword,
        confirmPassword
    }, history) {
        if (!oldPassword) {
            this
                .props
                .clearErrorMsg('原密码不能为空');
            return;
        }
        if (!newPassword || newPassword.length < 6) {
            this
                .props
                .clearErrorMsg('新密码不能为空且不能少于6位');
            return;
        }
        if (newPassword !== confirmPassword) {
            this
                .props
                .clearErrorMsg('两次输入的新密码不一致');
            return;
        }
        // 提交新密码验证
    }
    render() {
        const {errorMsg} = this.props.userInfo;
        const showError = errorMsg !== ''
            ? (
                <div className="error-item">
                    <i className="fa fa-minus-circle error-icon"></i>
                    <div className="err-msg">{errorMsg}</div>
                </div>
            )
            : null;
        return (
            <div className="user-login-container">
                <NavSimple></NavSimple>
                <div className="page-wrap">
                    <div className="w">
                        <div className="user-con">
                            <div className="user-title">重置密码</div>
                            <div className="user-box">
                                {/*错误信息提示*/}
                                {showError}
                                <Route
                                    path='/pass-reset'
                                    exact
                                    component={() => (<IsUser cleanInput={this.props.clearErrorMsg} handleSubmit={this.submitUsername}/>)}></Route>
                                <Route
                                    path='/pass-reset/question'
                                    component={() => (<IsQuestion cleanInput={this.props.clearErrorMsg} handleSubmit={this.submitQuestion}/>)}></Route>
                                <Route
                                    path='/pass-reset/password'
                                    component={() => (<ResetPassword cleanInput={this.props.clearErrorMsg}/>)} handleSubmit={this.submitPassword}></Route>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PassReset;