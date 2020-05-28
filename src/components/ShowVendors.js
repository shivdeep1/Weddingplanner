import React, {Component} from 'react';
import {
    withRouter,
    Link
} from "react-router-dom";
import { withFirebase } from "./Firebase";
import Savebtn from './Savebtn';
function searchn() {}

class ShowVendors extends Component {
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
            fetch("https://wp-database-d7c6f.firebaseio.com/public/weddingz/"+this.props.vendor+"/"+this.props.city+"/"+"page"+this.props.page+".json")
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
        console.log("https://wp-database-d7c6f.firebaseio.com/public/weddingz/"+this.props.vendor+"/"+this.props.city+"/"+"page1"+".json")
        console.log("didmount called");
        //this.setState({next:"/banquet/?city="+this.props.city+"&page="+this.props.page+1})
        fetch("https://wp-database-d7c6f.firebaseio.com/public/weddingz/"+this.props.vendor+"/"+this.props.city+"/"+"page"+this.props.page+".json")
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({banquets:res})
        });
    }
    render() {
        return (
            <div>
                <div>
                    <div style={{left:'0px', width:'100%', marginLeft:'0px'}}className="row bg-secondary text-white">
                        {//<div class="col-xs-2 col-md-4 row" >
                        }
                        <div style={{float:'left', width:'400px', marginLeft:'0px'}} className="row">
                            <div className="p-2 bg-secondary text-monospace">
                                Location
                            </div>
                            <div class="searchdiv">
                                <input id="searchlocation" type="text" class="searchbar" placeholder="search location"/>
                            </div>
                        </div>
                        <div style={{float:'left', width:'400px', marginLeft:'0px'}} className="row">
                            <div className="p-2 bg-secondary text-monospace">
                                Name
                            </div>
                            <div class="searchdiv">
                            <input id="searchname" type="text" class="searchbar" placeholder="search by name" onFocus={searchn("searchname")}/>
                            </div>
                        </div>
                        <div style={{float:'left', width:'400px', marginLeft:'0px'}} className="row">
                            <div className="p-2 bg-secondary text-monospace">
                                Price:
                            </div>
                            <div className="btn-grp">
                                <button className="btn btn-secondary">High to Low</button>
                                <button className="btn btn-secondary">Low to High</button>
                            </div>
                        </div>
                    </div>
                </div>
            <div>
                <div id="banq">
                    {Object.keys(this.state.banquets).map((key) => {
                        return <div>
                                <div class="card text-white bg-dark mt-3 ml-3 mr-3">
                                    <div class="row no-gutters">
                                        <div class="col-md-4 overflow-hidden">
                                            <img src={this.state.banquets[key].image}></img>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-header">
                                                <h4>{ this.state.banquets[key].name }</h4>
                                            </div>
                                            <div class="card-body">
                                                <p class="card-text">{ this.state.banquets[key].desc }</p>
                                                <p class="card-text">{ this.state.banquets[key].address }</p>
                                                <p class="card-text">Price : { this.state.banquets[key].price }</p>
                                                <Savebtn authUser={this.state.auth} id={key}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div class="row mb-2 mt-2  d-flex justify-content-center">
                        <Link class="btn btn-primary" to={"/banquets/"+this.props.city+"/"+(parseInt(this.props.page,10)+1)}>next</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(withFirebase(ShowVendors))