import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import Rembtn from "./Rembtn";

class UserData extends Component {
    state = {
        authUser : null,
        savedHashes : null
    }
    constructor() {
        super()
        this.getdata = this.getdata.bind(this)
        this.removeEntry = this.removeEntry.bind(this)
    }
    /*getdata() {
        this.props.firebase.db.ref("users/"+this.props.authUser.uid+'/saved').once('value').then(function(snapshot) {
            const data = (snapshot.val());
            if (data) {
                if(this.state.savedHashes==null)
                this.setState({
                  savedHashes: data
                });
              }
          })
    }*/
    getdata(hash) {
        console.log('hash='+hash)

        let data = null
        this.props.firebase.db.ref("public/vendors/all/"+hash).once('value', snapshot => {
            data = snapshot.val();
            if (data) {
              console.log(data)
              console.log(this.state.savedHashes)
              data['hash']=hash
              if(this.state.savedHashes) {
                  let temp = this.state.savedHashes
                  temp.push(data)
                  this.setState({savedHashes:temp})
              }
              else {
                  this.setState({savedHashes:[data]})
              }
            }
          })
    }
    removeEntry() {
        console.log('called')
    }
    componentDidMount() {
        //this.setState({savedHashes:null})
        if(this.props.authUser && !this.state.authUser)
            this.setState({authUser:this.props.authUser})
        if(this.props.authUser){
            this.setState({savedHashes:null})
        this.props.firebase.db.ref("users/"+this.props.authUser.uid+'/saved').on('value', snapshot => {
            this.setState({savedHashes:null})
          const response = snapshot.val();
          console.log(response)
          if (response) {
            //
            console.log('uathid ='+this.props.authUser )
            let res=[]
            let hashes = []
            Object.keys(response).forEach(function(key) {
                res.push(key);
                //console.log(value);
            });
            for(let i = 0; i<res.length; i++) {
                hashes.push(this.getdata(res[i]))
            }
            //
            console.log(hashes) 
          }
        });}
      }
    render() {
        if(this.state.savedHashes)
        return(
            <div><p class="display-3">Saved Items</p>
                {this.state.savedHashes.map(function(data) {
                    return (
                        <div class="card text-white bg-dark mt-3 ml-3 mr-3">
                            <div class="row no-gutters">
                                {Object.keys(data).map((key) => {
                                    if(key=='image')
                                        return (
                                        <div class="col-md-4 overflow-hidden" style={{backgroundImage:'url('+data[key]+')', backgroundSize:'cover',backgroundPosition:'center', minHeight:'200px',minWidth:'50px'}}>
                                            
                                        </div>)
                                })}
                            <div class="col-md-8">
                                <div class="card-header">
                                    {Object.keys(data).map((key) => {
                                        if(key=='name')
                                            return <h4>{data[key]}</h4>
                                    })}          
                                </div>
                                <div class="card-body">
                                    {Object.keys(data).map((key) => {
                                        if(key!='image' && key!='name' && key!='type' && key!='hash')
                                            return <p class="card-text">{data[key]}</p>
                                    })}
                                    {Object.keys(data).map((key) => {
                                        if(key=='hash')
                                            return <Rembtn hash={data[key]} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>)
                })}
                
            </div>
        )
        return(
            <div>Not loaded data</div>
        )
    }
}
export default withFirebase(UserData)