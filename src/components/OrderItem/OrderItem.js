import React, {Component} from 'react';

class OrderItem extends Component {
    render() {
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
                        <tr>
                            <td className="cell-img">
                                <a href="./detail.html?productId=productId" target="_blank">
                                    <img className="p-img" src="imageHostproductImage" alt="productName"/>
                                </a>
                            </td>
                            <td className="cell-info">
                                <a className="link" href="./detail.html?productId=productId" target="_blank">productName</a>
                            </td>
                            <td className="cell-price">￥currentUnitPrice</td>
                            <td className="cell-count">quantity</td>
                            <td className="cell-total">￥totalPrice</td>
                        </tr>
                    </tbody>
                </table>
                <div className="submit-con">
                    <span>订单总价:</span>
                    <span className="submit-total">￥productTotalPrice</span>
                    <span className="btn order-submit">提交订单</span>
                </div>
            </div>
        );
    }
}

export default OrderItem;