import React, { Component } from "react";
import SelectBanquetCity from './SelectBanquetCity'
class Home extends Component{
    render() {
        return (
            <div className="col">
                <div class="jumbotron row display-1 justify-content-center" style={{backgroundImage:"url('https://media.weddingz.in/images/66e4ddd34b6cbfd42e60fbae48e85248/shweta-and-arjun-lakshmi-niwas-palace-bikaner-wedding.jpg')", backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat', fontSize:'10vw' }}>
                <div class="flex-shrink-1 d-flex text-light justify-content-center">WEDDING PLANNER</div>
                </div>
                <div class="display-1 d-flex justify-content-center" style={{fontSize:'6vw'}}>CITIES</div>
                <SelectBanquetCity />
            </div>
        );
    }

}

export default Home;