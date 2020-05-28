import React from 'react';
import {withRouter, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { withFirebase } from './Firebase';
import CityImg from './cityimg'
import Savebtn from './Savebtn'

class Banquets extends React.Component {
    state= {
        cities:null,
        data:null,
        vendor:null,
        city:null,
        page:null
    }
    constructor() {
        super()
        
    }
    componentDidUpdate() {
        if(this.state.cities==null)
        fetch("https://wp-database-d7c6f.firebaseio.com/public/cities.json")
        .then(res => res.json())
        .then(res =>
            {console.log(res)
                this.setState({cities:res})
            })
        console.log("page="+this.props.match.params.v)
        if(this.state.vendor!=this.props.match.params.v || this.state.city!=this.props.match.params.c || this.state.page!=this.props.match.params.p)
        this.setState({
            vendor:this.props.match.params.v,
            city:this.props.match.params.c,
            page:this.props.match.params.p
        })
        if(this.state.vendor && this.state.city && this.state.page && !this.state.data)
        fetch("https://wp-database-d7c6f.firebaseio.com/public/weddingz/"+this.state.vendor+"/"+this.state.city+"/page"+this.state.page+".json")
        .then(res => res.json())
        .then(res =>
            {console.log(res)
                
                this.setState({data:res})
            })
    }
    componentDidMount() {
        console.log("page="+this.state.page)
        if(this.state.vendor!=this.props.match.params.v || this.state.city!=this.props.match.params.c || this.state.page!=this.props.match.params.p)
        this.setState({
            vendor:this.props.match.params.v,
            city:this.props.match.params.c,
            page:this.props.match.params.p
        })
    }
    render() {
        if(!this.state.vendor)
        return (
            <div class="row ">
                <div class="col-6 ">
                    <div class="card embed-responsive embed-responsive-16by9">
                        <img class="card-img-top embed-responsive-item" src="https://cdn.mos.cms.futurecdn.net/gvQ9NhQP8wbbM32jXy4V3j.jpg" style={{objectFit:'cover'}}/>
                        <Link class="card-img-overlay  text-white" style={{textDecoration: 'none',fontSize:'6vw'}} to="/vendors/photographers">Photographers</Link>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card embed-responsive embed-responsive-16by9">
                        <img class="card-img-top embed-responsive-item" src="https://theweddingshow.in/wp-content/uploads/2018/07/makeup.jpg" style={{objectFit:'cover'}}/>
                        <Link class="card-img-overlay  text-white" style={{textDecoration: 'none',fontSize:'6vw'}} to="/vendors/bridalmakeup">Bridal Makeup</Link>
                    </div>
                </div>
            </div>
        )
        if(this.state.city==null && this.state.cities)
        return(
            <div className="row justify-content-center bg-light">
                    {Object.keys(this.state.cities).map((key) => {
                        return (
                            <div class="col-6 col-sm-4 col-md-3 mb-5"> 
                                <div class="card text-center border-light shadow-sm bg-white rounded" >
                                    <Link to={"/vendors/"+this.state.vendor+"/"+this.state.cities[key]+"/1"} class="">
                                        <CityImg city={this.state.cities[key]} />
                                    </Link>
                                    {/*<img class="card-img-top" src='...' alt="Card image cap" />*/}
                                    <div class="card-body justify-content-center">
                                        <h5 class="card-title">{this.state.cities[key]}</h5>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
        )
        if(this.state.vendor && this.state.city && this.state.data!=null)
        return(
            <div>
            {Object.keys(this.state.data).map((key) => {
                return <div>
                  <div class="card text-dark bg-white mt-3 ml-3 mr-3">
                    <div class="row no-gutters">
                      <div class="col-md-4 overflow-hidden">
                        <img src={this.state.data[key].image}></img>
                      </div>
                      <div class="col-md-8">
                        <div class="card-header">
                          <h4>{ this.state.data[key].name }</h4>
                        </div>
                        <div class="card-body">
                          <p class="card-text">{ this.state.data[key].desc }</p>
                          <p class="card-text">{ this.state.data[key].address }</p>
                          <p class="card-text">Price : { this.state.data[key].price } per plate</p>
                          <Savebtn authUser={this.state.auth} id={key}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              })}</div>
        )
        return(
            <div>Loading ...</div>
        )
    }
}

export default withRouter( withFirebase(Banquets))