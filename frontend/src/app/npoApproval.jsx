import React, { useState, useEffect,useCallback } from 'react';
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
    
    function approve(id,index){
        npoRepository.approve(id);
        setTimeout(() => window.location.reload(), 500);
    }

    function denyNPO(id,index){
        npoRepository.deny(id);
        setTimeout(() => window.location.reload(), 500);
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
                        {npos.map((x,i)=>
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
                                    <Link to={'/NPOProfile/2/'+props.id+'/'+x.npoID} className="btn btn-warning" style={{width:'30%'}}> 
                                    Profile
                                    </Link>
                                    <button className="btn btn-danger mx-2"style={{width:'30%'}} onClick={()=> denyNPO(x.npoID)}>Deny</button>
                                    <button className="btn btn-success"style={{width:'30%'}} onClick={()=>approve(x.npoID,i)}>Approve</button>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            </div>
                        )}
                    </div>
            }
        </>
}
