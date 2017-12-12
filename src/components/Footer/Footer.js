import React, {Component} from 'react';
import './Footer.scss';
class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="w">
                    <div className="links">
                        <a className="link" href="http://www.imooc.com" target="_blank" rel="noopener noreferrer">慕课网</a>
                        |
                        <a className="link" href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">百度</a>
                        |
                        <a className="link" href="https://www.taobao.com" target="_blank" rel="noopener noreferrer">淘宝</a>
                        |
                        <a className="link" href="https://www.zhihu.com" target="_blank" rel="noopener noreferrer">知乎</a>
                    </div>
                    <p className="copyright">
                        Copyright © 2017 happymmall.com All Right Reserved
                    </p>
                </div>
            </div>
        );
    }
}

export default Footer;