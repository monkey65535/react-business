import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import NavSide from '../../components/NavSide/NavSide';
import Base from './Base';
import Update from './Update';
import {Route,Link,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInformation,updateUserInformation} from '../../reduxs/userinfo.redux';
import './UserCenter.scss';
import {validate} from '../../util/util';
import {message} from 'antd';


@connect(state=>state,{getUserInformation,updateUserInformation})
class UserCenter extends Component {
    componentWillMount(){
        this.props.getUserInformation(this.props.history);
    }
    handleSubmit({phone,email,question,answer}){
        if(!validate(phone,'phone')){
            message.error('手机号码格式不正确')
            return;
        }
        if(!validate(email,'email')){
            message.error('邮箱格式不正确')
            return;
        }
        if(!question.trim()){
            message.error('提示问题不能为空')
            return;
        }
        if(!answer.trim()){
            message.error('答案不能为空')
            return;
        }
        this.props.updateUserInformation({phone,email,question,answer},this.props.history);
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
                            <div className="panel-title">个人中心</div>
                            <Route path='/usercenter' exact component={()=>(<Base userInformation={this.props.userInfo.userInformation}/>)}></Route>
                            <Route path='/usercenter/update' exact component={()=>(<Update userInformation={this.props.userInfo.userInformation} submit={this.handleSubmit.bind(this)}/>)}></Route>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCenter;