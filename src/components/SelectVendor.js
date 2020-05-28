import React, {Component} from 'react'
import { withFirebase } from "./Firebase"
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CityImg from './cityimg';
class SelectVendor extends Component {
    state={
        cities:null,
        images:null
    }
    constructor() {
        super()
        this.showstate = this.showstate.bind(this)
    }
    showstate() {
        console.log(this.props.firebase.storage.ref().child('/cities/'+this.props.city+'Compressed.jpg').getDownloadURL())
    }
    componentDidMount() {
        if(!this.state.cities)
        fetch("https://wp-database-d7c6f.firebaseio.com/public/cities.json")
        .then(res => res.json())
        .then(res => this.setState({cities:res}))
    }
    render() {
        if(this.state.cities!=null)
        return (
                <div className="row justify-content-center bg-light">
                    {Object.keys(this.state.cities).map((key) => {
                        return (
                            <div class="col-6 col-sm-4 col-md-3 mb-5"> 
                                <div class="card text-center border-light shadow-sm bg-white rounded" >
                                    <CityImg city={this.state.cities[key]} />
                                    {/*<img class="card-img-top" src='...' alt="Card image cap" />*/}
                                    <div class="card-body justify-content-center">
                                        <h5 class="card-title">{this.state.cities[key]}</h5>
                                        <Link to={"/banquets/"+this.state.cities[key]+"/1"} class="btn m-1 btn-primary">Banquets</Link>
                                        <Link to={"/banquets/"+this.state.cities[key]+"/1"} class="btn m-1 btn-primary">More</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            
        )
        return (
            <div>Loading Cities</div>
        )
    }
}

export default withRouter( withFirebase(SelectVendor))