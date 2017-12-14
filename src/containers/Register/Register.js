import React, {Component} from 'react';
import NavSimple from '../../components/NavSimple/NavSimple';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearErrorMsg,userRegister,checkUserName} from '../../reduxs/userinfo.redux';
import {validate} from '../../util/util';
@connect(state=>state,{clearErrorMsg,userRegister,checkUserName})
class Register extends Component {
    constructor() {
        super();
        this.state = {
            username:'',
            password:'',
            confirmPassword:'',
            phone:'',
            email:'',
            question:'',
            answer:''
        };
        this.handleSubmit = this
            .handleSubmit
            .bind(this);

        this.checkUsername = this.checkUsername.bind(this);
    }
    componentDidMount(){
        if(this.props.userInfo.errorMsg !== ''){
            this.props.clearErrorMsg('');
        }
    }
    
    handleChangeValue(key, ev) {
        if(this.props.userInfo.errorMsg !== ''){
            this.props.clearErrorMsg('');
        }
        const val = ev.target.value;
        this.setState({[key]: val})
    }
    handleSubmit() {
        const {username,password,confirmPassword,phone,email,question,answer} = this.state;
        const {history} = this.props;
        //表单验证
        if(!username.trim()){
            this.props.clearErrorMsg('请填写用户名');
            return;
        }
        if(!password.trim()){
            this.props.clearErrorMsg('请填写密码');
            return;
        }
        if(password.trim().length < 6){
            this.props.clearErrorMsg('密码长度不能小于6位');
            return;
        }
        if(password !== confirmPassword){
            this.props.clearErrorMsg('两次密码输入不一致');
            return;
        }
        if(!validate(phone,'phone')){
            this.props.clearErrorMsg('手机号码格式不正确');
            return;
        }
        if(!validate(email,'email')){
            this.props.clearErrorMsg('邮箱格式不正确');
            return;
        }
        if(!validate(question)){
            this.props.clearErrorMsg('提示问题不能为空');
            return;
        }
        if(!validate(answer)){
            this.props.clearErrorMsg('提示答案不能为空');
            return;
        }
        this.props.userRegister({username,password,confirmPassword,phone,email,question,answer},history);
    }
    checkUsername(ev){
        const username = ev.target.value;
        if(!username.trim()) return;
        this.props.checkUserName(username);
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
        const isLogin = this.props.userInfo.userAbout.username && this.props.userInfo.userAbout.username
            ? (
                <Redirect to="/"></Redirect>
            )
            : null;
        return (
            <div className="user-login-container">
                {isLogin}
                <NavSimple></NavSimple>
                <div className="page-wrap">
                    <div className="w">
                        <div className="user-con">
                            <div className="user-title">用户注册</div>
                            <div className="user-box">
                                {/*错误信息提示*/}
                                {showError}
                                <div className="user-item">
                                    <label className="user-label" htmlFor="username">
                                        <i className="fa fa-user"></i>
                                    </label>
                                    <input
                                        className="user-content"
                                        id="username"
                                        placeholder="请输入用户名"
                                        autoComplete="off"
                                        onChange={this
                                        .handleChangeValue
                                        .bind(this, 'username')}
                                        onBlur={this.checkUsername}
                                        />
                                </div>
                                <div className="user-item">
                                    <label className="user-label" htmlFor="password">
                                        <i className="fa fa-lock"></i>
                                    </label>
                                    <input
                                        type="password"
                                        className="user-content"
                                        id="password"
                                        placeholder="请输入密码"
                                        autoComplete="off"
                                        onChange={this
                                        .handleChangeValue
                                        .bind(this, 'password')}/>
                                </div>
                                <div className="user-item">
                                    <label className="user-label" htmlFor="password-confirm">
                                        <i className="fa fa-lock"></i>
                                    </label>
                                    <input
                                        type="password"
                                        className="user-content"
                                        id="password-confirm"
                                        placeholder="请重复输入密码"
                                        autoComplete="off"
                                        onChange={this
                                        .handleChangeValue
                                        .bind(this, 'confirmPassword')}/>
                                </div>
                                <div className="user-item">
                                    <label className="user-label" htmlFor="phone">
                                        <i className="fa fa-phone"></i>
                                    </label>
                                    <input
                                        className="user-content"
                                        id="phone"
                                        placeholder="请输入手机号"
                                        autoComplete="off"
                                        onChange={this
                                        .handleChangeValue
                                        .bind(this, 'phone')}/>
                                </div>
                                <div className="user-item">
                                    <label className="user-label" htmlFor="email">
                                        <i className="fa fa-envelope"></i>
                                    </label>
                                    <input
                                        className="user-content"
                                        id="email"
                                        placeholder="请输入邮箱"
                                        autoComplete="off"
                                        onChange={this
                                        .handleChangeValue
                                        .bind(this, 'email')}/>
                                </div>
                                <div className="user-item">
                                    <label className="user-label" htmlFor="question">
                                        <i className="fa fa-question"></i>
                                    </label>
                                    <input
                                        className="user-content"
                                        id="question"
                                        placeholder="请输入密码提示问题"
                                        autoComplete="off"
                                        onChange={this
                                        .handleChangeValue
                                        .bind(this, 'question')}/>
                                </div>
                                <div className="user-item">
                                    <label className="user-label" htmlFor="answer">
                                        <i className="fa fa-key"></i>
                                    </label>
                                    <input
                                        className="user-content"
                                        id="answer"
                                        placeholder="请输入密码提示问题答案"
                                        autoComplete="off"
                                        onChange={this
                                        .handleChangeValue
                                        .bind(this, 'answer')}/>
                                </div>
                                <div className="btn btn-submit" onClick={this.handleSubmit}>立即注册</div>
                                <div className="link-item">
                                    <Link className="link" to='/login'>已有帐号，去登录>></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;