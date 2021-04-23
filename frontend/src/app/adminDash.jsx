import React from 'react';
import {FlaggedReviewList} from './flaggedReviews';
import {PasswordUpdate} from './passwordUpdate';

export class AdminDash extends React.Component{
    render(){
        return<>
        <div className='container'>
            <div className='card' style={{width:'100%'}}>
                    <div className='card-header' style=
                    {{color: 'white', background: '#425088'}}>
                        <h1>Admin Dashboard</h1>
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