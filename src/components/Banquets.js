import React from 'react';
import {withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { withFirebase } from './Firebase';

import SelectBanquetCity from './SelectBanquetCity'
import ShowBanquets from './ShowBanquets'

class Banquets extends React.Component {
    state= {
        city:null,
        page:null
    }
    constructor() {
        super()
    }
    componentDidUpdate() {
        console.log("page="+this.props.match.params.p)
        if(this.state.page!=this.props.match.params.p)
        this.setState({page:this.props.match.params.p})
    }
    render() {
        if(this.props.match.params.c!=undefined)
        return (
            <ShowBanquets city={this.props.match.params.c} page={this.props.match.params.p} key={this.props.key} authUser={this.props.authUser}/>
        );
        return (
            <SelectBanquetCity />
        );
    }
}

export default withRouter( withFirebase(Banquets))