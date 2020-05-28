import React, { Component } from "react";
import { withFirebase } from "./Firebase";

class CityCover extends Component {
    state= {
        img:null,
        loaded:null
    }
    constructor() {
        super()
        this.found = this.found.bind(this)
        this.notfound = this.notfound.bind(this)
    }
    componentDidMount() {
        console.log('fetchimg')
        if(this.state.loaded==null) {
            this.props.firebase.storage.ref().child('/cover/'+this.props.city+'Cover.jpg').getDownloadURL().then(this.found,this.notfound)
        }
    }
    found(url) {
        console.log('found')
        this.setState({img:url})
    }
    notfound() {
console.log('not found"'+this.props.city+'"')
    }
    render() {
        if(this.state.img) 
        return(
            <div class="jumbotron m-0 row display-1 justify-content-center" style={{backgroundImage:"url('"+this.state.img+"')", backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat', fontSize:'10vw' }}>
                <div class="flex-shrink-1 d-flex text-light justify-content-center">{this.props.city.toUpperCase()}</div>
                </div>
        )
        return (
            <img class="card-img-top" src="..." alt="image loading/not available"></img>
        )
    }
}
export default withFirebase(CityCover)