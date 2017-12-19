import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import NavSide from '../../components/NavSide/NavSide';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInformation,passwordUpdate} from '../../reduxs/userinfo.redux';
import {message} from 'antd';


@connect(state=>state,{getUserInformation,passwordUpdate})
class PassUpdate extends Component {
    constructor(){
        super();
        this.state = {
            old:'',
            Pwd:'',
            confrimPwd:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
        this.props.getUserInformation(this.props.history);
    }
    handleChangeVal(key,ev){
        const val = ev.target.value;
        this.setState({[key]:val})
    }
    handleSubmit(){
        const {old,Pwd,confrimPwd} = this.state;
        if(!old){
            message.error('请输入原密码');
            return;
        }
        if(!Pwd || Pwd.length < 6){
            message.error('请输入长度至少为6位的新密码');
            return;
        }
        if(Pwd !== confrimPwd){
            message.error('两次输入的密码不一致');
            return;
        }
        this.props.passwordUpdate(old,Pwd,message);
    }
    render() {
        return (
            <div>
                <Nav></Nav>
                <Header></Header>
                <div className="crumb">
                    <div className="w">
                        <div className="crumb-con">
                            <Link to='/' className='link'>MMall</Link>
                            <span>></span>
                            <span className="link-text">{`个人中心`}</span>
                        </div>
                    </div>
                </div>
                <div className="page-wrap w" style={{textAlign:"left",marginTop:'0'}}>
                    <NavSide></NavSide>
                    <div className="content with-nav">
                        <div className="panel">
                            <div className="panel-title">修改密码</div>
                            <div className="user-info">
                                <div className="form-line">
                                    <div className="label">
                                        旧密码：
                                    </div>
                                    <input type="text" className="input" autoComplete="off" value={this.state.old} onChange={this.handleChangeVal.bind(this,'old')}/>
                                </div>
                                <div className="form-line">
                                    <div className="label">
                                        新密码：
                                    </div>
                                    <input type="text" className="input" autoComplete="off" value={this.state.Pwd} onChange={this.handleChangeVal.bind(this,'Pwd')}/>
                                </div>
                                <div className="form-line">
                                    <div className="label">
                                        重复密码：
                                    </div>
                                    <input type="text" className="input" autoComplete="off" value={this.state.confrimPwd} onChange={this.handleChangeVal.bind(this,'confrimPwd')}/>
                                </div>
                                <div className="form-line">
                                    <span className="btn btn-submit" onClick={this.handleSubmit}>提交</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PassUpdate;