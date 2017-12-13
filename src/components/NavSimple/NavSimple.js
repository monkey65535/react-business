import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NavSimple.scss';
class NavSimple extends Component {
    render() {
        return (
            <div className='nav-simple'>
                <div className="w">
                    <Link className="logo" to='/'>MMALL</Link>
                </div>
            </div>
        );
    }
}

export default NavSimple;