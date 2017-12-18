import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import './NavSide.scss';
@withRouter
class NavSide extends Component {
    constructor() {
        super();
        this.state = {
            navOption: {
                name: '',
                navList: [
                    {
                        name: 'user-center',
                        desc: '个人中心',
                        to: '/usercenter'
                    }, {
                        name: 'order-list',
                        desc: '我的订单',
                        to: '/orderlist'
                    }, {
                        name: 'user-pass-update',
                        desc: '修改密码',
                        to: '/pass-reset'
                    }, {
                        name: 'about',
                        desc: '关于MMall',
                        to: '/about'
                    }
                ]
            }
        }
    }
    render() {
        // 渲染导航菜单
        const navList = this
            .state
            .navOption
            .navList
            .map(el => {
                const classname = `nav-item ${this.props.match.path === el.to ? 'active' : ''}`;
                return (
                    <li className={classname} key={el.name}>
                        <Link className="link" to={el.to}>{el.desc}</Link>
                    </li>
                )
            })
        return (
            <ul className="nav-side">
            {navList}
            </ul>
        );
    }
}

export default NavSide;