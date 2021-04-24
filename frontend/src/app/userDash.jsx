import React from 'react';
import { Npo } from './models/npo'
import { Rating } from './models/rating'
import { User } from './models/user';
import {UserRepository} from '../api/userRepository'
import {Link, Redirect} from 'react-router-dom'
import {styles} from './card-theme.css';
import {Header} from './header'
//import {PasswordUpdate} from './passwordUpdate';

export class UserDash extends React.Component{

    userRepo = new UserRepository();

    state={
        pw:"",
        pwConfirm:"",
        user: [],
        npos:[]
    }

    componentDidMount() {
        let id = +this.props.match.params.userID;
        if (id) {
            this.userRepo.getUsername(id)
            .then(name=>{
                this.userRepo.getUser(name[0].username)
                .then(user => {
                    this.setState({user})
                 });
            })

        }
    }

    deleteAccount(id){
        this.userRepo.banUser(id);
        
    }

    updatePW(pw,pwconfirm){
        console.log(pw+" "+pwconfirm);
        if(pw===pwconfirm){
            let id=+this.props.match.params.userID;
            this.userRepo.changePW(id,pw);
        }
        else{
            console.log("rofl")
        }

    }

    render (){
        return <>
        <Header/>
            <div className='container'>
                {this.state.user.map((x,i)=>
            <div key={i} className='card' style={{width:'100%'}}>
                <div className='card-header' style= {{color: 'white', background: '#425088'}}>
                    <h1>User Dashboard for {x.username} 
                    <Link to={"/Home/1/"+x.userID} type='button' className="btn btn-success" style={{float: 'right'}}> 
                        Return 
                    </Link> 
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
                                        <input id='newPass' type='text' style={{width: '15em', height: '2em'}} onChange={event=>this.setState({pw:event.target.value})}></input>
                                    </p>
                                    <p>
                                        Confirm New Password: <br/>
                                        <input id='newPassConfirm' type='text' style={{width: '15em', height: '2em'}} onChange={event=>this.setState({pwConfirm:event.target.value})}></input>
                                    </p>
                                    <button type='button' className="btn btn-success" onClick={()=>this.updatePW(this.state.pw,this.state.pwConfirm)}>Submit</button>
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
                                        <Link to ={'/deleted'}type='button' className="btn btn-danger" onClick={()=> {if(window.confirm('Are you sure you wish to delete your account?')) this.deleteAccount(x.userID)}}> Delete Account </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
                )}
        </div>
        </>
    }
}