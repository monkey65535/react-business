import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {_cities} from '../../util/citys';
import {connect} from 'react-redux';
import {addAddressToUser} from '../../reduxs/address.redux';


const initState = {
    addressMessage: {
        receiverName: '',
        receiverProvince: '',
        receiverPhone: '',
        receiverMobile: '',
        receiverCity: '',
        receiverAddress: '',
        receiverZip: '',
        id: '',
        userId: ''
    },
    citys: [],
    activeId:-1
}

@connect(state=>state.addressInfo,{addAddressToUser})
class AddressInfo extends Component {
    constructor() {
        super();
        this.state = {
            ...initState
        }
        this.handleSubmitAddress = this.handleSubmitAddress.bind(this);
    }
    componentWillReceiveProps() {
        const {addressMessage} = this.props;
        this.setState({
            addressMessage: {
                ...this.state.addressMessage,
                ...addressMessage
            }
        })
    }
    handleChangeState = (key, ev) => {
        const {addressMessage} = this.state;
        const val = ev.target.value;
        this.setState({
            addressMessage: {
                ...addressMessage,
                [key]: val
            }
        });
    }
    handleCloseModel = () => {
        this
            .props
            .handleCloseModel();
    }
    handleChangeProvince(ev) {
        const {value} = ev.target;
        const {addressMessage} = this.state;
        if (value && value.trim()) {
            this.setState({
                addressMessage: {
                    ...addressMessage,
                    receiverProvince: value.trim()
                },
                citys: _cities.getCities(value.trim())
            })
        } else {
            this.setState({
                addressMessage: {
                    ...addressMessage,
                    receiverProvince: ''
                },
                citys: []
            })
        }
    }
    handleSubmitAddress(){
        this.props.addAddressToUser(this.state.addressMessage);
    }
    render() {
        const provinces = Object.keys(_cities.cityInfo);
        const provincesItem = provinces.map((el, i) => (
            <option value={el} key={i}>{el}</option>
        ));
        const citys = this
            .state
            .citys
            .map((el, i) => (
                <option value={el} key={i}>{el}</option>
            ));
        return (
            <div
                className="modal close"
                style={{
                'display': `${this.props.isShow
                    ? 'block'
                    : 'none'}`
            }}>
                <div className="modal-container">
                    <div className="modal-header">
                        <h1 className="modal-title">{this.props.isUpdate
                                ? '更新地址'
                                : '使用新地址'}</h1>
                        <i className="fa fa-close close" onClick={this.handleCloseModel}></i>
                    </div>
                    <div className="modal-body">
                        <div className="form">
                            <div className="form-line">
                                <label className="label" htmlFor="receiver-name">
                                    <span className="required">*</span>收件人姓名：
                                </label>
                                <input
                                    className="form-item"
                                    id="receiver-name"
                                    placeholder="请输入收件人姓名"
                                    value={this.state.receiverName}
                                    onChange={this
                                    .handleChangeState
                                    .bind(this, 'receiverName')}/>
                            </div>
                            <div className="form-line">
                                <label className="label" htmlFor="receiver-province">
                                    <span className="required">*</span>
                                    所在城市：
                                </label>
                                <select
                                    className="form-item"
                                    id="receiver-province"
                                    onChange={this
                                    .handleChangeProvince
                                    .bind(this)}>
                                    <option value="">请选择</option>
                                    {provincesItem}
                                </select>
                                <select
                                    className="form-item"
                                    id="receiver-city"
                                    onChange={this
                                    .handleChangeState
                                    .bind(this, 'receiverCity')}>
                                    <option value="">请选择</option>
                                    {citys}
                                </select>
                            </div>
                            <div className="form-line">
                                <label className="label" htmlFor="receiver-address">
                                    <span className="required">*</span>
                                    详细地址：
                                </label>
                                <input
                                    className="form-item"
                                    id="receiver-address"
                                    placeholder="请精确到门牌号"
                                    onChange={this
                                    .handleChangeState
                                    .bind(this, 'receiverAddress')}
                                    value={this.state.receiverAddress}/>
                            </div>
                            <div className="form-line">
                                <label className="label" htmlFor="receiver-phone">
                                    <span className="required">*</span>
                                    收件人手机：
                                </label>
                                <input
                                    className="form-item"
                                    id="receiver-phone"
                                    placeholder="请输入11位手机号"
                                    onChange={this
                                    .handleChangeState
                                    .bind(this, 'receiverPhone')}
                                    value={this.state.receiverPhone}/>
                            </div>
                            <div className="form-line">
                                <label className="label" htmlFor="receiver-zip">邮政编码：</label>
                                <input
                                    className="form-item"
                                    id="receiver-zip"
                                    placeholder="如：100000"
                                    onChange={this
                                    .handleChangeState
                                    .bind(this, 'receiverZip')}
                                    value={this.state.receiverZip}/>
                            </div>
                            <div className="form-line">
                                <input type="hidden" id="receiver-id" value={this.state.id}/>
                                <a className="btn address-btn" onClick={this.handleSubmitAddress}>保存收货地址</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddressInfo;