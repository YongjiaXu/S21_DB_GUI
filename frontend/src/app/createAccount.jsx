import React from 'react';
import {Link} from "react-router-dom";
import { UserRepository } from '../api/userRepository';
import "./login-signup.css";

export class CreateAccount extends React.Component{
    render(){
        return<>
        
            <div className="signup-form">
                <form>
                    <h2>Sign Up</h2>
                    
                    <div className="text-center" style={{marginBottom:'.5rem'}}>Already have an account? <Link to = '/login'>Login</Link></div>
                    <div className="form-group">
                        
                        <div className="row">
                            <div className="col"><input type="text" className="form-control" id="first_name" name="first_name" placeholder="First Name" required="required"/></div>
                                <div className="col"><input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last Name" required="required"/></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" id="email" name="email" placeholder="Email" required="required"/> 
                            </div>
		
                            <div className="form-group">
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" required="required" />
                            </div>
                            
                            <div className="form-group">
                                <input type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Confirm Password" required="required" />
                            </div>
                            
                            <div className="form-group">
                                <button type="submit" className="btn btn-success btn-lg btn-block">Register</button>
                            </div>
                        </form>
                    </div>  
        </>
        }
}