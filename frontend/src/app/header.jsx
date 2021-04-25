import React from 'react';
import {Link} from 'react-router-dom';

export class Header extends React.Component{
    render(){
        return <>
            <div class="card text-white bg-dark mb-3 rounded-0">
                <div class="card-header text-right"><Link to={'/'}> Log Out </Link></div>
            </div>
        </>
    }
}