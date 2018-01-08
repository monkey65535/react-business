import React, {Component} from 'react';

class UserAddress extends Component {
    render() {
        return (
            <div>
                <div className="clearfix">
                    <div className="address-item active">
                        <div className="address-title">
                            fasldpfalsdpfl
                        </div>
                        <div className="address-detail">
                            fasdfa sdf asdf sad
                        </div>
                        <div className="address-opera">
                            <span className="link address-update">编辑</span>
                            <span className="link address-delete">删除</span>
                        </div>
                    </div>
                    <div className="address-add">
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