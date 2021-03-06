import React, {Component} from 'react';
import './OrderConfrim.scss';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import Crumb from '../../components/Crumb/Crumb';
import UserAddress from './UserAddress';
import OrderItem from './OrderItem';
import AddressModel from './AddressModel';
class OrderConfrim extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            isUpdate: false,
            activeAddress:-1,
            addressMessage: {
                receiverName: '',
                receiverPhone: '',
                receiverMobile: '',
                receiverProvince: '',
                receiverCity: '',
                receiverAddress: '',
                receiverZip: ''
            }
        }
        this.handleActive = this.handleActive.bind(this);
    }
    handleOpenModel(isUpdate) {
        isUpdate = !!isUpdate;
        this.setState({isShow: true, isUpdate: isUpdate})
    }
    handleCloseModel() {
        this.setState({isShow: false, isUpdate: false})
    }
    handleActive(activeId){
        this.setState({
            activeAddress:activeId
        });
    }
    render() {
        const crumb = [
            {
                name: '确认订单'
            }
        ];
        return (
            <div className='orderConfrim-container'>
                <Nav></Nav>
                <Header></Header>
                <Crumb crumbs={crumb}></Crumb>
                <div className="page-wrap w">
                    <div className="panel">
                        <h1 className="panel-title">收货地址</h1>
                        <div className="panel-body address-con">
                            <UserAddress
                                handleOpenModel={this
                                .handleOpenModel
                                .bind(this)
                            }
                            handleActive={this.handleActive}
                            activeAddress={this.state.activeAddress}
                            ></UserAddress>
                        </div>
                    </div>
                    <div className="panel">
                        <h1 className="panel-title">商品清单</h1>
                        <div className="panel-body product-con">
                            <OrderItem activeAddress={this.state.activeAddress}></OrderItem>
                        </div>
                    </div>
                </div>
                <div className="modal-wrap">
                    <AddressModel
                        isShow={this.state.isShow}
                        addressMessage={this.state.addressMessage}
                        isUpdate={this.state.isUpdate}
                        handleCloseModel={this
                        .handleCloseModel
                        .bind(this)}></AddressModel>
                </div>
            </div>
        );
    }
}

export default OrderConfrim;