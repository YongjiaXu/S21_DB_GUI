import React from 'react';
import {UserRepository} from '../api/userRepository';
import {CreateAccount} from './createAccount';
export class LoginPage extends React.Component {
    userRepository = new UserRepository();
    state = {
        users : [],
        specific_user: ''
    }

    login(user, password){
        this.userRepository.getUser(user)
            .then()
    }

    render () {
        return <> 
        <h1 id="login-header">Login</h1>
        <div className="form-group">
            <label htmlFor="name">Username:</label>
            <br/>
            <input type="text"
                id="name"
                name="name"
                value={this.state.name}
                onChange={event => this.setState({name: event.target.value})}
                className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="email">Password:</label>
            <br/>
            <input type="text"
                    id="email"
                    name="email"
                   value={this.state.email}
                    onChange={event => this.setState({email: event.target.value})}
                    className="form-control" />
            </div>
            <br/>
            <button className="loginButton">Login</button>
            <br/><br/>
            <button onClick={<CreateAccount/>} className="newUser">Create New Account</button>
        {/* <table>
            <tbody>
                {
                    this.state.users.map((user, i) => <tr key={i}>
                        <td> {user.username} </td>
                        <td> {user.password} </td>
                        <td> {user.user_type} </td>
                    </tr>)
                }
            </tbody>
        </table>
            <p>single user: {this.state.specific_user}</p>
            {console.log(this.state.specific_user)} */}
        </>
    }
    componentDidMount() {
        this.userRepository.getUsers()
            .then( users => this.setState({users: users}));
        let username = 'npo';
        this.userRepository.getUser(username)
            .then( user => {
                this.setState({specific_user: user[0].username});
            });
    }
}