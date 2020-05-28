import React, {Component} from 'react';
import {
    withRouter,
    Link
} from "react-router-dom";
import { withFirebase } from "./Firebase";
import Savebtn from './Savebtn';
import CityCover from './citycover'
function searchn() {}

class ShowBanquets extends Component {
    state= {
        banquets:{},
        arr:{},
        auth:null,
        next:null,
        page:1
    }
    constructor(props) {
        super(props);
    }
    componentWillUpdate() {
        //console.log("uauth="+this.state.auth)
        if(this.state.page!=this.props.page) {
            //this.setState({page:this.props.page})
            console.log("didmount called");
            fetch("https://wp-database-d7c6f.firebaseio.com/public/weddingz/banquets/"+this.props.city+"/"+"page"+this.props.page+".json")
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({page:this.props.page, banquets:res})
            });
        }
    }
    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser ? this.setState({ auth:authUser }) : this.setState({ auth: null });
            //authUser ? document.getElementsByClassName("save").style.visibility = "visible" : document.getElementsByClassName("save").style.visibility = "hidden";
        });
        this.setState({page:this.props.page})
        console.log("https://wp-database-d7c6f.firebaseio.com/public/weddingz/banquets/"+this.props.city+"/"+"page1"+".json")
        console.log("didmount called");
        //this.setState({next:"/banquet/?city="+this.props.city+"&page="+this.props.page+1})
        fetch("https://wp-database-d7c6f.firebaseio.com/public/weddingz/banquets/"+this.props.city+"/"+"page"+this.props.page+".json")
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({banquets:res})
        });
    }
    render() {
        return (
            <div>
                <CityCover city={this.props.city} />
                <div class="md-form active-pink-4 mt-0 mx-5">
                    <input class="form-control" type="text" placeholder="Search" aria-label="Search" style={{borderTop:'0px', borderLeft:'0px', borderRight:'0px', borderColor:'pink'}}/>
                </div>
            <div>
                <div id="banq" class="container-fluid row justify-content-center">
                    {Object.keys(this.state.banquets).map((key) => {
                        return <div class="col-sm-12 col-xl-6 h-100 my-3">
                                <div class="card text-dark bg-light shadow" style={{border:'0px',overflow:'hidden'}}>
                                    <div class="row d-flex no-gutters">
                                        <div class="col-sm-12 col-md-4" style={{backgroundImage:"url('"+this.state.banquets[key].image+"')", backgroundSize:'cover', minHeight:'271px'}}></div>
                                        <div class="col-sm-12 col-md-8" style={{height:'271px'}}>
                                            <div class="card-header bg-light" style={{borderColor:'pink'}}>
                                                <h4>{ this.state.banquets[key].name }</h4>
                                            </div>
                                            <div class="card-body">
                                                <p class="card-text" style={{height:'48px', overflow:'hidden'}}>{ this.state.banquets[key].desc }</p>
                                                <p class="card-text" style={{height:'48px', overflow:'hidden'}}>{ this.state.banquets[key].address }</p>
                                                <p class="card-text" style={{height:'48px'}}>Price : { this.state.banquets[key].price } per plate</p>
                                                <Savebtn authUser={this.state.auth} id={key}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div class="row mb-2 mt-2  d-flex justify-content-center" style={{width:'100%'}}>
                        <Link class="btn btn-primary" to={"/banquets/"+this.props.city+"/"+(parseInt(this.props.page,10)+1)} >next</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(withFirebase(ShowBanquets))