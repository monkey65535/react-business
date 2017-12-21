import React, {Component} from 'react';
import {message} from 'antd';
import {withRouter} from 'react-router-dom';
import './Header.scss';

@withRouter
class Header extends Component {
    constructor(){
        super();
        this.state = {
            searchKeyword:''
        }
        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.heandleKeyEnetr = this.heandleKeyEnetr.bind(this);
    }
    componentWillMount(){
        const {searchKey} = this.props;
        if(searchKey){
            this.setState({searchKeyword:searchKey})
        }
    }
    handleChangeKeyword(ev){
        this.setState({
            searchKeyword:ev.target.value
        })
    }
    handleSearchSubmit(){
        const {searchKeyword}  = this.state;
        if(!searchKeyword){
            message.info('请输入商品名称',2);
            return;
        }
        // 如果提交的时候有keyword，那么跳转到list
        this.props.history.push(`/list/keyword=${searchKeyword}`);
    }
    heandleKeyEnetr(ev){
        if(ev.keyCode === 13){
            this.handleSearchSubmit();
        }
    }
    render() {
        return (
            <div className="header">
                <div className="w">
                    <div className="logo">MMALL</div>
                    <div className="search-con">
                        <input type="text" className="search-input" id="search-input" onKeyUp={this.heandleKeyEnetr} onChange={this.handleChangeKeyword} placeholder="请输入商品名称" value={this.state.searchKeyword}/>
                        <button className="search-btn btn" id="search-btn" onClick={this.handleSearchSubmit}>搜索</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;