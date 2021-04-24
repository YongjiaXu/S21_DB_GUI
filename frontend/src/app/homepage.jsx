import React, { useState, useEffect } from 'react';
import {Link, Redirect} from "react-router-dom";
import { NPORepository } from '../api/npoRepository';

import "./homepage.css";

export const Homapage = props => {

    const [ NPOs, setNPOs ] = useState(undefined);

    const npoRepo = new NPORepository();

    useEffect(() => {
        if (!NPOs) {
            npoRepo.getNPOS().then(x => {
                setNPOs(x);
            });
        }
    });

    return <>
        
        <div className="container">
            <h4>Browse NPOs</h4>
            <div className="card-deck">
                {NPOs && NPOs.map(npo =>
                        <Link className="custom-card" to={"/NPOProfile/" + npo.npoID} style={{maxWidth:'20rem'}}>
                        <img className="card-img-top mx-auto" src={npo.logoURL} alt="" style={{height:"18rem"}}/>
                        
                        <div className="card-body">
                            <h5 className="card-title text-center">{npo.title}</h5>
                            <p className="card-text">{npo.description}</p>
                            
                        </div>
                        </Link>
                )}
            </div>

        </div>
    
    </>;

}

export default Homapage;