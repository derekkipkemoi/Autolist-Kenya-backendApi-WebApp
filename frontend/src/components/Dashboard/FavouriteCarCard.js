import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "nuka-carousel";

import { priceFormat } from "../NumberFormat";
import { numberFormat } from "../NumberFormat";

class FavouriteCarCard extends Component {
  imageToClass = (imagePosition) => {
    var imageClass = "";
    if (imagePosition === 0) {
      imageClass = "carousel-item active";
    } else {
      imageClass = "carousel-item";
    }
    return imageClass;
  };

  handleRemoveButton = async (carId) => {
    this.props.onRemoveFromFavouriteList(carId);
  };
  render() {
    const car = this.props.car;
    const imageStyle = {
      width: "100%",
      height: "15.0rem",
      objectFit: "cover",
    };
    const iconsStyle = {
      color: "#25D366",
    };
    const svgImageStyle = {
      width: "25px",
      marginRight: "5px",
      color: "#fff",
    };
    return (
      <div className="row">
        <div className="card mt-3 ml-3 mr-3 w-100" style={{ marginTop: "5px" }}>
          <div className="row no-gutters">
            <div className="col-sm-5" style={{ background: "#868e96" }}>
              <Carousel>
                {car.images.map((image, i) => (
                  <img
                    key={i}
                    className="card-img"
                    src={image}
                    alt="Card"
                    style={imageStyle}
                  />
                ))}
              </Carousel>
            </div>
            <div className="col-sm-7 col-md-7">
              <div className="card-body carDetails">
                <Link
                  to={`/vehicle/${car.id}`}
                  className="text-dark"
                  style={{ textDecoration: "none" }}
                >
                  <h5 className="card-title font-weight-bold">{car.name}</h5>
                  <h5
                    className="card-title font-weight-bold"
                    style={{ color: "#25D366" }}
                  >
                    {priceFormat(car.price)}{" "}
                    <span
                      className="font-weight-bold"
                      style={{ fontSize: "14px", color: "#ffa010" }}
                    >
                      {car.priceNegotiable ? "Negotiable" : null}
                    </span>
                  </h5>
                  <h5
                    className="card-title font-weight-bold"
                    style={{ fontSize: "15px" }}
                  >
                    <FontAwesomeIcon icon="map-marker-alt" style={iconsStyle} />
                    {car.location}
                  </h5>
                  <p className="card-title" style={{ fontSize: "15px" }}>
                    <span>
                      {" "}
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../../assets/svgs/gauge.svg")}
                      />
                      {numberFormat(car.mileage)} Km |
                    </span>
                    <span>
                      {" "}
                      <img
                        style={svgImageStyle}
                        src={require("../../assets/svgs/new-product.svg")}
                        alt="..."
                      />
                      {car.condition}|
                    </span>
                    <span>
                      {" "}
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../../assets/svgs/gear_box.svg")}
                      />
                      {car.transmission}
                    </span>
                  </p>
                </Link>

                <div className="row" style={{ marginTop: "20px" }}>
                  <div className="col-6">
                    <button
                      className="btn btn-custom btn-block text-dark"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Contact Seller
                    </button>
                    <div
                      className="dropdown-menu bg-light text-light rounded text-center"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <p className="dropdown-item  font-weight-bold text-dark">
                        {car.name} Seller Contacts
                      </p>
                      <p className="dropdown-item  text-dark">
                      <FontAwesomeIcon icon="phone" style={iconsStyle} />0
                        {car.seller.sellerNumber}
                      </p>
                      <a
                        href={`https://wa.me/254${car.seller.sellerNumber}?text=Hello...%20I'm%20interested%20in%20your%20${car.name}%20Listed%20for%20sale%20In%20Motii%20Cars%20Kenya`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="btn btn-whatsApp text-dark text-centre font-weight-bold"
                        type="submit"
                      >
                        <FontAwesomeIcon
                          icon={["fab", "whatsapp"]}
                          style={iconsStyle}
                        />
                        Start Chat{" "}
                      </a>
                    </div>
                  </div>
                  <div className="col">
                    <button
                      className="rounded-circle float-right btn-circle-remove"
                      onClick={this.handleRemoveButton.bind(this, car.id)}
                    >
                      <FontAwesomeIcon icon="times" style={{ color: "red" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FavouriteCarCard;
