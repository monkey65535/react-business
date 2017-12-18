import React, {Component} from 'react';
class Update extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            phone:'',
            email:'',
            question:'',
            answer:''
        }
        this.handleSub = this.handleSub.bind(this);
    }
    componentWillMount(){
        this.setState({...this.props.userInformation})
    }
    handleChangeVal(key,ev){
        this.setState({[key]:ev.target.value})
    }
    handleSub(){
        this.props.submit({...this.state});
    }
    render() {
        return (
            <div className="user-info">
                <div className="form-line">
                    <div className="label">
                        用户名：
                    </div>
                    <span className="text">{this.state.username}</span>
                </div>
                <div className="form-line">
                    <div className="label">
                        手机：
                    </div>
                    <input type="text" className="input" id="phone" autoComplete="off" value={this.state.phone} onChange={this.handleChangeVal.bind(this,'phone')}/>
                </div>
                <div className="form-line">
                    <div className="label">
                        邮箱：
                    </div>
                    <input type="text" className="input" id="email" autoComplete="off" value={this.state.email} onChange={this.handleChangeVal.bind(this,'email')}/>
                </div>
                <div className="form-line">
                    <div className="label">
                        问题：
                    </div>
                    <input type="text" className="input" id="question" autoComplete="off" value={this.state.question} onChange={this.handleChangeVal.bind(this,'question')}/>
                </div>
                <div className="form-line">
                    <div className="label">
                        答案：
                    </div>
                    <input type="text" className="input" id="answer" autoComplete="off" value={this.state.answer} onChange={this.handleChangeVal.bind(this,'answer')}/>
                </div>
                <div className="form-line">
                    <span className="btn btn-submit" onClick={this.handleSub}>提交</span>
                </div>
            </div>
        );
    }
}

export default Update;