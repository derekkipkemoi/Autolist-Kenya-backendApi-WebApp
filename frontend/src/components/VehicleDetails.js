import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ImageGallery from "react-image-gallery";

import { numberFormat, priceFormat } from "./NumberFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import CarCard from "./CarCard";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";

class VehicleDetails extends Component {
  state = {
    type: "loaded",
    loading: true,
    inFavouriteList: false,
    sellerNumber: "Show Contact",
    sellerJoinedAt: null,
    cars: this.props.carsList,
    carId: this.props.match.params.vehicleId,
    userRetrived: JSON.parse(localStorage.getItem("UserObject")),
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.carId !== this.props.match.params.vehicleId) {
      window.location.reload();
    }
  }

  componentDidMount = async () => {
    this.setState({});
    window.$(window).scrollTop(0);
    await this.props.getCar(this.props.match.params.vehicleId);
    await this.props.carViewed(this.props.match.params.vehicleId);
    await this.props.getCarsList();
    var dateString = this.props.carSeller.sellerAvailableSince;
    dateString = new Date(dateString).toUTCString();
    dateString = dateString.split(" ").slice(0, 4).join(" ");

    this.setState({
      loading: false,
      cars: this.props.carsList,
      sellerJoinedAt: dateString,
    });

    if (this.props.isAuthenticated) {
      this.setState({
        userRetrived: JSON.parse(localStorage.getItem("UserObject")),
      });
    }

    if (
      this.state.userRetrived !== null &&
      this.state.userRetrived.favouriteCars.length > 0
    ) {
      if (
        [...this.state.userRetrived.favouriteCars].includes(this.state.carId)
      ) {
        this.setState({
          inFavouriteList: true,
        });
      } else {
        this.setState({
          inFavouriteList: false,
        });
      }
    }
  };

  showHide = async () => {
    var userId = this.state.userRetrived.id;
    if (userId === undefined) {
      userId = this.state.userRetrived.id;
    }
    const carId = this.state.carId;
    this.setState({
      type: "loading",
    });

    await this.props.addCarToFavouriteList(userId, carId);
    this.setState({
      type: "loaded",
      userRetrived: JSON.parse(localStorage.getItem("UserObject")),
    });

    if (this.state.userRetrived.favouriteCars.length > 0) {
      if ([...this.state.userRetrived.favouriteCars].includes(carId)) {
        this.setState({
          inFavouriteList: true,
        });
      } else {
        this.setState({
          inFavouriteList: false,
        });
      }
    }
  };

  showSellerNumber(sellerNumber) {
    this.setState({
      sellerNumber: "0" + sellerNumber,
    });
  }
  render() {

    const featureStyle = {
      backgroundColor: "#25D366",
      color: "#fff",
    };

    const iconsStyle = {
      color: "#00544C",
      marginLeft: "10px",
      marginRight: "10px",
    };

    const socialMediaIconsStyle = {
      marginTop: "10px",
    };

    const featureiconsStyle = {
      color: "#ffff",
      marginLeft: "10px",
      marginRight: "10px",
    };

    const svgImageStyle = {
      width: "30px",
      marginRight: "5px",
      color: "#fff",
    };

    var id = this.props.carDetails.id;
    let filteredCars = this.state.cars;
    var index = filteredCars
      .map((car) => {
        return car.id;
      })
      .indexOf(id);

    filteredCars.splice(index, 1);

    if (filteredCars.length > 0) {
      filteredCars = filteredCars.filter((myCar) =>
        myCar.body.includes(this.props.carDetails.body)
      );
    }

    const compare = (a, b) => {
      if (a.model < b.model) {
        return -1;
      }
      if (a.model > b.model) {
        return 1;
      }
      return 0;
    };

    filteredCars.sort(compare);

    // const carDetails = this.props.carDetails;
    // const carImages = this.props.carImages;
    // const carFeatures = this.props.carFeatures;
    // const carSeller = this.props.carSeller;
    const shareUrl = this.props.carImages[0];
    // const appId = this.props.carImages[0];

    var sliderImages = [];
    if (this.props.carImages && this.props.carImages.length > 0) {
      this.props.carImages.map((imageItem) =>
        sliderImages.push({
          original: imageItem,
          thumbnail: imageItem,
        })
      );
    }

    var carDateString = this.props.carDetails.createdAt;
    carDateString = new Date(carDateString).toUTCString();
    carDateString = carDateString.split(" ").slice(0, 4).join(" ");

    return (
      <div className="container">
        <nav aria-label="breadcrumb" style={{ marginTop: "70px" }}>
          <ol
            className="breadcrumb arr-right"
            style={{ backgroundColor: "#25D366" }}
          >
            <li className="breadcrumb-item ">
              <Link to={`/`} className="text-light">
                Home
              </Link>
            </li>

            <li className="breadcrumb-item ">
              <Link
                to={`/listcars/${this.props.carDetails.make}`}
                className="text-light"
              >
                {this.props.carDetails.make}
              </Link>
            </li>

            <li className="breadcrumb-item ">
              <Link
                to={`/listcars/${this.props.carDetails.make}/${this.props.carDetails.model}`}
                className="text-light"
              >
                {this.props.carDetails.model}
              </Link>
            </li>
            <li className="breadcrumb-item text-light">
              {this.props.carDetails.name}
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-9">
            {this.state.loading ? <Spinner /> : null}

            <div className="card">
              <ImageGallery items={sliderImages} />
            </div>

            <div className="card" style={{ padding: "5px", marginTop: "10px" }}>
              <div style={{ padding: "5px", marginTop: "10px" }}>
                <p className="font-weight-bold" style={{ fontSize: "20px" }}>
                  {this.props.carDetails.name}.
                </p>
                <p className="card-text">
                  <span style={{ fontSize: "16px" }}>
                    <FontAwesomeIcon icon="map-marker-alt" style={iconsStyle} />
                    {this.props.carDetails.location}.
                  </span>

                  <span style={{ fontSize: "16px" }}>
                    <FontAwesomeIcon icon="eye" style={iconsStyle} />
                    Views : {this.props.carDetails.views}
                  </span>

                  <span style={{ fontSize: "16px" }}>
                    <FontAwesomeIcon icon="clock" style={iconsStyle} />
                    Posted : {carDateString}
                  </span>
                </p>
              </div>
            </div>

            <div className="card" style={{ padding: "5px", marginTop: "10px" }}>
              <div style={{ padding: "5px", marginTop: "10px" }}>
                <p>{this.props.carDetails.description}</p>
              </div>
            </div>

            <div className="card" style={{ padding: "5px", marginTop: "10px" }}>
              <table className="table  table-condensed rounded alert-dark">
                <tbody>
                  <tr>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/gear_box.svg")}
                      />
                      {this.props.carDetails.transmission}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/gauge.svg")}
                      />
                      {numberFormat(this.props.carDetails.mileage)} Km
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/fuel.svg")}
                      />
                      {this.props.carDetails.fuel}
                    </td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/engine.svg")}
                      />
                      {numberFormat(this.props.carDetails.engineSize)} cc
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/brand.svg")}
                      />
                      {this.props.carDetails.make}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/scissors.svg")}
                      />
                      {this.props.carDetails.model}
                    </td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../assets/svgs/calendar.svg")}
                      />
                      {this.props.carDetails.year}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../assets/svgs/shapes.svg")}
                        alt="..."
                      />
                      {this.props.carDetails.body}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../assets/svgs/tax.svg")}
                        alt="..."
                      />
                      {this.props.carDetails.duty}
                    </td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../assets/svgs/color.svg")}
                        alt="..."
                      />
                      {this.props.carDetails.color}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../assets/svgs/furnitures.svg")}
                        alt="..."
                      />
                      {this.props.carDetails.interior}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../assets/svgs/new-product.svg")}
                        alt="..."
                      />
                      {this.props.carDetails.condition}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {this.props.carFeatures && this.props.carFeatures.length > 0 ? (
              <div
                className="card"
                style={{ padding: "5px", marginTop: "10px" }}
              >
                <div className="row mx-auto">
                  {this.props.carFeatures.map((feature, i) => (
                    <li
                      key={i}
                      className="list-group-item flex-fill"
                      style={featureStyle}
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon="check-square"
                        style={featureiconsStyle}
                      />
                      {feature}
                    </li>
                  ))}
                </div>
              </div>
            ) : null}

            <div>
              <div style={socialMediaIconsStyle}>
                {this.props.isAuthenticated ? (
                  <button
                    className="btn-round-favourite"
                    onClick={this.showHide.bind(this)}
                  >
                    {this.state.type === "loading" ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                        style={{ color: "#d60841" }}
                      />
                    ) : null}

                    {this.state.inFavouriteList ? (
                      <FontAwesomeIcon
                        icon="heart"
                        style={{ color: "#d60841" }}
                      />
                    ) : (
                      <img
                        style={{ width: "18px" }}
                        alt="Clock"
                        src={require("../assets/svgs/like.svg")}
                      />
                    )}
                  </button>
                ) : null}

                {
                  <FacebookShareButton
                    url={shareUrl}
                    quote={
                      this.props.carDetails.name +
                      "   " +
                      this.props.carDetails.description
                    }
                    hashtag={this.props.carDetails.model}
                  >
                    <FacebookIcon size={36} round={true} />
                  </FacebookShareButton>
                }

                {
                  <WhatsappShareButton
                    title={shareUrl}
                    url={
                      this.props.carDetails.name +
                      "   " +
                      this.props.carDetails.description
                    }
                  >
                    <WhatsappIcon size={36} round={true} />
                  </WhatsappShareButton>
                }

                {
                  <TwitterShareButton
                    //imageURL={shareUrl}
                    title={this.props.carDetails.name}
                    url={
                      "https://www.motikenya.co.ke/vehicle/" +
                      this.props.match.params.vehicleId
                    }
                  >
                    <TwitterIcon size={36} round={true} />
                  </TwitterShareButton>
                }
              </div>
            </div>

            <div>
              {this.state.loading ? <Spinner /> : null}
              {filteredCars.length > 0 ? 
              <h6 className="blog-post-title font-weight-bold" style={{marginTop:"10dp"}}>
              Similar Adverts
              <hr></hr>
            </h6>
            
             : null}
                  
              {filteredCars.map((car) => (
                <div key={car.id}>
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          </div>

          <aside className="col-md-3 blog-sidebar">
            <div className="card-header">
              <div
                className="card-text"
                style={{ fontSize: "23px", color: "#25D366" }}
              >
                <span className="font-weight-bold">
                  {priceFormat(this.props.carDetails.price)}
                </span>
              </div>
            </div>

           
              <div className="card">
              <div style={{ padding: "5px", marginTop: "20px" }}>
                
                <p className="card-text text-center">
                  
                  <Link
                to={`/userList/${this.props.carSeller.sellerID}`}
                className="text-decoration-none text-dark"
              >
                {this.props.carSeller.sellerPhoto === "" ||
                this.props.carSeller.sellerPhoto === undefined ||
                this.props.carSeller.sellerPhoto === null ? (
                  <img
                    src="../assets/svgs/user.svg"
                    className="rounded-circle"
                    alt="..."
                    width="100"
                    height="100"
                    style={{ marginTop: "10px", color: "#000000" }}
                  />
                ) : (
                  <img
                    src={this.props.carSeller.sellerPhoto}
                    className="rounded-circle"
                    alt="..."
                    width="100"
                    height="100"
                    style={{ marginTop: "10px" }}
                  />
                )}
              </Link>
                  </p>

                  <p className="card-text text-center font-weight-bold" style={{ fontSize: "18px" }}>
                  {this.props.carSeller.sellerName}
                 </p>
                
              </div>
            
              
              <div className="card-body">
                {
                  <a
                    href={`https://wa.me/254${this.props.carSeller.sellerNumber}?text=Hello...%20I'm%20interested%20in%20your%20${this.props.carDetails.name}%20Listed%20for%20sale%20In%20Motii%20Cars%20Kenya`}
                    target="_blank"
                    rel="noreferrer noopener"
                    role="button"
                    className="btn btn btn-whatsApp btn-block text-dark text-centre font-weight-bold"
                    type="submit"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "whatsapp"]}
                      style={iconsStyle}
                    />
                    Start Chat{" "}
                  </a>
                }

                {
                  <button
                    className="btn btn-custom btn-block text-dark text-centre font-weight-bold"
                    type="submit"
                    onClick={this.showSellerNumber.bind(
                      this,
                      this.props.carSeller.sellerNumber
                    )}
                  >
                    <FontAwesomeIcon icon="phone" style={iconsStyle} />
                    {this.state.sellerNumber}
                  </button>
                }
              </div>
            </div>

            <div className="p-3 mb-3 bg-light text-dark rounded" style={{marginTop:"20px"}}>
              <h5 className="font-weight-bold"><u>Safety Tips </u></h5>
              <p className="mb-0">
              •	Don't send any prepayments     
              </p>
              <p className="mb-0">
              •	Meet with the seller at a safe public place
              </p>
              <p className="mb-0">
              •	Inspect what you're going to buy to make sure it's what you need    
              </p>
              <p className="mb-0"> 
              •	Check all the docs and only pay if you're satisfied                   
              </p>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    carDetails: state.carDetails.carDetails,
    carImages: state.carDetails.carImages,
    carFeatures: state.carDetails.carFeatures,
    carSeller: state.carDetails.carSeller,
    carActions: state.carActions.message,
    carsList: state.carsList.carsList,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, actions)(VehicleDetails);
