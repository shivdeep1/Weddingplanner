import React, {Component} from 'react';
import {
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { withFirebase } from './Firebase';
import Navigation from './Navigation';

class Navbar extends Component {
  state= {
    authUserState:null,
    usern:null
  }
  constructor(props) {
    super(props);
    this.setState({authUser:null})
    this.updateUsername=this.updateUsername.bind(this);
    this.checkUpdate=this.checkUpdate.bind(this)
  }
  updateUsername() {
    //this.setState({usern:username})
    let user=null
    if(this.state.authUserState!=null)
    this.props.firebase.db.ref("users/"+this.state.authUserState.uid).once('value').then(function(snapshot) {
      const user = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      console.log("uname="+user)
    })
  }
  checkUpdate() {
    console.log(this.state.usern)
  }
  componentDidUpdate() {
    if(this.state.authUserState!=null)
    this.props.firebase.db.ref("users/"+this.state.authUserState.uid+'/username').on('value', snapshot => {
      const messageObject = snapshot.val();
      if (messageObject) {
        if(this.state.usern==null)
        this.setState({
          usern: messageObject
        });
      }
    });
    
  }
  componentDidMount() {
    
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUserState:authUser })
        : this.setState({ authUserState: null });
        console.log("user="+this.state.authUserState.uid)
        console.log("user"+this.props.firebase.auth.currentUser.profile)
        this.updateUsername()
    });
    
    fetch("https://wp-database-d7c6f.firebaseio.com/public/cities.json")
      .then(res => res.json())
      .then(res => this.setState({cities:res}))
  }
  render() {
  return (
      <div >
        <div className=" container-fluid bg-dark text-white" style={{width:'100%'}}>  {/*Navbar*/}
        <div className="row d-flex justify-content-between">
        <div className="d-flex justify-content-center justify-content-sm-center justify-content-md-start col-12 col-sm-12 col-md-4 col-xl-3">
          <Link className="btn  btn-dark text-monospaced " to="/">
            <b>WEDDING PLANNER</b>
          </Link>
          </div>
          <div className="d-flex col-12 col-sm-4 col-md-4 justify-content-center" >
          <div className="btn-group">
            <Link className="btn btn-dark" to='/vendors'>VENDORS</Link>
            <Link className="btn btn-dark" to='/banquets'>BANQUETS</Link>
          </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4"><Navigation authUser={this.state.authUserState} username={this.state.usern} /></div>
        </div>
        </div>
      </div>
  );
}
}

export default withFirebase(Navbar);