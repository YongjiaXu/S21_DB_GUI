import React from 'react';
import { Npo } from './models/npo'
import { Rating } from './models/rating'
import { User } from './models/user';
import {UserRepository} from '../api/userRepository'
import {NPORepository} from '../api/npoRepository'
import {Link} from 'react-router-dom'
import {styles} from './card-theme.css';
//import {PasswordUpdate} from './passwordUpdate';

export class UserDash extends React.Component{

    userRepo = new UserRepository();
    npoRepo = new NPORepository();

    state={
        user: new User('Place Holder Name','',''),
        npos:[]
    }

    componentDidMount() {
        let id = +this.props.match.params.id;
        if (id) {
            this.userRepo.getUser(id)
            .then(user => { 
                this.setState({user})
             });
        }

        this.npoRepo.getNPOS()
        .then(npos=>{
            this.setState({npos})
        });
    }

    render (){
        return <>
            <div className='container'>
            <div className='card' style={{width:'100%'}}>
                <div className='card-header' style= {{color: 'white', background: '#425088'}}>
                    <h1>{this.state.user.username} <button type='button' className="btn btn-success" style={{float: 'right'}}> 
                        Return 
                    </button> 
                    </h1>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='card'>
                                <div className='card-header' style={{ color: 'white', background: '#425088' }}>
                                    <h2> Change Password </h2>
                                </div>
                                <div className='card-body'>
                                    <p>
                                        **Password must contain at least one uppercase and
                                        one lowercase letter, a number, a special symbol, other
                                        generic disclaimer
                                    </p>
                                    <p>
                                        New Password: <br/>
                                        <input id='newPass' type='text' style={{width: '15em', height: '2em'}}></input>
                                    </p>
                                    <p>
                                        Confirm New Password: <br/>
                                        <input id='newPassConfirm' type='text' style={{width: '15em', height: '2em'}}></input>
                                    </p>
                                    <button type='button' className="btn btn-success">Submit</button>
                                </div>
                            </div>
                            <br/>
                        </div>
                        <div className='col-6'>
                            <div className='card'>
                                <div className='card-header' style={{ color: 'white', background: '#425088' }}>
                                    <h2> Delete Account? </h2>
                                </div>
                                <div className='card-body'>
                                    <p>
                                        Are you sure? No Looking Back<br/>
                                        <button type='button' className="btn btn-success"> Delete </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
        </>
    }
}