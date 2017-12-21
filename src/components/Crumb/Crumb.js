import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Crumb extends Component {
    render() {
        const crumbsList = this.props.crumbs.map((el,i)=>{
            if(el.path){
                return (
                    <span key={i}>
                        <span>></span>
                        <Link className="link" to={el.path}>{el.name}</Link>
                    </span>
                )
            }else{
                return (
                    <span key={i}>
                        <span>></span>
                        <span className="link-text">{el.name}</span>
                    </span>
                )
            }
            
        })
        return (
            <div className="crumb">
            <div className="w">
                <div className="crumb-con">
                    <Link to='/' className='link'>MMall</Link>
                    {crumbsList}
                </div>
            </div>
        </div>
        );
    }
}

export default Crumb;