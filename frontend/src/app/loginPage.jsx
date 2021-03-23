import React from 'react';
import {UserRepository} from '../api/userRepository';
export class LoginPage extends React.Component {
    userRepository = new UserRepository();
    state = {
        users : [],
        specific_user: ''
    }
    render () {
        return <> 
        <table>
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
            {console.log(this.state.specific_user)}
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