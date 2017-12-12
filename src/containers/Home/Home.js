import React, {Component} from 'react';

import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import NavSide from '../../components/NavSide/NavSide';
class Home extends Component {
    render() {
        return (
            <div>
                <Nav></Nav>
                <Header></Header>
                <div className="page-warp w">
                    <NavSide></NavSide>
                    <div className="content with-nav"></div>
                </div>
            </div>
        );
    }
}

export default Home;