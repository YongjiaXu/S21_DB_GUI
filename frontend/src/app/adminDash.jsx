import React from 'react';
import {FlaggedReviewList} from './flaggedReviews';
import {PasswordUpdate} from './passwordUpdate';

export class AdminDash extends React.Component{
    render(){
        return<>

        <h1 style={{marginLeft:"20px"}}>Admin Dashboard</h1>

        <div className="fpassword update" style={{float:"left", marginLeft:"20px"}}>
            <PasswordUpdate/>
        </div>

        <div className="npo" style={{float:"left", marginLeft:"110px"}}>
            <h3>NPO's Needing Approval</h3>
        </div>


        <div className="flaggedPosts" style={{float:"right", marginRight:"20px"}}>
            <FlaggedReviewList/>
        </div>
        </>
        }
}