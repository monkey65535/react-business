import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
// eslint-disable-next-line
import {Link} from 'react-router-dom';
import Crumb from '../../components/Crumb/Crumb';
import {connect} from 'react-redux';
import {getProducts, initProductList} from '../../reduxs/goodList.redux';
import './List.scss';

@connect(state => state, {getProducts, initProductList})
class List extends Component {
    constructor() {
        super();
        this.state = {
            paramsType: '',
            paramsName: '',
            pageNum: 1,
            orderBy: 'default',
            list: []
        }
        this.handleGtePriductsList = this.handleGtePriductsList.bind(this);
    }
    handleGtePriductsList(){
        let params = this.props.match.params.to;
        let pageNum = this.props.match.params.page;
        const [paramsType,paramsName] = params.split('=');
        this.setState({paramsType, paramsName, pageNum});
        // 获取数据
        this
            .props
            .getProducts({paramsType, paramsName, pageNum, orderBy: this.state.orderBy})
    }
    componentDidMount() {
        this.handleGtePriductsList();
    }
    componentWillReceiveProps(){
        let params = this.props.match.params.to;
        const [paramsType,paramsName] = params.split('=');
        if (paramsName === this.state.paramsName && paramsType === this.state.paramsType) return ;
        this.handleGtePriductsList();
    }
    handleChangeSort(sortRule){
        if(sortRule === this.state.orderBy) return;
        this.setState({
            orderBy:sortRule 
        });
        const {paramsType, paramsName, pageNum, orderBy} = this.state;
        this.props.getProducts({paramsType, paramsName, pageNum, orderBy})
    }
    componentWillUnmount() {
        this
            .props
            .initProductList();
    }
    render() {
        const crumb = [
            {
                name: this.state.paramsType === 'keyword'
                    ? this.state.paramsName
                    : '商品列表'
            }
        ];
        const baseUrl = 'http://img.happymmall.com/';
        const {goodsList} = this.props;
        const goodsMap = goodsList.list.length > 0
            ? goodsList
                .list
                .map((el) => {
                    const {
                        id,
                        name,
                        subtitle,
                        mainImage,
                        price
                    } = el;
                    return (
                        <li className="p-item" key={id}>
                            <div className="p-img-con">
                                <Link to={`/list-detail/${id}`} className="link" target='_blank' alt={subtitle} style={{margin:0}}>
                                    <img className="p-img" src={`${baseUrl}/${mainImage}`} alt={subtitle}/>
                                </Link>
                            </div>
                            <div className="p-price-con">
                                <span className="p-price">¥{price}</span>
                            </div>
                            <div className="p-name-con">
                                <a
                                    href="./detail.html?productId=34"
                                    target="_blank"
                                    className="p-name"
                                    title={subtitle}>
                                    {name}
                                </a>
                            </div>
                        </li>
                    )
                })
            : (
                <div>暂无商品</div>
            )
        return (
            <div>
                <Nav></Nav>
                <Header
                    searchKey={this.state.paramsType === 'keyword'
                    ? this.state.paramsName
                    : ''}></Header>
                <div className="list-container">
                    <Crumb crumbs={crumb}></Crumb>
                    <div className="page-wrap w">
                        <ul className="sort-con">
                            <li className={`sort-item ${this.state.orderBy === 'default' ? 'active' : ''}`} onClick={this.handleChangeSort.bind(this,'default')}>推荐排序</li>
                            <li className={`sort-item ${this.state.orderBy !== 'default' ? 'active' : ''}`} onClick={this.handleChangeSort.bind(this,'price_desc')}>价格排序</li>
                        </ul>
                        <ul className="p-list-con">
                            {goodsMap}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;