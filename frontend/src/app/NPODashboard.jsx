import React from 'react'
import { Rating } from './models/rating';
import { NPORepository } from '../api/npoRepository';
import {ReviewRepository} from '../api/reviewRepository'
import {UserRepository} from '../api/userRepository'
import {styles} from './card-theme.css';
import {Header} from './header'
import {Link} from 'react-router-dom'

export class NPODashboard extends React.Component
{
    npoRepo = new NPORepository();
    reviewRepo = new ReviewRepository();
    userRepo = new UserRepository();

    state = {
        npo:[],
        gallery:[],
        reviews:[],
        users:[],
        description: '',
        location: '',
        logoURL: '',
        imgURL: '',
        userID:0,
        pw:"",
        pwConfirm:""
    };

    componentDidMount() {
        let userID = +this.props.match.params.userID;
        if (userID) {
            this.setState({userID:userID})
            this.userRepo.getNPOID(userID)
            .then(idReturn =>{
                let id= idReturn[0].npoID;
                this.npoRepo.getNPO(id)
                .then(npo => { 
                    this.setState({npo})
                 });
                 this.npoRepo.getGallery(id)
                 .then(gallery=>{
                     this.setState({gallery})
                 });
                 this.userRepo.getUsers()
                 .then(users=>{
                     this.setState({users})
                });
                 this.reviewRepo.getReviews(id)
                 .then(reviews=>{
                     this.setState({reviews})
                 });
            })
        }
}

    calculateAverageRating(){
        let averageRate = 0;
        for(let i = 0; i < this.state.reviews.length; ++i)
        {
            averageRate += this.state.reviews[i].rating;
        }
        averageRate /= this.state.reviews.length;
        return averageRate;
    }

    username(raterID){
        let result = this.state.users.find(({userID})=> userID===raterID);
        return result.username;
    }

    changePassword(newPassword, confirmPassword)
    {
        if(newPassword !== confirmPassword)
        {
            alert("ERROR: Passwords don't match");
        }
        else
        {

        }
    }

    onChangeLocation()
    {
        this.npoRepo.updateLocation(
            this.state.npo[0].npoID, this.state.location
        );

        this.setState({
            location: '',
        });
        alert("Changes have been saved!");
    }

    onChangeDescription()
    {
        this.npoRepo.updateDescription(
            this.state.npo[0].npoID, this.state.description
        );

        this.setState({
            description: '',
        });
        alert("Changes have been saved!");
    }

    onChangeLogo()
    {
        this.npoRepo.updateLogo(
            this.state.npo[0].npoID, this.state.logoURL
        );

        this.setState({
            logoURL: '',
        });
        alert("Changes have been saved!");
    }

    onAddImage()
    {
        this.npoRepo.addImage(
            this.state.npo[0].npoID, this.state.imgURL
        );

        this.setState({
            imgURL: ''
        });
        alert("Changes have been saved!");
    }

    flag(id){
        this.reviewRepo.flagToggle(id);
        window.location.reload();
    }

    flagButton(status,id){
        if(status===0){
            return (<button type="button" className="btn btn-danger" onClick={()=>this.flag(id)}>Flag</button>)
        }
        else{
            return (<button type="button" className="btn btn-success" onClick={()=>this.flag(id)}>Un-Flag</button>)
        }
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

    render() {
        
        if (!this.state.users.length)
            return <>...</>
        
        return(
            <>
            <Header/>
            <div className='container'>
            {this.state.npo.map((x,i)=>
            <div key={i} className='container'>
                <div className='card'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col-6'>
                                <h1>{x.title}</h1>
                            </div>
                            <div className='col-6'>
                                <h1 className="float-right">
                                    <Link to={'/Home/3/'+this.state.userID}type='button' 
                                    className="btn btn-success"> 
                                        Home 
                                    </Link> 
                                </h1>
                            </div>
                        </div>
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
                                        New Password: <br/>
                                        <input id='newPass' type='text' style={{width: '100%', height: '2em'}} onChange={event=>this.setState({pw:event.target.value})}></input>
                                    </p>
                                    <p>
                                        Confirm New Password: <br/>
                                        <input id='newPassConfirm' type='text' style={{width: '100%', height: '2em'}} onChange={event=>this.setState({pwConfirm:event.target.value})}></input>
                                    </p>
                                    <button type='button' className="btn btn-success" onClick={()=>this.updatePW(this.state.pw,this.state.pwConfirm)}>Submit</button>
                                </div>
                            </div>
                            </div>
                            <div className='col-6'>
                                <div className='card'>
                                <div className='card-header'>
                                <h2> Change Logo </h2>
                                </div>
                                <div className='card-body'>
                                <img src={x.logoURL}
                                alt="Logo"
                                className='logo'></img>
                                <br/>
                                Upload Image by URL:
                                <input type='text' 
                                className='form-control'
                                value={this.state.logoURL}
                                onChange={ event => this.setState({logoURL: event.target.value})}></input>
                                <br/>
                                <button type='button' 
                                className="btn btn-success"
                                onClick={ () => this.onChangeLogo() }> Save Changes </button>
                                </div>
                                </div>
                            </div>
                        </div>

                        <br/><br/>

                        <div className='row'>
                            <div className='col-6'>
                                <div className='card'>
                                <div className='card-header'>
                                <h2> Edit Description </h2>
                                </div>
                                <div className='card-body'>
                                <p>
                                    New Description: <br/>
                                    <textarea className='form-control' 
                                    id='newDescription' 
                                    rows='7'
                                    value={this.state.description}
                                    onChange={ event=> this.setState( { description: event.target.value } ) }></textarea>
                                </p>
                                <button type='button' 
                                className="btn btn-success"
                                onClick={ () => this.onChangeDescription() }> Save Changes </button>
                                </div>
                                </div>
                            </div>
                            <div className='col-6'>
                            <div className='card'>
                            <div className='card-header'>
                                <h2> Change Location </h2>
                            </div>
                            <div className='card-body'>
                                <p>
                                    New Location: <br/>
                                    <input id='newLocation' 
                                    type='text' 
                                    className='form-control'
                                    value={this.state.location}
                                    onChange={ event => this.setState( {location: event.target.value} ) }></input>
                                </p>
                                <button type='button' 
                                className="btn btn-success"
                                onClick={() => this.onChangeLocation()}> Save Changes </button>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className='card'>
                        <div className='card-header'>
                        <h2> Add Images </h2>
                        </div>
                        <div className='card-body'>
                        <p>
                            {this.state.gallery.map((x,i)=>
                            <img key={i} src={x.imageURL}
                            alt="Image"
                            className='extraImages'>
                            </img>
                            )}
                        </p>
                        <p>
                            Upload image by URL:
                            <input id='newImage' 
                            type='text' 
                            className='form-control'
                            onChange={event => this.setState({ imgURL: event.target.value })}></input>
                        </p>
                        <button type='button' 
                        className="btn btn-success"
                        onClick={() => this.onAddImage()}> Save Changes </button>
                        </div>
                        </div>



                        <div className='row'>
                            <div className='col-6'>
                                <h2>Ratings</h2>
                            </div>
                            <div className='col-6'>
                                <h2 className='float-right'>
                                    Average Rating: <Rating value = {this.calculateAverageRating()}/>
                                </h2>
                            </div>
                        </div>
                        <div className='row'>
                            {this.state.reviews.map((x,i)=>
                            <div key={i} className="card">
                                    <div className='card-header'>
                                        <Rating value = {x.rating}/>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-10'>{this.username(x.raterID)}</div>
                                            <div className='col-2'>{x.ratingDate.toString().substring(0,10)}</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-10'>{x.comment}</div>
                                            <div className="col-2">
                                                {this.flagButton(x.flagged,x.ratingID)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>
                )}
                </div>
            </>
        )
    }
}