import React, { Component } from 'react';

import { Link } from "react-router-dom";

import "../assets/css/carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { priceFormat, numberFormat } from "./NumberFormat";

class TrendingCars extends Component {
    state = {  } 
    render() { 
        const cars = this.props.trendingCars;
        const iconsStyle = {
            color: "#25D366",
            marginRight: "5px",
          };
      
          const priceStyle = {
            color: "#25D366",
            marginLeft: "10px",
          };
      
          const imageStyle = {
            width: "100%",
            height: "11rem",
            objectFit: "cover",
          };
          const bottomStyle = {
            marginLeft: "10px",
          };
          const svgImageStyle = {
            width: "20px",
            marginRight: "5px",
            color: "#fff",
          };
          const cardBottomStyle = {
            backgroundColor: "#cffff5"
          };
        return (
            <div>
            <hr />
            <div className="col-sm text-center" style={{ marginTop: "30px" }}>
                <p className="text-centre font-weight-bold">
                Trending Vehicles
                </p>
            </div>
            <div className="row">
                  {cars.slice(0,9).map((car) => (
                    <div className="col-md-4" style={{ marginTop: "10px", marginBottom: "10px" }} key={car.id}>
                    <Link
                      to={`/vehicle/${car.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div className="shadow card h-100">
                        <div className="card-image-icon">
                          <img
                            src={car.images[0]}
                            className="card-img-top"
                            style={imageStyle}
                            alt="..."
                          />
                        </div>

                        <div className="card-body">
                          <h6 className="card-titlel font-weight-bold">
                            {car.name}
                          </h6>

                          <p className="card-text">
                            <FontAwesomeIcon
                              icon="map-marker-alt"
                              style={iconsStyle}
                            />
                            {car.location}
                            <span
                              className="font-weight-bold"
                              style={priceStyle}
                            >
                              {priceFormat(car.price)}
                            </span>
                          </p>
                        </div>
                        <div className="card-header" style={cardBottomStyle}>
                          <p
                            className="card-text"
                            style={{ fontSize: "12px" }}
                          >
                            <span className="font-weight-bold">
                              <img
                                style={svgImageStyle}
                                alt="Clock"
                                src={require("../assets/svgs/gear_box.svg")}
                              />
                              {car.transmission}
                            </span>
                            <span
                              className="font-weight-bold"
                              style={bottomStyle}
                            >
                              <img
                                style={svgImageStyle}
                                alt="Clock"
                                src={require("../assets/svgs/gauge.svg")}
                              />
                              {numberFormat(car.mileage)} km
                            </span>
                            <span
                              className="font-weight-bold"
                              style={bottomStyle}
                            >
                              <img
                                style={svgImageStyle}
                                alt="Clock"
                                src={require("../assets/svgs/fuel.svg")}
                              />
                              {car.fuel}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  ))}
            </div>
            </div>
                
    
        );
    }
}
 
export default TrendingCars;