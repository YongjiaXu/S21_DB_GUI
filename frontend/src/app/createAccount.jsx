import React from 'react';
import {Link, Redirect} from "react-router-dom";
import { UserRepository } from '../api/userRepository';
import "./login-signup.css";

export class CreateAccount extends React.Component{

    userRepository = new UserRepository();
    
    state = {
        username: "",
        email: "",
        password: "",
        password2: "",
        success: false
    };

    onRegister(username, email, password, password2) {

        if (this.state.username == ''
            //|| this.state.email !== ''
            || this.state.password == '')
            alert('Please enter all fields');
        else if (this.state.password !== this.state.password2)
            alert('Passwords do not match');


        else{
            this.userRepository.register(username, email, password)
                .then(user => {
                    console.log(user.id);
                    this.setState({ success: true });
                });
        }
    }

    render(){
        return <>
        
            <div className="signup-form">
                <form>
                    <h2>Sign Up</h2>
                    
                    <div className="text-center" style={{ marginBottom: '.5rem' }}>Already have an account? <Link to='/login'>Login</Link></div>
                    <div className="form-group">
                        
                        <input type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Username"
                            required="required"
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input type="email"
                            className="form-control"
                            id="email" name="email"
                            placeholder="Email"
                            required="required"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}/>
                    </div>
		
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password"
                            required="required"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}/>
                    </div>
                            
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            id="confirm_password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            required="required"
                            value={this.state.password2}
                            onChange={e => this.setState({ password2: e.target.value })} />
                    </div>

                    <div>radio input</div>

                    {this.state.radio=='2' && <npocreate/>}
                            
                    <div className="form-group">
                        <button type="button"
                            className="btn btn-success btn-lg btn-block"
                            onClick={() => this.onRegister(this.state.username, this.state.email, this.state.password, this.state.password2)}>Register</button>
                        
                        {this.state.success && <Redirect to={'/login/'} />}

                    </div>
                </form>
            </div>
        </>
        }
}