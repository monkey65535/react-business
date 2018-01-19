import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAddressLists} from '../../reduxs/address.redux';


@connect(state => state.addressInfo, {getAddressLists})
class UserAddress extends Component {
    constructor(){
        super();
        this.handleOpen = this.handleOpen.bind(this);
    }
    componentDidMount() {
        this
            .props
            .getAddressLists();
    }
    handleOpen(boolean){
        boolean = !!boolean;
        this.props.handleOpenModel(!!boolean);
    }
    render() {
        const {list} = this.props;
        const addressItem = list.map((el,i) => {
            return (
                <div className="address-item active" key={i}>
                    <div className="address-title">
                        {el.receiverProvince} {el.receiverCity}
                    </div>
                    <div className="address-detail">
                        {el.receiverAddress}
                    </div>
                    <div className="address-opera">
                        <span className="link address-update" onClick={this.handleOpen.bind(this,true)}>编辑</span>
                        <span className="link address-delete">删除</span>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="clearfix">
                    {addressItem}
                    <div className="address-add" onClick={this.handleOpen.bind(this,false)}>
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