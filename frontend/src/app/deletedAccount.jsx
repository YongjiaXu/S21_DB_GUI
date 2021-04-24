import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export class DeletedAccount extends Component{
    render(){
        return <>
            <div className="signup-form">
                <form>
                    <h3>Account Deleted</h3>

                    <div className="exit-text">
                        <p>
                            Sorry it didn't work out. :(
                        </p>
                    </div>
                    <Link to={'/'}>Go to Login Page</Link>
                </form>
            </div>    
        </>
    }
}