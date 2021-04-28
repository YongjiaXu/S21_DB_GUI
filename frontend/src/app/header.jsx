import React from 'react';
import {Link} from 'react-router-dom';

export class Header extends React.Component{
    render(){
        return <>
            <div className="card text-white bg-dark mb-3 rounded-0">
                <div className="card-header text-right">
                    <h2 className="text-center">Clarity of Charity</h2>
                    {this.props.loggedIn !== -1 && <Link to={'/'}> Log Out </Link>}
                </div>
                
            </div>
        </>
    }
}