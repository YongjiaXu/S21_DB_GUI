import React from 'react'
import {Link} from 'react-router-dom'

export class NewUser extends React.Component{
    render(){
        return<>
        <div className="signup-form">
            <form>
                <h2>New User</h2>
                <h3>Check your email to finish registering.</h3>
                <div className="form-group">
                        <Link to='/'
                            className="btn btn-success btn-lg btn-block"
                            style={{color:'white'}}>Return to Login</Link>
                    </div>
            </form>
            </div>
        </>
    }
}