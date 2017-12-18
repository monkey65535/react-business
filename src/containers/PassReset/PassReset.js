import React, {Component} from 'react';
import NavSimple from '../../components/NavSimple/NavSimple';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearErrorMsg,checkUserHasQuestion,checkAnswer,resetPassword} from '../../reduxs/userinfo.redux';

// 加载页面组件
import IsUser from './IsUser';
import IsQuestion from './IsQuestion';
import ResetPassword from './ResetPassword';

@connect(state => state, {clearErrorMsg,checkUserHasQuestion,checkAnswer,resetPassword})
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
    submitUsername(username, history=this.props.history) {
        if (!username) {
            this
                .props
                .clearErrorMsg('用户名不能为空');
            return;
        }
        //提交用户名验证
        this.props.checkUserHasQuestion(username,history);
    }
    submitQuestion(answer, history=this.props.history) {
        if (!answer) {
            this
                .props
                .clearErrorMsg('请输入密码提示答案');
            return;
        }
        // 提交
        this.props.checkAnswer(answer,history);
    }
    submitPassword({
        newPassword,
        confirmPassword
    }, history=this.props.history) {
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
        this.props.resetPassword(newPassword,history);
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
                                    component={() => (<IsQuestion question={this.props.userInfo.forgetPassword} cleanInput={this.props.clearErrorMsg} handleSubmit={this.submitQuestion}/>)}></Route>
                                <Route
                                    path='/pass-reset/password'
                                    component={() => (<ResetPassword question={this.props.userInfo.forgetPassword} cleanInput={this.props.clearErrorMsg} handleSubmit={this.submitPassword}/>)} ></Route>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PassReset;