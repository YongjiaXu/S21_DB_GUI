import React from 'react';
import {Link} from 'react-router-dom';

export class Header extends React.Component{
    render(){
        return<>
            <nav> 
                <ul id="head" className="breadcrumb">
                    <li id="head"className="breadcrumb-item active"><Link to={'/'}> Log Out </Link></li>
                </ul>
            </nav>
        </>
    }
}