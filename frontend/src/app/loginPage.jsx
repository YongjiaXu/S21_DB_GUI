import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {UserRepository} from '../api/userRepository';
import { Header } from './header';

export class LoginPage extends React.Component {
    
    userRepository = new UserRepository();
    
    state = {
        id: 0,
        username: "",
        password: "",
        authenticated: null,
        type: 0
    };

    login() {
        if (this.state.username === '' || this.state.password === '')
            alert('Please enter all fields!');
        else {
            this.userRepository.login(this.state.username, this.state.password)
                .then(user => {
                    console.log(user);
                    if (user[0].userID !== undefined) {
                        console.log(user);
                        console.log('logged in');
                        this.setState({ authenticated: true });
                        this.setState({ id: user[0].userID });
                        this.setState({type: user[0].user_type})
                    }
                    else {
                        console.log('login failed');
                        this.setState({ authenticated: false });
                    }
                }).catch(e => {
                    console.log(e);
                    window.location.reload(false);
                });
        }
    }

    render () {
        return <>
            
            <Header loggedIn={ -1 } />

            <div className="signup-form">
                <form>
                    <h2>Login</h2>
                    
                    <div className="text-center" style={{ marginBottom: '.5rem' }}>Don't have an account? <Link to='/register'>Sign Up</Link> </div>
                    
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            name="username"
                            placeholder="username"
                            required="required"
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}/>
                    </div>
		
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            required="required"
                            value={this.state.password}
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                                />
                    </div>
                            
                    <div className="form-group">
                        <button type="button"
                            className="btn btn-success btn-lg btn-block"
                            onClick={() => this.login()}>Login</button>
                        <Link className="d-flex justify-content-center" to={'/Home/-1/-1'}>Browse without logging in</Link>
                    </div>
                    
                    {this.state.authenticated && this.state.type===1 && <Redirect to={'/UserDash/'+this.state.id} />}
                    {this.state.authenticated && this.state.type===2 && <Redirect to={'/AdminDash/'+this.state.id} />}
                    {this.state.authenticated && this.state.type===3 && <Redirect to={'/NPODashboard/'+this.state.id} />}
                    
                </form>
            </div>
        </>
    }
}