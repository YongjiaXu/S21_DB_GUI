import React from 'react';
import {Link} from "react-router-dom";
import {UserRepository} from '../api/userRepository';
import { CreateAccount } from './createAccount';

export class LoginPage extends React.Component {
    //userRepository = new UserRepository();
    state = {
        users : [],
        specific_user: ''
    }

    // login(user, password){
    //     this.userRepository.getUser(user)
    //         .then()
    // }

    render () {
        return <>
                <div className="signup-form">
                <form>
                    <h2>Login</h2>
                    
                    <div className="text-center" style={{ marginBottom: '.5rem' }}>Don't have an account? <Link to = '/register'>Sign Up</Link> </div>
                    
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="Email" required="required"/> 
                            </div>
		
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" placeholder="Password" required="required" />
                            </div>
                            
                            <div className="form-group">
                                <button type="submit" className="btn btn-success btn-lg btn-block">Register Now</button>
                            </div>
                        </form>
                    </div>
        </>
    }
    // componentDidMount() {
    //     this.userRepository.getUsers()
    //         .then( users => this.setState({users: users}));
    //     let username = 'npo';
    //     this.userRepository.getUser(username)
    //         .then( user => {
    //             this.setState({specific_user: user[0].username});
    //         });
    // }
}