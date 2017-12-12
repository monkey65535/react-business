import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NavSide.scss';
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
                        to: './usercenter'
                    }, {
                        name: 'order-list',
                        desc: '我的订单',
                        to: './orderlist'
                    }, {
                        name: 'user-pass-update',
                        desc: '修改密码',
                        to: './userPassUpdate'
                    }, {
                        name: 'about',
                        desc: '关于MMall',
                        to: './about'
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
            .map(el => (
                <li className="nav-item" key={el.name}>
                    <Link className="link" to={el.to}>{el.desc}</Link>
                </li>
            ))
        return (
            <ul className="nav-side">
            {navList}
            </ul>
        );
    }
}

export default NavSide;