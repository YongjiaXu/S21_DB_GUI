import React from 'react';
import {FlaggedReviewList} from './flaggedReviews';
import {UserRepository} from '../api/userRepository';
import {NpoApproval} from './npoApproval'
import {Header} from './header'

export class AdminDash extends React.Component{

    userRepo = new UserRepository();

    state={
        userID: 0,
        user: []
    }

    updatePW(pw,pwconfirm){
        console.log(pw+" "+pwconfirm);
        if(pw==pwconfirm){
            let id=+this.props.match.params.userID;
            this.userRepo.changePW(id,pw)
            .then(alert("Password Changed Sucessfully"))
        }
        else{
            alert("Passwords do not match")
        }

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

    render(){
        if(!this.state.user.length){
            return<><h1>Loading...</h1></>
        }
        return<>
        <Header/>
        <div className='container'>
            <div className='card' style={{width:'100%'}}>
                    <div className='card-header' style=
                    {{color: 'white', background: '#425088'}}>
                        <h1>Admin Dashboard for {this.state.user[0].username}</h1>
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
                                <div className='card'>
                                    <div className='card-header' style={{ color: 'white', background: '#425088' }}>
                                    <h2> NPOs Needing Approval </h2>
                                    </div>
                                    <div className='card-body'>
                                    <NpoApproval />
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='card'>
                                <div className='card-header' style={{ color: 'white', background: '#425088' }}>
                                <h2> Flagged Reviews </h2>
                                </div>
                                <div className='card-body'>
                                    <div className="flaggedPosts" style={{width:'100%'}}>
                                        <FlaggedReviewList/>
                                    </div>
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