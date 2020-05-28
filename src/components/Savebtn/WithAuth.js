import React, { Component } from 'react'
import {withFirebase} from '../Firebase'
class WithAuth extends Component {
    constructor() {
        super()
        this.saveToUser = this.saveToUser.bind(this)
    }
    saveToUser() {
        console.log("saving")
        let id=this.props.id
        this.props.firebase.db.ref('/users/'+this.props.authUser.uid+'/saved/'+this.props.id).set(1)
        //console.log(this.props.firebase.db.ref('/users/'+this.props.authUser.uid+'/saved').push().remove())
        //console.log(this.props.firebase.db.ref('/users/'+this.props.firebase.auth.W+'/saved'))
    }
    
    componentDidMount() {
        //console.log(this.props.firebase.auth.W)
        //console.log("uath="+this.props.authUser)
    }
    render() {
        return (
    <div style={{position:'absolute', right:'0px', bottom:'0px'}}>
        <button value={this.props.id} className="btn btn-outline-danger " onClick={this.saveToUser}>Save</button>
    </div>)
    }
}

export default withFirebase(WithAuth)