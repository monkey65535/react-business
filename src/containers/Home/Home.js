import React, {Component} from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import './Home.scss';
import HomeContainer from  './HomeContainer';
class Home extends Component {
    render() {
        return (
            <div>
                <Nav></Nav>
                <Header></Header>
                <HomeContainer></HomeContainer>
            </div>
        );
    }
}

export default Home;