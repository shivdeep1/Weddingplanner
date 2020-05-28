import React, { Component } from 'react'
import {withFirebase} from './Firebase'
class Rembtn extends Component {
    constructor() {
        super()
        this.removeFromUser = this.removeFromUser.bind(this)
    }
    removeFromUser() {
        console.log(this.props.firebase.auth.W)
        this.props.firebase.db.ref('/users/'+this.props.firebase.auth.W+'/saved/'+this.props.hash).set(null)
    }
    render() {
        return (
    <div style={{position:'absolute', right:'0px', bottom:'0px'}}>
        <button className="btn btn-secondary" onClick={this.removeFromUser}>Remove</button>
    </div>)
    }
}

export default withFirebase(Rembtn)