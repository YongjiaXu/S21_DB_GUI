import React, { useState, useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";
import { NPORepository } from '../api/npoRepository';

import "./homepage.css";

export const Homapage = props => {

    const [ NPOs, setNPOs ] = useState(undefined);

    const npoRepo = new NPORepository();

    useEffect(() => {
        if (!NPOs) {
            npoRepo.getApprovedNPOS().then(x => {
                setNPOs(x);
            });
        }
    });

    return <>
        
        <div className="container">

            <div className="page-header" style={{ color: '#425088' }}>
                <h4 style={{ color: '#425088' }}>Browse NPOs</h4>
            </div>
            
            <div className="card-deck">
                {NPOs && NPOs.map((npo, i) =>
                    <Link key={i} className="custom-card" to={"/NPOProfile/" + npo.npoID}  style={{ minWidth:'100%' }} >
                        <div className="row g-0">
                            <div className="col-md-2">
                                <img className="card-img-top" src={npo.logoURL} alt="" style={{ height: "12rem", width:"12rem" }} />
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

        </div>
    
    </>;

}


export default Homapage;