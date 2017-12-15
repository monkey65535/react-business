import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
class IsQuestion extends Component {
    constructor() {
        super();
        this.state = {
            answer: ''
        }
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSub = this
            .handleSub
            .bind(this);
    }
    handleChange(ev) {
        let answer = ev.target.value;
        this.setState({answer});
    }
    handleSub() {
        this
            .props
            .handleSubmit(this.state.answer);
    }
    render() {
        const isUsername = !this.props.question.username ? (<Redirect to="/pass-reset"></Redirect>) : null;
        return (
            <div>
            {isUsername}
                <div className="user-item">
                    <div className="user-item-text">密码提示问题是：<span className="question">{this.props.question.question}</span>
                    </div>
                </div>
                <div className="user-item">
                    <label className="user-label" htmlFor="username">
                        <i className="fa fa-key"></i>
                    </label>
                    <input
                        className="user-content"
                        id="answer"
                        placeholder="请输入密码提示答案"
                        onChange={this.handleChange}
                        autoComplete="off"/>
                </div>
                <div className="btn btn-submit" id="submit" onClick={this.handleSub}>下一步</div>
            </div>
        );
    }
}

export default IsQuestion;