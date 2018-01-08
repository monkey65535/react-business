import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {message, Modal} from 'antd';

class CartGoodItem extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        }
        this.handleChecked = this
            .handleChecked
            .bind(this);
    }
    handleShowModel = () => {
        this.setState({visible: true});
    }
    handleOk = (e) => {
        const {productId} = this.props.info;
        this
            .props
            .deleteGoodsToCart([productId]);
        this.setState({visible: false});
    }
    handleCancel = (e) => {
        this.setState({visible: false});
    }
    handleChangeGoodsNum(type) {
        let {quantity, productStock, productId} = this.props.info;
        let newNum = 0;
        if (type === '+') {
            newNum = ++quantity;
            if (newNum > productStock) {
                message.error('超出库存');
                return;
            }
        } else {
            newNum = --quantity;
            if (newNum <= 0) {
                message.error('不能少于1件商品');
                return;
            }
        }
        this
            .props
            .updateGoodsToCart(productId, newNum);
    }
    handleChecked() {
        const {productChecked, productId} = this.props.info;
        if(productChecked === 1){
            this.props.unSelectGoodsToCart(productId);
        }else{
            this.props.selectGoodsToCart(productId);
        }
    }
    render() {
        const host = this.props.host;
        const {
            productName,
            productPrice,
            quantity,
            productStock,
            productTotalPrice,
            productId,
            productMainImage,
            productChecked
        } = this.props.info;
        return (
            <tr>
                <td className="cart-cell cell-check">
                    <label className="cart-label">
                        {/*<input type="checkbox" className="cart-select" checked/>*/}
                        <input
                            type="checkbox"
                            className="cart-select"
                            checked={productChecked === 1
                            ? 'checked'
                            : ''} 
                            onClick={this.handleChecked}
                        />
                    </label>
                </td>
                <td className="cart-cell cell-img">
                    <Link className="Link" to={`/list-detail/${productId}`}>
                        <img className="p-img" src={`${host}/${productMainImage}`} alt={productName}/>
                    </Link>
                </td>
                <td className="cart-cell cell-info">
                    <a className="link" href="">{productName}</a>
                </td>
                <td className="cart-cell cell-price">{productPrice}</td>
                <td className="cart-cell cell-count">
                    <span
                        className="count-btn minus"
                        onClick={this
                        .handleChangeGoodsNum
                        .bind(this, '-')}>-</span>
                    <input
                        className="count-input"
                        value={quantity}
                        data-max={productStock}
                        readOnly/>
                    <span
                        className="count-btn plus"
                        onClick={this
                        .handleChangeGoodsNum
                        .bind(this, '+')}>+</span>
                </td>
                <td className="cart-cell cell-total">{productTotalPrice}</td>
                <td className="cart-cell cell-opera">
                    <span className="link cart-delete" onClick={this.handleShowModel}>删除</span>
                </td>
                <Modal
                    title="提示"
                    cancelText="取消"
                    okText="确定"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>确定要删除么？</Modal>
            </tr>
        );
    }
}

export default CartGoodItem;