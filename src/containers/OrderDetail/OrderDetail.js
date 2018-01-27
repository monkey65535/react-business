import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import Crumb from '../../components/Crumb/Crumb';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './OrderDetail.scss';

@connect(state=>state.orderInfo,null)
class OrderDetail extends Component {
    render() {
        const crumb = [
            {
                name: '订单详情'
            }
        ];
        return (
            <div className="order-detail-container">
                <Nav></Nav>
                <Header></Header>
                <Crumb crumbs={crumb}></Crumb>
                <div className="page-wrap w">
                    <div className="content">
                        <div className="panel">
                            <div className="panel-title">订单信息</div>
                            <div className="panel-body">
                                <div className="order-info">
                                    <div className="text-line">
                                        <span className="text">订单号：orderNo</span>
                                        <span className="text">创建时间：createTime</span>
                                    </div>
                                    <div className="text-line">
                                        <span className="text">
                                            收件人： receiverName shippingVo.receiverProvince shippingVo.receiverCity
                                            shippingVo.receiverAddress shippingVo.receiverMobile
                                        </span>
                                    </div>
                                    <div className="text-line">
                                        <span className="text">订单状态： statusDesc</span>
                                    </div>
                                    <div className="text-line">
                                        <span className="text">支付方式：paymentTypeDesc</span>
                                    </div>
                                    <div className="text-line">

                                        <a className="btn" href="./payment.html?orderNumber=orderNo">去支付</a>

                                        <a className="btn order-cancel">取消订单</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel">
                            <div className="panel-title">商品清单</div>
                            <div className="panel-body">
                                <table className="product-table">
                                    <tbody>

                                        <tr>
                                            <th className="cell-th cell-img">&nbsp;</th>
                                            <th className="cell-th cell-info">商品信息</th>
                                            <th className="cell-th cell-price">单价</th>
                                            <th className="cell-th cell-count">数量</th>
                                            <th className="cell-th cell-total">小计</th>
                                        </tr>

                                        <tr>
                                            <td className="cell cell-img">
                                                <a href="./detail.html?productId=productId" target="_blank">
                                                    <img className="p-img" src="imageHostproductImage" alt="productName"/>
                                                </a>
                                            </td>
                                            <td className="cell cell-info">
                                                <a className="link" href="./detail.html?productId=productId" target="_blank">productName</a>
                                            </td>
                                            <td className="cell cell-price">￥currentUnitPrice</td>
                                            <td className="cell cell-count">quantity</td>
                                            <td className="cell cell-total">￥totalPrice</td>
                                        </tr>

                                    </tbody>

                                </table>
                                <p className="total">
                                    <span>订单总价：</span>
                                    <span className="total-price">￥payment</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderDetail;