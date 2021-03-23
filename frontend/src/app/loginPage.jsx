import React from 'react';
import {UserRepository} from '../api/userRepository';
export class LoginPage extends React.Component {
    userRepository = new UserRepository();
    state = {
        users : []
    }
    render () {
        return <> 
            {
                this.state.users.map((user, i) => <tr key={i}>
                    <td> {user.username} </td>
                    <td> {user.password} </td>
                    <td> {user.user_type} </td>
                </tr>)
            }
        </>
    }
    componentDidMount() {
        this.userRepository.getUsers()
            .then( users => this.setState({users: users.data}));
    }
}