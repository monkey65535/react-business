import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getOrderList,createOrderToList} from '../../reduxs/order.redux';
import {Link,withRouter} from 'react-router-dom';

@withRouter
@connect(state => state.orderInfo, {getOrderList,createOrderToList})
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
                    <Link to={`/list-detail/${el.productId}`} className='link'>
                        <img className="p-img" src={`${imageHost}${el.productImage}`} alt={el.productName}/>
                    </Link>
                    </td>
                    <td className="cell-info">
                        <Link to={`/list-detail/${el.productId}`} className='link'>
                            {el.productName}
                        </Link>
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
                    <span className="btn order-submit" onClick={()=>{
                        if(this.props.activeAddress < 1){
                            alert('请选择收货地址');
                            return;
                        }
                        this.props.createOrderToList(this.props.activeAddress,this.props.history);
                    }}>提交订单</span>
                </div>
            </div>
        );
    }
}

export default OrderItem;