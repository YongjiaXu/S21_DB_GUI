import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { NPORepository } from '../api/npoRepository';
import {Header} from './header'
import "./homepage.css";

export const Homapage = props => {

    const [ NPOs, setNPOs ] = useState(undefined);
    const [userID, setUserID] = useState('');
    const [userType, setUserType] = useState('');

    const npoRepo = new NPORepository();

    useEffect(() => {
        if (!NPOs) {
            npoRepo.getApprovedNPOS().then(x => {
                setNPOs(x);
            });
        }
        if(!userID){
            let id = +props.match.params.userID;
            setUserID(id);

            let type = +props.match.params.userType;
            setUserType(type);

        }
    });

    if(!userID||!userType||!NPOs){
        return<>Loading...</>
    }

    return <>
        
        <Header loggedIn={ userType } />
        <div className="container">

            <div className="page-header" style={{ color: '#425088' }}>
                <h4 style={{ color: '#425088' }}>Non-profit Organizations</h4>
                <div className="float-right" >
                    {userType === 1 && <Link to={'/UserDash/' + userID} className="btn btn-success">User Dashboard</Link>}
                    {userType === 2 && <Link to={'/AdminDash/' + userID} className="btn btn-success">Admin Dashboard</Link>}
                    {userType === 3 && <Link to={'/NPODashboard/' + userID} className="btn btn-success">NPO Dashboard</Link>}
                    {userType === -1 && <Link to={'/'} className="btn btn-success">Login</Link>}
                </div>
            </div>

            <div className="clearfix"></div>

            <div className="card-deck">
                {NPOs && NPOs.map((npo, i) =>
                    <Link key={i} className="card custom-card" to={"/NPOProfile/" + userType + '/' + userID + '/' + npo.npoID} style={{ minWidth: '100%' }} >
                        <div className="row g-0">
                            <div className="col-md-3">
                                <img className="card-img-top" src={npo.logoURL} alt="" style={{ height: '12rem', width: '100%' }} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    
                                    <h5 className="card-title">{npo.title}</h5>
                                    <p className="card-text">{npo.description}</p>
                            
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
            <br/>
        </div>
    
    </>

}


export default Homapage;
