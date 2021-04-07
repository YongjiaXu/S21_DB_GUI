import React from 'react';
import {FlaggedReviewList} from './flaggedReviews';


export class AdminDash extends React.Component{
    state={
        newPassword:'',
        confirmPassword:''
    }
    render(){
        return<>
        <h1 style={{marginLeft:"20px"}}>Admin Dashboard</h1>

        <div className="changePasswordGroup" style={{marginLeft:"20px",float:"left"}}>
            <div className="form-group">
                <label htmlFor="passwordReset">Change Password:</label>
                <br/>
                <input type="text"
                id="passwordReset"
                name="passwordReset"
                value={this.state.newPassword}
                onChange={event => this.setState({newPassword: event.target.value})}
                className="form-control" />
            </div>
            <div className="form-group" >
                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <br/>
                <input type="text"
                id="confirmPassword"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={event => this.setState({confirmPassword: event.target.value})}
                className="form-control" />
            </div>
            <br/>
            <button className="loginButton" >Set New Password</button>
        </div>


        <div className="flaggedPosts" style={{float:"right", marginRight:"20px"}}>
            <FlaggedReviewList/>
        </div>


    
        
        
        </>
        }
}