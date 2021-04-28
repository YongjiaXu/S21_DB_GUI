import React from 'react';
import {Link, Redirect} from "react-router-dom";
import { NPORepository } from '../api/npoRepository';
import { UserRepository } from '../api/userRepository';
import { Header } from './header';
import "./login-signup.css";

export class CreateAccount extends React.Component{

    userRepository = new UserRepository();
    npoRepository = new NPORepository();

    
    state = {
        username: "",
        password: "",
        password2: "",
        user_type: 1,
        success: false,

        npo_title: "",
        npo_location: "",
        npo_logoUrl: "",
        npo_description: ""
    };

    onRegister() {
        
        if (this.state.username === ''
            || this.state.password === ''
            || this.state.passwor2 === '')
            alert('Please enter all fields');
        else if (this.state.password !== this.state.password2)
            alert('Passwords do not match');


        else {
            console.log("userType: " + this.state.user_type);
            this.userRepository.register(this.state.username, this.state.password, this.state.user_type,
                this.state.npo_title, this.state.npo_location, this.state.npo_logoUrl, this.state.npo_description)
                .then(user => {
                    this.setState({ success: true });
                });
        }
    }

    NPOForm(radioVal) {
        if (radioVal == 3) {
            return <>
                
                <div className="form-group">
                    <input type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required="required"
                        value={this.state.npo_title}
                        onChange={e => this.setState({ npo_title: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        placeholder="Location"
                        required="required"
                        value={this.state.npo_location}
                        onChange={e => this.setState({ npo_location: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                        className="form-control"
                        id="logo_url"
                        name="logo_url"
                        placeholder="Logo URL"
                        required="required"
                        value={this.state.npo_logoUrl}
                        onChange={e => this.setState({ npo_logoUrl: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <textarea type="text"
                        className="form-control"
                        id="npo_description"
                        name="npo_description"
                        placeholder="Description"
                        required="required"
                        value={this.state.npo_description}
                        onChange={e => this.setState({ npo_description: e.target.value })}
                    />
                </div>

            </>;
        }
    }

    render(){
        return <>
        
        <Header loggedIn={ -1 } />
        
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
                    <input type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required="required"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })} />
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

                <div className="form-group">
                    <label htmlFor="type">Account type: </label>

                    <select name="user_types"
                        id="user_types"
                        onChange={e => this.setState({ user_type: parseInt(e.target.value) })}>
                        <option value="1">User Account</option>
                        <option value="3">NPO Account</option>
                    </select>
                </div>
                    
                {this.NPOForm(this.state.user_type)}
                    
                <div className="form-group">
                    <button type="button"
                        className="btn btn-success btn-lg btn-block"
                        onClick={() => this.onRegister()}>Register</button>
                        
                    {this.state.success && <Redirect to={'/login/'} />}

                </div>
            </form>
        </div>
    </>
        }
}