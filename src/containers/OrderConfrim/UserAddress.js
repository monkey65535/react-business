import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAddressLists, delAddress} from '../../reduxs/address.redux';

@connect(state => state.addressInfo, {getAddressLists, delAddress})
class UserAddress extends Component {
    constructor() {
        super();
        this.handleOpen = this
            .handleOpen
            .bind(this);
    }
    componentDidMount() {
        this
            .props
            .getAddressLists();
    }
    handleOpen(boolean, ev) {
        boolean = !!boolean;
        this
            .props
            .handleOpenModel(!!boolean);
        ev.stopPropagation();
    }
    render() {
        const {list} = this.props;
        const addressItem = list.map((el, i) => {
            return (
                <div
                    className={`address-item ${this.props.activeAddress === el.id
                    ? 'active'
                    : ''}`}
                    key={i}
                    onClick={() => {
                    this
                        .props
                        .handleActive(el.id);
                }}>
                    <div className="address-title">
                        {el.receiverProvince}
                        {el.receiverCity}
                    </div>
                    <div className="address-detail">
                        {el.receiverAddress}
                    </div>
                    <div className="address-opera">
                        <span
                            className="link address-update"
                            onClick={this
                            .handleOpen
                            .bind(this, true)}>编辑</span>
                        {el.id === this.props.activeAddress
                            ? ''
                            : (
                                <span
                                    className="link address-delete"
                                    onClick={(ev) => {
                                    ev.stopPropagation();
                                    if (window.confirm('确认删除')) {
                                        this
                                            .props
                                            .delAddress(el.id)
                                    }
                                }}>删除</span>
                            )}

                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="clearfix">
                    {addressItem}
                    <div
                        className="address-add"
                        onClick={this
                        .handleOpen
                        .bind(this, false)}>
                        <div className="address-new">
                            <i className="fa fa-plus"></i>
                            <div className="text">使用新地址</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserAddress;