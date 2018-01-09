import React, {Component} from 'react';
import PropTypes from 'prop-types';
const initState = {
    addressMessage: {
        receiverName: '',
        province: '',
        city: '',
        receiverAddress: '',
        receiverZip: '',
        id: ''
    }
}
class AddressInfo extends Component {
    constructor() {
        super();
        this.state = {
            ...initState
        }
    }
    componentWillReceiveProps(){
        const {addressMessage} = this.props;
        this.setState({
            addressMessage:{
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
        this.props.handleCloseModel();
    }
    render() {
        return (
            <div className="modal close" style={{
                'display':`${this.props.isShow?'block':'none'}`
            }}>
                <div className="modal-container">
                    <div className="modal-header">
                        <h1 className="modal-title">{this.props.isUpdate ? '更新地址' : '使用新地址'}</h1>
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
                                <select className="form-item" id="receiver-province">
                                    <option value="">请选择</option>
                                </select>
                                <select className="form-item" id="receiver-city">
                                    <option value="">请选择</option>
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
                                <a className="btn address-btn">保存收货地址</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AddressInfo.propTypes = {
    isShow: PropTypes.bool.isRequired,
    addressMessage: PropTypes.object.isRequired,
    isUpdate: PropTypes.bool.isRequired
}
export default AddressInfo;