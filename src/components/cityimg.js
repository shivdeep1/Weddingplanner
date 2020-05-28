import React, { Component } from "react";
import { withFirebase } from "./Firebase";

class CityImg extends Component {
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
            this.props.firebase.storage.ref().child('/cities/'+this.props.city+'Compressed.jpg').getDownloadURL().then(this.found,this.notfound)
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
            <div class="embed-responsive embed-responsive-16by9">
            <img class="card-img-top embed-responsive-item" style={{objectFit:'cover'}} src={this.state.img}></img>
            </div>
        )
        return (
            <img class="card-img-top" src="..." alt="image loading"></img>
        )
    }
}
export default withFirebase(CityImg)