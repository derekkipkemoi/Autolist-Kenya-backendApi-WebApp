import React, { Component } from "react";

import FilterComponent from "./Filter/FilterComponentHome";


class Jumbotron extends Component {
  render() {

    
    return (
      <div className="jumbotron-container">
        <div className="jumbotron">
          <div className="jumbotron-children">
            <div className="container">

            
              <h2
                className="text-light text-center font-weight-bold"
                style={{ marginBottom: "40px" }}
              >
                Find The Best Cars. Buy and Sell in Kenya.
              </h2>

              <div className="row justify-content-center">
               <div className="col-6 col-sm-6 col-md-6">
              </div>
              </div>
              
              
              <div>
                <FilterComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
