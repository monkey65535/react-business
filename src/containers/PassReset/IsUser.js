import React, {Component} from 'react';

class componentName extends Component {
    constructor(){
        super();
        this.state = {
            username:''
        }
        this.submitUsername = this.submitUsername.bind(this);
    }
    handleInput(ev){
        this.setState({username:ev.target.value})
    }
    submitUsername(ev){
        const {username} =this.state;
        const {history} = this.props;
        this.props.handleSubmit(username,history);
    }
    render() {
        return (
            <div>
                <div className="user-item">
                    <label className="user-label" htmlFor="username">
                        <i className="fa fa-user"></i>
                    </label>
                    <input
                        className="user-content"
                        id="username"
                        placeholder="请输入用户名"
                        autoComplete="off" onChange={this.handleInput.bind(this)}/>
                </div>
                <div className="btn btn-submit" id="submit" onClick={this.submitUsername}>下一步</div>
            </div>
        );
    }
}

export default componentName;