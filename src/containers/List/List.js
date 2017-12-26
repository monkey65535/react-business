import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
// eslint-disable-next-line
import {Link} from 'react-router-dom';
import Crumb from '../../components/Crumb/Crumb';
import './List.scss';

class List extends Component {

    render() {
        let params = this.props.match.params.to;
        const [paramsType,
            paramsName] = params.split('=');
        const crumb = [
            {
                name: paramsName
            }
        ]
        return (
            <div>
                <Nav></Nav>
                <Header
                    searchKey={paramsType === 'keyword'
                    ? paramsName
                    : ''}></Header>
                <div className="list-container">
                    <Crumb crumbs={crumb}></Crumb>
                    <div className="page-wrap w">
                        <ul className="sort-con">
                            <li className="sort-item active">默认排序</li>
                            <li className="sort-item">
                                <span>价格</span>
                                <i className="fa fa-sort-asc"></i>
                                <i className="fa fa-sort-desc"></i>
                            </li>
                        </ul>
                        <ul className="p-list-con"></ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;