import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {userLogout,getUserInfo,getCartInfo} from '../../reduxs/userinfo.redux';
import './Nav.scss';

@withRouter
@connect(state => state.userInfo, {userLogout,getUserInfo,getCartInfo})
class Nav extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this
            .handleLogout
            .bind(this);
    }
    componentDidMount(){
        this.props.getUserInfo();
        this.props.getCartInfo();
    }
    handlePushLink(to) {
        const {history, match, location} = this.props;
        const urlMessage = {
            pathname: location.pathname,
            params: match.params
        }
        window
            .sessionStorage
            .setItem('pushLink', JSON.stringify(urlMessage));
        history.push(to);
    }
    handleLogout() {
        this
            .props
            .userLogout();
    }
    render() {
        const isUserLogin = this.props.userAbout.userName && this.props.userAbout.userId
            ? (
                <span className="user login">
                    <span className="link-text js-login">
                        欢迎，<span className="username">{this.props.userAbout.userName} 
                        </span>
                    </span>
                    <span className="link js-register" onClick={this.handleLogout}> 退出</span>
                </span>
            )
            : (
                <span className="user not-login">
                    <span
                        className="link js-login"
                        onClick={this
                        .handlePushLink
                        .bind(this, '/login')}>登录</span>
                    <span
                        className="link js-login"
                        onClick={this
                        .handlePushLink
                        .bind(this, '/register')}>注册</span>
                </span>
            )
        return (
            <div className="nav">
                <div className="w">
                    <div className="user-info">
                        {isUserLogin}
                    </div>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link className="link" to='/cart'>
                                <i className="fa fa-shopping-cart"></i> 购物车 
                                (<span className="cart-cont">{this.props.cartDate.cartProductVoList.length}</span>)
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="link" to='/orderlist'>我的订单</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="link" to='/usercenter'>我的Mmall</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="link" to='/about'>关于Mmall</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Nav;