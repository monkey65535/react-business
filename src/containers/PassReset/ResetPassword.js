import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
class ResetPassword extends Component {
    constructor(){
        super();
        this.state = {
            password:'',
            confirmPassword:''
        }
        this.handleSub = this.handleSub.bind(this);
    }
    handleChange(key,ev){
        this.setState({
            [key]:ev.target.value
        })
    }
    handleSub(){
        const {password,confirmPassword} = this.state;
        this.props.handleSubmit({newPassword:password,confirmPassword:confirmPassword});
    }
    render() {
        const isUsername = !this.props.question.username
            ? (
                <Redirect to="/pass-reset"></Redirect>
            )
            : null;
        return (
            <div>
                {isUsername}
                <div className="user-item">
                    <label className="user-label" htmlFor="username">
                        <i className="fa fa-key"></i>
                    </label>
                    <input
                        type="password"
                        className="user-content"
                        id="password"
                        placeholder="请输入密码"
                        autoComplete="off"
                        onChange={this.handleChange.bind(this,'password')}
                        />
                </div>
                <div className="user-item">
                    <label className="user-label" htmlFor="username">
                        <i className="fa fa-key"></i>
                    </label>
                    <input
                        type="password"
                        className="user-content"
                        id="confirm-password"
                        placeholder="请输入再次密码"
                        onChange={this.handleChange.bind(this,'confirmPassword')}
                        autoComplete="off"/>
                </div>
                <div className="btn btn-submit" id="submit" onClick={this.handleSub}>下一步</div>
            </div>
        );
    }
}

export default ResetPassword;