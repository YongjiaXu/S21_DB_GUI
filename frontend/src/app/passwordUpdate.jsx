import React from 'react';

export class PasswordUpdate extends React.Component{

    state={
        newPassword:'',
        confirmPassword:''
    }


    render(){
        return<>
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
        <button className="passwordButton" >Set New Password</button>
    </div>
    </>
    }
}