import React from 'react';
import {UserRepository} from '../api/userRepository';
import {CreateAccount} from './createAccount';
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
                <div className="container float-right">
                                <div className="row">
                                    <div className="col-5 col-5 mx-auto">
                                        <div className="card card-signin flex-row my-5">
                                            <div className="card-body">
                                                <div>
                                                    <p className="grey-text text-darken-1">
                                                        Create new account?
                                                    </p>
                                                </div>
                                                <h5 className="card-title text-center">Login</h5>
                                                <form className="form-signin" onSubmit={this.onSubmit}>
                                                    <div className="form-label-group">
                                                        <input
                                                            onChange={this.onChange}
                                                            value={this.state.email}
                                                            id="email"
                                                            type="email"
                                                        />
                                                        <label htmlFor="email">Email</label>
                                                    </div>
                                                        
                                                    <div className="form-label-group">
                                                        <input
                                                            onChange={this.onChange}
                                                            value={this.state.password}
                                                            id="password"
                                                            type="password"
                                                        />
                                                        <label htmlFor="password">Password</label>
                                                    </div>
                                                        
                                                    <hr/>
                                                        
                                                        <button className="btn btn-lg btn-primary btn-block text-uppercase"
                                                                type="submit">Login
                                                        </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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