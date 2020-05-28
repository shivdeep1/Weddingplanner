import React, {Component} from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Vendors from './Vendors'

import { withAuthentication } from './Session';

import Navbar from './Navbar.js'
import Banquets from'./Banquets'
import Home from './Home'
import UserData from './UserData'
import Footer from './Footer';

class App extends Component {
  state= {
    authUser:null
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    //console.log("update app.js"+this.state.authUser)
  }
  componentDidMount() {
    //console.log(this.props.firebase.auth)
    this.props.firebase.auth.onAuthStateChanged(
      authUser => {
      if(authUser!=null && authUser!=this.state.authUser)
        authUser
        ? this.setState({ authUser:authUser })
        : this.setState({ authUser: null });
    });
    console.log("userauth changed ");
    
  }
  render() {
  return (
    <Router basename='/'>
      <div>
      <Navbar cities={this.state.cities} authUser={this.state.authUser}/>
      <div>
      <Switch>
        <Route path="/banquets/:c?/:p?" render={(props) => (
          <Banquets authUser={this.state.authUser} {...props} />)
        } />
        <Route path="/vendors/:v?/:c?/:p?" render={(props) => (
          <Vendors authUser={this.state.authUser} {...props} />)
        } />
        <Route path="/userData" render={(props) => (
          <UserData authUser={this.state.authUser} {...props} />)
        } />
        <Route exactpath="/"><Home /></Route>
      </Switch>
      </div>
      <Footer/>
      </div>
    </Router>
  );}
}


export default  withAuthentication(App);