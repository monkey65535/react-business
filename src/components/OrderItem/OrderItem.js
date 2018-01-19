import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getOrderList} from '../../reduxs/order.redux';
import {Link} from 'react-router-dom';

@connect(state => state.orderInfo, {getOrderList})
class OrderItem extends Component {
    componentDidMount() {
        this
            .props
            .getOrderList();
    }
    render() {
        const {orderItemVoList, imageHost, productTotalPrice} = this.props;
        const orderItem = orderItemVoList.map(el => {
            return (
                <tr key={el.productId}>
                    <td className="cell-img">
                        <a href="./detail.html?productId=productId" target="_blank">
                            <img className="p-img" src={`${imageHost}${el.productImage}`} alt={el.productName}/>
                        </a>
                    </td>
                    <td className="cell-info">
                        <a className="link" href="./detail.html?productId=productId" target="_blank">{el.productName}</a>
                    </td>
                    <td className="cell-price">￥{el.currentUnitPrice}</td>
                    <td className="cell-count">{el.quantity}</td>
                    <td className="cell-total">￥{el.totalPrice}</td>
                </tr>
            )
        })
        return (
            <div>
                <table className="product-table">
                    <tbody>
                        <tr>
                            <th className="cell-img">&nbsp;</th>
                            <th className="cell-info">商品描述</th>
                            <th className="cell-price">价格</th>
                            <th className="cell-count">数量</th>
                            <th className="cell-total">小计</th>
                        </tr>
                        {orderItem}
                    </tbody>
                </table>
                <div className="submit-con">
                    <span>订单总价:</span>
                    <span className="submit-total">￥{productTotalPrice}</span>
                    <span className="btn order-submit">提交订单</span>
                </div>
            </div>
        );
    }
}

export default OrderItem;