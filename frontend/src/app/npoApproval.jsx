import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {NPORepository} from '../api/npoRepository';

export const NpoApproval = props =>{

    const [npos, setNpos] = useState('');


    const npoRepository = new NPORepository();

    useEffect(()=>{
        if(!npos){
            npoRepository.getNANPOS().then(z=>{
                setNpos(z);
            })
        }
    });

    function approve(id){
        npoRepository.approve(id);
    }

    function denyNPO(id){
        console.log(id);
    }

    if(!npos){
        return<>
        <h2>Loading NPOs....</h2>
        </>
    }
        return<>
            {
                !npos.length && <h5>No NPOS Needing Approved</h5>
            }
            {
                    <div>
                        {npos.map((x,i)=> <>
                        <div key={i} className="container">
                            <div id="npoCard" className="card">
                                <div id="name"className="card-header">
                                    {x.title} ({x.location}) 
                                </div>
                                <div className="card-body">
                                    <div>
                                        <div>"{x.description}"</div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                    <Link to={'/NPOProfile/'+x.npoID} className="btn btn-warning" style={{width:'30%'}}> 
                                    Profile
                                    </Link>
                                    <button className="btn btn-danger mx-2"style={{width:'30%'}} onClick={()=> {if(window.confirm('Denying will delete the NPO, are you sure?')) denyNPO(x.npoID)}}>Deny</button>
                                    <button className="btn btn-success"style={{width:'30%'}} onClick={()=>approve(x.npoID)}>Approve</button>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            </div>
                        </>
                        )}
                    </div>
            }
        </>
}