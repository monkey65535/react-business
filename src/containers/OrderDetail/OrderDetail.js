import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import Crumb from '../../components/Crumb/Crumb';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './OrderDetail.scss';
import {getOrderInfoFromId,cleanOrderInfo,deleteOrderToMap} from '../../reduxs/order.redux';

@connect(state => state.orderInfo, {getOrderInfoFromId,cleanOrderInfo,deleteOrderToMap})
class OrderDetail extends Component {
    componentDidMount() {
        const {orderId} = this.props.match.params;
        if (!orderId) {
            this
                .props
                .history
                .back();
        }
        this
            .props
            .getOrderInfoFromId(orderId);
    }
    componentWillUnmount(){
        this.props.cleanOrderInfo();
    }
    handleDeleteOrder(){
        const {orderNo} = this.props.orderDataInfo;
        if(!orderNo){
            alert('订单号获取失败');
            return;
        }
        this.props.deleteOrderToMap(orderNo,this.props.history);
    }
    render() {
        const crumb = [
            {
                name: '订单详情'
            }
        ];
        const {orderDataInfo} = this.props;
        const orderGoodsItem = orderDataInfo && orderDataInfo.orderItemVoList
            ? orderDataInfo
                .orderItemVoList
                .map((el, i) => {
                    console.log(el);
                    return (
                        <tr key={el.productId}>
                            <td className="cell cell-img">
                                <Link to={`/list-detail/${el.productId}`}>
                                    <img
                                        className="p-img"
                                        src={`http://img.happymmall.com/${el.productImage}`}
                                        alt={el.productName}/>
                                </Link>
                            </td>
                            <td className="cell cell-info">
                            <Link className="link" to={`/list-detail/${el.productId}`}>
                                {el.productName}
                            </Link>
                            </td>
                            <td className="cell cell-price">￥{el.currentUnitPrice}</td>
                            <td className="cell cell-count">{el.quantity}</td>
                            <td className="cell cell-total">￥{el.totalPrice}</td>
                        </tr>
                    )
                })
            : null;
        const orderDetail = orderDataInfo
            ? (
                <div className="content">
                    <div className="panel">
                        <div className="panel-title">订单信息</div>
                        <div className="panel-body">
                            <div className="order-info">
                                <div className="text-line">
                                    <span className="text">订单号：{orderDataInfo.orderNo}</span>
                                    <span className="text">创建时间：{orderDataInfo.createTime}</span>
                                </div>
                                <div className="text-line">
                                    <span className="text">
                                        收件人： {orderDataInfo.receiverName}
                                    </span>
                                </div>
                                <div className="text-line">
                                    <span className="text">订单状态： {orderDataInfo.statusDesc}</span>
                                </div>
                                <div className="text-line">
                                    <span className="text">支付方式：{orderDataInfo.paymentTypeDesc}</span>
                                </div>
                                <div className="text-line">
                                    <a className="btn" href={`./payment.html?orderNumber=${orderDataInfo.orderNo}`}>去支付</a>
                                    <a className="btn order-cancel" onClick={this.handleDeleteOrder.bind(this)}>取消订单</a>

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

                                    {orderGoodsItem}

                                </tbody>

                            </table>
                            <p className="total">
                                <span>订单总价：</span>
                                <span className="total-price">￥{orderDataInfo.payment}</span>
                            </p>
                        </div>
                    </div>
                </div>
            )
            : null;
        return (
            <div className="order-detail-container">
                <Nav></Nav>
                <Header></Header>
                <Crumb crumbs={crumb}></Crumb>
                <div className="page-wrap w">
                    {orderDetail}
                </div>
            </div>
        );
    }
}

export default OrderDetail;