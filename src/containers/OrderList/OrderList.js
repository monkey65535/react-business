import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import Crumb from '../../components/Crumb/Crumb';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {orderListToMap} from '../../reduxs/order.redux';
import './OrderList.scss';

@connect(state => state.orderInfo, {orderListToMap})
class OrderList extends Component {
    componentDidMount() {
        this
            .props
            .orderListToMap();
    }
    render() {
        console.log(this.props);
        const crumb = [
            {
                name: '订单列表'
            }
        ];
        console.log(this.props);
        const {orderListInfo} = this.props;
        const ItemMap = orderListInfo.list && orderListInfo.list.length > 0
            ? orderListInfo
                .list
                .map((el, i) => {
                    const goodsMap = el
                        .orderItemVoList
                        .map(k => (
                            <tr key={k.orderNo}>
                                <td className="cell cell-img">
                                    <Link className="link" to={`/list-detail/${k.productId}`}><img className="p-img" src={`http://img.happymmall.com/${k.productImage}`} alt={k.productName}/></Link>
                                </td>
                                <td className="cell cell-info">
                                    <Link className="link" to={`/list-detail/${k.productId}`}>{k.productName}</Link>
                                </td>
                                <td className="cell cell-price">￥{k.currentUnitPrice}</td>
                                <td className="cell cell-count">{k.quantity}</td>
                                <td className="cell cell-total">￥{k.totalPrice}</td>
                            </tr>
                        ));
                    return (
                        <table className="order-list-table order-item" key={el.orderNo}>
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="order-info">
                                        <span className="order-text">
                                            <span>订单号：</span>
                                            <Link className="link order-num" to={`/order-detail/${el.orderNo}`}>{el.orderNo}</Link>
                                        </span>
                                        <span className="order-text">{el.createTime}</span>
                                        <span className="order-text">收件人：{el.receiverName}</span>
                                        <span className="order-text">订单状态：{el.statusDesc}</span>
                                        <span className="order-text">
                                            <span>订单总价：</span>
                                            <span className="order-total">￥{el.payment}</span>
                                        </span>
                                        <Link className="link order-detail" to={`/order-detail/${el.orderNo}`}>查看详情</Link>
                                    </td>
                                </tr>
                                {goodsMap}
                            </tbody>
                        </table>
                    )
                })
            : (
                <p className="err-tip">您暂时还没有订单</p>
            );
        return (
            <div className='order-list-container'>
                <Nav></Nav>
                <Header></Header>
                <Crumb crumbs={crumb}></Crumb>
                <div className="page-warp w">
                    <div className="panel">
                        <div className="panel-body">
                            <div className="order-list-con"></div>
                            <table className="order-list-table header">
                                <tbody>
                                    <tr>
                                        <th className="cell cell-img"></th>
                                        <th className="cell cell-info">商品信息</th>
                                        <th className="cell cell-price">单价</th>
                                        <th className="cell cell-count">数量</th>
                                        <th className="cell cell-total">小计</th>
                                    </tr>
                                </tbody>
                            </table>
                            {ItemMap}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderList;