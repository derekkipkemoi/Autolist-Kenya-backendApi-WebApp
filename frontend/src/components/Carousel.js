import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../assets/css/carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { priceFormat, numberFormat } from "./NumberFormat";

class Carousel extends Component {
  state = {
    type: "input",
  };

  componentDidMount() {
    window.$("#recipeCarousel").carousel({
      interval: 3000,
    });

    window.$(".carousel .carousel-item").each(function () {
      var minPerSlide = 4;
      var next = window.$(this).next();
      if (!next.length) {
        next = window.$(this).siblings(":first");
      }
      next.children(":first-child").clone().appendTo(window.$(this));

      for (var i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
          next = window.$(this).siblings(":first");
        }

        next.children(":first-child").clone().appendTo(window.$(this));
      }
    });
  }

  imageToClass = (imagePosition) => {
    var imageClass = "";
    if (imagePosition === 0) {
      imageClass = "carousel-item active";
    } else {
      imageClass = "carousel-item";
    }
    return imageClass;
  };

  handleFavouriteClick = (event) => {};

  render() {
    const featuredCars = this.props.featuredCars
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
      width: "30px",
      marginRight: "5px",
      color: "#fff",
    };

    const svgPremiumImageStyle = {
      width: "40px",
      height: "40px",
      marginLeft: "10px",
    };

    const cardBottomStyle = {
      backgroundColor: "#fcd319"
    };
    return (
      <div>
        {featuredCars.length > 0 ? (
          <div className="row justify-content-center">
            <p className="text-centre font-weight-bold">Featured Vehicles</p>
            <div
              id="recipeCarousel"
              className="carousel slide w-100"
              data-ride="carousel"
            >
              <div className="carousel-inner w-100">
                {featuredCars.map((car, i) => (
                  <div
                    key={i}
                    className={this.imageToClass(featuredCars.indexOf(car))}
                  >
                    <div className="col-md-4">
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
                              <img
                                  style={svgPremiumImageStyle}
                                  alt="Clock"
                                  src={require("../assets/svgs/premium.svg")}
                                />
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
                  </div>
                ))}
              </div>
              <a
                className="carousel-control-prev w-auto"
                href="#recipeCarousel"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bg-dark border border-dark rounded-circle"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next w-auto"
                href="#recipeCarousel"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon bg-dark border border-dark rounded-circle"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Carousel;
