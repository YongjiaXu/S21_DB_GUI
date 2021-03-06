import React from 'react'
import { Rating } from './models/rating';
import {NPORepository} from '../api/npoRepository'
import {ReviewRepository} from '../api/reviewRepository'
import {UserRepository} from '../api/userRepository'
import {Link,Redirect} from 'react-router-dom'
import {styles} from './card-theme.css';
import {Header} from './header'

export class NPOProfile extends React.Component
{
    npoRepo = new NPORepository();

    reviewRepo = new ReviewRepository();

    userRepo = new UserRepository();

    state = {
        userName: '',
        rating: 0,
        comment: '',
        npo:[],
        gallery:[],
        reviews:[],
        averageRating: 0,
        users:[],
        usertype:0,
        userID:0
    };

    onSubmitClick() {
        if(this.state.userType!==-1){
            this.reviewRepo.postReview(this.state.userID,this.state.rating,this.state.comment,+this.props.match.params.npoID)
            .then(this.setState({
                rating:0,
                comment:''
            }))
            alert("Review Posted")
            setTimeout(() => window.location.reload(), 500);
        }
        else{
            alert("Please Login to post a Review")
        }
    }

    componentDidMount() {
        let id = +this.props.match.params.npoID;
        if (id) {
            this.npoRepo.getNPO(id)
            .then(npo => { 
                this.setState({npo})
             });
             this.npoRepo.getGallery(id)
             .then(gallery=>{
                 this.setState({gallery})
             });
             this.reviewRepo.getReviews(id)
             .then(reviews=>{
                 this.setState({reviews})
             });
             this.userRepo.getUsers()
             .then(users=>{
                 this.setState({users})
            });
        }
        let userType = +this.props.match.params.userType;
        let userID = +this.props.match.params.userID;
        if(userType&&userID){
            this.setState({userType: userType})
            this.setState({userID: userID})
        }
    }

    username(raterID){
        const result = this.state.users.find(({userID})=> userID===raterID);
        console.log(result.username);
        return result.username;
    }

    calculateAverageRating(){
        let averageRate = 0;
        for(let i = 0; i < this.state.reviews.length; ++i)
        {
            averageRate += this.state.reviews[i].rating;
            console.log(averageRate);
        }
        averageRate /= this.state.reviews.length;
        return averageRate;
    }

    deleteNPO(){
        this.npoRepo.deny(+this.props.match.params.npoID)
        return(<Redirect to={'/Home/'+this.state.userType+'/'+this.state.userID}/>)
    }

    render() {
        
        if (!this.state.users.length||this.state.userID===0||this.state.userType===0)
           return <>...</>

        return(
            <>
            {this.state.userType==-1 && <br/>}
            {this.state.userType!==-1 && <Header/>}
            <div className="container">
              {this.state.npo.map((x,i)=>               
                <div key={i} className="card">
                    <div className="card-header">
                        <div className='row'>
                            <div className='col-6'>
                                <h1>{x.title}</h1>
                            </div>
                            <div className='col-6'>
                                <h1 className="float-right">
                                    <Link to={"/Home/"+this.state.userType+"/"+this.state.userID}type='button' 
                                    className="btn btn-success"> 
                                        Home 
                                    </Link>
                                    {this.state.userType===2 && <button type="button" className="btn btn-danger" onClick={()=> {if(window.confirm('Denying will delete the NPO, are you sure?')) this.deleteNPO()}}>!Delete NPO!</button>}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <img src={x.logoURL}
                                alt="Company Logo"
                                className='profileLogo'>
                                </img>
                            </div>

                            <div className='col-8'>
                            <div className='card'>
                            <div className='card-header'>
                                <h2> Location: {x.location}</h2>
                            </div>
                            <div className='card-body'>
                                <br/>
                                <p>
                                    {x.description}
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>

                        <br/>

                        <div className='card'>
                            <div className='card-header'>
                                <h2> Image Gallery </h2>
                            </div>
                            <div className='card-body'>
                                {this.state.gallery.map((x,i)=>
                                    <img key={i} src={x.imageURL}
                                    alt="Image" 
                                    className='extraImages'>
                                    </img>
                                )}
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

                        <div className="row">
                            <div className='col-12'>
                                {this.state.reviews.map((x,i)=>
                                    <div key={i} className="card">
                                        <div className='card-header'>
                                            <Rating value = {x.rating}/>
                                        </div>
                                    
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col-10'>{this.username(x.raterID)}</div>
                                                <div className='col-2'>{x.ratingDate.toString().substr(0,10)}</div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-10'>{x.comment}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}                                
                            </div>
                        </div>

                        <br/>
                                 
                        <div className='container'>
                        <div className="row">
                            <div className="card">
                                <div className="card-header">
                                    Leave a review
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="row">

                                            <div className="col-2">
                                                <label htmlFor="Rating" >Rating</label>
                                                <br/>
                                                <select 
                                                    className="form-control"
                                                    id="Rating"
                                                    name="Rating"
                                                    value={this.state.rating}
                                                    onChange={ event => this.setState({ rating: event.target.value }) }>
                                                    <option> </option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>

                                            <div className="col-2">
                                                <br/>
                                                <Rating value = {this.state.rating}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="Comment"> Comment </label>
                                                <br/>
                                                <textarea id="Comment"
                                                    className='form-control'
                                                    name="Comment"
                                                    value={this.state.comment}
                                                    onChange={ event => this.setState({ comment: event.target.value }) }>
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <button type="button" className="btn btn-success"
                                                    type="button" onClick={()=>this.onSubmitClick()}>
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
              )}
              </div>
              <br/>
            </>
        )
    }
}