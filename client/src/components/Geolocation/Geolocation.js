import React, {Component} from "react";
import {render} from "react-dom";

class Geolocation extends Component {
    contructor(props) {
        //super(props);
        this.state = {
        };
    }

        componentDidMount() {
            navigator.geolocation.getCurrentPosition(function(position) {
              console.log("Latitude is :", position.coords.latitude);
              console.log("Longitude is :", position.coords.longitude);
            });
          }
        
          render() {
            return (
              <div>
                <p>Using geolocation JavaScript API in React</p>
              </div>
            );
          }
}    


export default Geolocation;

