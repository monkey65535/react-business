import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import Crumb from '../../components/Crumb/Crumb';
import Axios from 'axios';
import QS from 'qs';
import {message} from 'antd';
import './ListDetail.scss';
import {connect} from 'react-redux';
import {addGoodsToCart} from '../../reduxs/cart.redux';
@connect(state=>state,{addGoodsToCart})
class ListDetail extends Component {
    constructor() {
        super();
        this.state = {
            baseInfo: {
                id: '',
                categoryId: '',
                name: '',
                subtitle: '',
                mainImage: '',
                subImages: '',
                detail: '',
                price: '',
                stock: '',
                status: '',
                createTime: '',
                updateTime: ''
            },
            mainPic: '',
            buyNum: 1
        }
        this.handleInitMainPic = this
            .handleInitMainPic
            .bind(this);
        this.hadnleAddCart = this.hadnleAddCart.bind(this);
    }
    componentDidMount() {
        console.log(this.props.match.params);
        Axios
            .post('/product/detail.do', QS.stringify({productId: this.props.match.params.id}))
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    if (res.data.status === 0) {
                        this.setState({baseInfo: res.data.data, mainPic: res.data.data.mainImage})
                    }
                }
            })
    }
    handleChangeMainPic(picUrl) {
        this.setState({mainPic: picUrl})
    }
    handleInitMainPic() {
        const {mainImage} = this.state.baseInfo;
        this.setState({mainPic: mainImage})
    }
    handleChangeNum(type) {
        if (type !== 'plus' && type !== 'minus') 
            return;
        let {buyNum} = this.state;
        let {stock} = this.state.baseInfo;
        if (type === 'plus') {
            if(buyNum >= stock){
                message.info('商品数量不能大于库存');
                return;
            }
            this.setState({
                buyNum: ++buyNum
            })
        } else {
            if (buyNum <= 1) {
                message.info('商品数量不能小于1');
                return;
            } else {
                this.setState({
                    buyNum: --buyNum
                })
            }
        }
    }
    hadnleAddCart(){
        const productId = this.state.baseInfo.id;
        const count = this.state.buyNum;
        const {username,id} = this.props.userInfo.userAbout;
        if(!username || !id){
            this.props.history.push('/login');
        }else{
            this.props.addGoodsToCart({productId,count},this.props.history);
        }
    }
    render() {
        const crumb = [
            {
                name: this.state.baseInfo.name
            }
        ];
        const baseUrl = 'http://img.happymmall.com/';
        let {
            name,
            subtitle,
            subImages,
            detail,
            price,
            stock
        } = this.state.baseInfo;
        subImages = subImages.split(',');
        const subImgList = subImages.length > 0
            ? subImages.map((el, i) => (
                <li
                    className="p-img-item"
                    key={i}
                    onMouseEnter={this
                    .handleChangeMainPic
                    .bind(this, el)}>
                    <img className="p-img" src={`${baseUrl}/${el}`} alt="name"/>
                </li>
            ))
            : null;
        return (
            <div>
                <Nav></Nav>
                <Header></Header>
                <div className='list-detail-container'>
                    <Crumb crumbs={crumb}></Crumb>
                    <div className="page-wrap w">
                        <div className="intro-wrap">
                            <div className="p-img-con">
                                <div className="main-img-con">
                                    <img className="main-img" src={`${baseUrl}/${this.state.mainPic}`} alt={name}/>
                                </div>
                                <ul className="p-img-list">
                                    {subImgList}
                                </ul>
                            </div>
                            <div className="p-info-con">
                                <h1 className="p-name">{name}</h1>
                                <p className="p-subtitle">{subtitle}</p>
                                <div className="p-info-item p-price-con">
                                    <span className="label">价格:</span>
                                    <span className="info">￥{price}</span>
                                </div>
                                <div className="p-info-item">
                                    <span className="label">库存:</span>
                                    <span className="info">{stock}</span>
                                </div>
                                <div className="p-info-item p-count-con">
                                    <span className="label">数量:</span>
                                    <input className="p-count" value={this.state.buyNum} readOnly="readonly"/>
                                    <span className="p-count-btn plus" onClick={this.handleChangeNum.bind(this,'plus')}>+</span>
                                    <span className="p-count-btn minus" onClick={this.handleChangeNum.bind(this,'minus')}>-</span>
                                </div>
                                <div className="p-info-item">
                                    <a className="btn cart-add" onClick={this.hadnleAddCart}>加入购物车</a>
                                </div>
                            </div>
                        </div>
                        <div className="detail-wrap">
                            <div className="detail-tab-con">
                                <ul className="tab-list" onMouseLeave={this.handleInitMainPic}>
                                    <li className="tab-item active">详细描述</li>
                                </ul>
                            </div>
                            <div
                                className="detail-con"
                                dangerouslySetInnerHTML={{
                                __html: detail
                            }}></div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default ListDetail;