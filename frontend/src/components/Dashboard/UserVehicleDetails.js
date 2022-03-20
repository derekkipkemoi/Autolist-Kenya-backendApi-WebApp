import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ImageGallery from "react-image-gallery";
import Select from "react-select";

import NumberFormat from "react-number-format";
import { numberFormat, priceFormat } from "../NumberFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import carsMakes from "../../data/cars.json";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";

const carConditionOption = carsMakes.condition;
const carDutyOption = carsMakes.duty;
const carLocationOption = carsMakes.location;

class UserVehicleDetails extends Component {
  state = {
    type: "loaded",
    loading: true,
    inFavouriteList: false,
    carId: this.props.match.params.vehicleId,
    userRetrived: JSON.parse(localStorage.getItem("UserObject")),

    carDetails:{},
    carImages:[],
    carFeatures:[],

    deleteError: null,
    soldError: null,
    sold: null,
    delete: null,
    percentage: 0,
    message: null,


    editCarPrice: null,
    editCarMileage: null,
    editCarDescription: null,
    editCarPriceNegotiable: true,

    updateError: null,

    selectedCarConditionOption: null,
    selectedCarConditionOptionValue: null,

    selectedCarDutyOption: null,
    selectedCarDutyOptionValue: null,

    selectedCarLocationOption: null,
    selectedCarLocationOptionValue: null,
  };

  EditCarDetails = (car) => {
    this.setState({
      carId: car.id,
      carDetails: this.props.carDetails
      // carName: car.name,
      // message: null,
      // carPrice: car.price,
      // carMileage: car.mileage,
      // carDescription: car.description,
      // carLocation: car.location,
      // carDuty: car.duty,
      // carCondition: car.condition,
    });
  };

  handleSold = async (carId) => {
    if (this.state.sold === "SOLD") {
      this.setState({
        loading: true,
      });
      await this.props.carSold(carId);

      await this.props.getCar(this.props.match.params.vehicleId);
      this.setState({
        carDetails: this.props.carDetails,
        carFeatures: this.props.carFeatures,
        carImages: this.props.carImages,
        message: this.props.message,
        loading: false,
      });
    } else {
      return;
    }
  };

  handleDelete = async (carId) => {
    if (this.state.delete === "DELETE") {
      this.setState({
        loading: true,
      });
      await this.props.deleteCar(carId, (progressEvent) => {
        const percentage = parseInt(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        this.setState({ percentage: percentage });
        return percentage; // Because you were returning the percentage before.
      });

      this.props.history.goBack();
    
    } else {
      return;
    }
  };

  updateCar = async (carId) => {
    if (
      this.state.editCarPrice === null &&
      this.state.editCarMileage === null &&
      this.state.editCarDescription === null &&
      this.state.selectedCarConditionOptionValue === null &&
      this.state.selectedCarDutyOptionValue === null &&
      this.state.selectedCarLocationOptionValue === null
    ) {
      this.setState({
        updateError:
          "No Value updated, Please enter or Select a value you want to update",
      });
    } else {
      var { price, mileage, condition, duty, location, description } = "";
      if (this.state.editCarPrice !== null) {
        price = this.state.editCarPrice;
      } else {
        price = this.state.carDetails.price;
      }
      if (this.state.editCarMileage !== null) {
        mileage = this.state.editCarMileage;
      } else {
        mileage = this.state.carDetails.price;
      }
      if (this.state.selectedCarConditionOptionValue !== null) {
        condition = this.state.selectedCarConditionOptionValue;
      } else {
        condition = this.state.carDetails.condition;
      }
      if (this.state.selectedCarDutyOptionValue !== null) {
        duty = this.state.selectedCarDutyOptionValue;
      } else {
        duty = this.state.carDetails.duty;
      }
      if (this.state.selectedCarLocationOptionValue !== null) {
        location = this.state.selectedCarLocationOptionValue;
      } else {
        location = this.state.carDetails.location;
      }
      if (this.state.editCarDescription !== null) {
        description = this.state.editCarDescription;
      } else {
        description = this.state.carDetails.description;
      }

      this.setState({
        loading: true,
      });
      const params = JSON.stringify({
        condition: condition,
        duty: duty,
        location: location,
        price: parseFloat(price),
        mileage: parseFloat(mileage),
        description: description,
        priceNegotiable: this.state.editCarPriceNegotiable,
      });

      await this.props.carEdit(carId, JSON.parse(params));

      await this.props.getCar(this.props.match.params.vehicleId);
      this.setState({
        carDetails: this.props.carDetails,
        carFeatures: this.props.carFeatures,
        carImages: this.props.carImages
      });


      this.setState({
        message: this.props.message,
        loading: false,
      });

      
    }
  };

  priceChangeHandler = (event) => {
    this.setState({
      editCarPrice: event.target.value.replace(/,/g, ""),
    });
  };

  toggleChangePriceNegotiable = (event) => {
    if (event.target.checked) {
      this.setState({
        editCarPriceNegotiable: true,
      });
    } else {
      this.setState({
        editCarPriceNegotiable: false,
      });
    }
  };

  mileageChangeHandler = (event) => {
    this.setState({
      editCarMileage: event.target.value.replace(/,/g, ""),
    });
  };

  handleCarsConditionChange = (selectedCarConditionOption) => {
    this.setState({
      selectedCarConditionOption,
      selectedCarConditionOptionValue: selectedCarConditionOption.label,
    });
  };

  handleCarsDutyChange = (selectedCarDutyOption) => {
    this.setState({
      selectedCarDutyOption,
      selectedCarDutyOptionValue: selectedCarDutyOption.label,
    });
  };

  handleCarsLocationChange = (selectedCarLocationOption) => {
    this.setState({
      selectedCarLocationOption,
      selectedCarLocationOptionValue: selectedCarLocationOption.label,
    });
  };

  descriptionChangeHandler = (event) => {
    this.setState({
      editCarDescription: event.target.value.replace(/,/g, ""),
    });
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

    this.setState({
      loading: false,
    });

    if (this.props.isAuthenticated) {
      this.setState({
        userRetrived: JSON.parse(localStorage.getItem("UserObject")),
        carDetails: this.props.carDetails,
        carFeatures: this.props.carFeatures,
        carImages: this.props.carImages,
        // carStatus: this.props.carDetails.status,
        // carName: this.props.carDetails.name,
        // carPrice: this.props.carDetails.price,
        // carMileage: this.props.carDetails.mileage,
        // carDescription: this.props.carDetails.name.description,
        // carCondition: this.props.carDetails.condition,
        // carLocation: this.props.carDetails.location,
        // carDuty: this.props.carDetails.duty,

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

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    let soldErr = "";
    if (nam === "sold") {
      if (val === "SOLD") {
        soldErr = null;
      } else {
        soldErr = "Please type SOLD";
      }
    }

    this.setState({
      soldError: soldErr,
    });

    let deleteErr = "";
    if (nam === "delete") {
      if (val === "DELETE") {
        deleteErr = null;
      } else {
        deleteErr = "Please type DELETE";
      }
    }

    this.setState({
      deleteError: deleteErr,
    });

    //Values
    this.setState({
      [nam]: val,
    });
  };

  showHide = async () => {
    var userId = this.state.userRetrived.id;
    if (userId === undefined) {
      userId = this.state.userRetrived.id;
    }
  
    this.setState({
      type: "loading",
    });

    await this.props.addCarToFavouriteList(userId, this.props.match.params.vehicleId);
    this.setState({
      type: "loaded",
      userRetrived: JSON.parse(localStorage.getItem("UserObject")),
    });

    if (this.state.userRetrived.favouriteCars.length > 0) {
      if ([...this.state.userRetrived.favouriteCars].includes(this.props.match.params.vehicleId)) {
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

  render() { 
    const { carDetails, carFeatures, carImages } = this.state;
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

    const buttonStyle = {
      margin: "2px",
      marginTop: "10px",
    };

    const shareUrl = carImages[0];

    var sliderImages = [];
    if (carImages.length > 0) {
      carImages.map((imageItem) =>
        sliderImages.push({
          original: imageItem,
          thumbnail: imageItem,
        })
      );
    }
   


    var carDateString = carDetails.createdAt;
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
                {carDetails.make}
              </Link>
            </li>

            <li className="breadcrumb-item ">
              <Link
                to={`/listcars/${carDetails.make}/${carDetails.model}`}
                className="text-light"
              >
                {carDetails.model}
              </Link>
            </li>
            <li className="breadcrumb-item text-light">
      
              {carDetails.name}
            </li>
          </ol>
        </nav>
        <div className="row">

        <aside className="col-md-3 blog-sidebar">
            <div className="card-header">
              <div
                className="card-text"
                style={{ fontSize: "23px", color: "#25D366" }}
              >
                <span className="font-weight-bold">
              
                  {priceFormat(carDetails.price)}
                </span>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                               <h5 class="card-title font-weight-bold">
                                {carDetails.name}
                              </h5>
                              <h5 class="card-title">
                                Views: {carDetails.views}
                              </h5>

                              <h5>
                              <span class="card-title">
                                Status:
                              </span>

                              <span class="card-title font-weight-bold text-right" style={{ marginLeft: "2px" }}>
                                {" "}
                                {carDetails.status === "active" ? (
                                  <span class="text-success">Active</span>
                                ) : null}
                                {carDetails.status === "declined" ? (
                                  <span class="text-danger">Rejected</span>
                                ) : null}
                                {carDetails.status === "underreview" ? (
                                  <span class="text-warning">
                                    Under Review
                                  </span>
                                ) : null}
                                {carDetails.status === "sold" ? (
                                  <span class="text-info">Sold</span>
                                ) : null}
                              </span>
                              </h5>


                          
                           

                            {carDetails.status === "active" ? (
                              <div>
                                <button
                                  type="button"
                                  class="btn btn-outline-secondary btn-block"
                                  data-toggle="modal"
                                  data-target="#editCarModal"
                                  onClick={this.EditCarDetails.bind(this, carDetails)}
                                  style={buttonStyle}
                                >
                                  Edit Car
                                </button>

                                <Link
                                  type="button"
                                  class="btn btn-outline-primary btn-block"
                                  to={`/marketcar/${carDetails.id}`}
                                  style={buttonStyle}
                                >
                                  Sell Faster
                                </Link>

                                <button
                                  type="button"
                                  class="btn btn-outline-success btn-block"
                                  data-toggle="modal"
                                  data-target="#markCarSoldModal"
                                  onClick={this.EditCarDetails.bind(this,carDetails)}
                                  style={buttonStyle}
                                >
                                  Mark as Sold
                                </button>
                              </div>
                            ) : null}

                            {carDetails.status === "declined" ? (
                              <span>
                                <button
                                  type="button"
                                  class="btn btn-outline-secondary btn-block"
                                  data-toggle="modal"
                                  data-target="#editCarModal"
                                  onClick={this.EditCarDetails.bind(this, carDetails)}
                                  style={buttonStyle}
                                >
                                  Edit Car
                                </button>
                              </span>
                            ) : null}

                            {carDetails.status === "underreview" ? (
                              <span>
                                <button
                                  type="button"
                                  class="btn btn-outline-secondary btn-block"
                                  data-toggle="modal"
                                  data-target="#editCarModal"
                                  onClick={this.EditCarDetails.bind(this, carDetails)}
                                  style={buttonStyle}
                                >
                                  Edit Car
                                </button>
                              </span>
                            ) : null}

                            <button
                              type="button"
                              class="btn btn-outline-danger btn-block"
                              data-toggle="modal"
                              data-target="#deleteCar"
                              onClick={this.EditCarDetails.bind(this, carDetails)}
                              style={buttonStyle}
                            >
                              Delete Car
                            </button>
                         

                
              </div>
            </div>

            <div
                            class="modal fade"
                            id="editCarModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    {carDetails.name}
                                  </h5>
                                  <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <form>
                                    <div class="form-group">
                                      <label
                                        htmlFor="price-name"
                                        class="col-form-label"
                                      >
                                        Price(Ksh){" "}
                                      </label>
                                      <NumberFormat
                                        thousandSeparator={true}
                                        class="form-control text-dark"
                                        placeholder={priceFormat(
                                          carDetails.price
                                        )}
                                        name="price"
                                        onChange={this.priceChangeHandler}
                                        inputMode="numeric"
                                      />
                                    </div>
                                    <div class="form-group">
                                      <label
                                        htmlFor="description-text"
                                        class="col-form-label"
                                      >
                                        Price is Negotiable:
                                      </label>
                                      <input
                                        type="checkbox"
                                        class="orm-control"
                                        id="priceIsNegotiable"
                                        onChange={
                                          this.toggleChangePriceNegotiable
                                        }
                                        defaultChecked={carDetails.priceNegotiable}
                                      />
                                    </div>
                                    <div class="form-group">
                                      <label
                                        htmlFor="mileage-name"
                                        class="col-form-label"
                                      >
                                        Mileage(Km){" "}
                                      </label>
                                      <NumberFormat
                                        thousandSeparator={true}
                                        class="form-control text-dark"
                                        placeholder={
                                          numberFormat(carDetails.mileage) +
                                          " Km"
                                        }
                                        name="mileage"
                                        onChange={this.mileageChangeHandler}
                                        inputMode="numeric"
                                      />
                                    </div>

                                    <div class="form-group">
                                      <label
                                        htmlFor="condition-name"
                                        class="col-form-label"
                                      >
                                        Condition
                                      </label>
                                      <Select
                                        value={
                                          this.state.selectedCarConditionOption
                                        }
                                        onChange={
                                          this.handleCarsConditionChange
                                        }
                                        options={carConditionOption}
                                        placeholder={carDetails.condition}
                                      />
                                    </div>

                                    <div class="form-group">
                                      <label
                                        htmlFor="duty-name"
                                        class="col-form-label"
                                      >
                                        Duty
                                      </label>
                                      <Select
                                        value={this.state.selectedCarDutyOption}
                                        onChange={this.handleCarsDutyChange}
                                        options={carDutyOption}
                                        placeholder={carDetails.duty}
                                      />
                                    </div>

                                    <div class="form-group">
                                      <label
                                        htmlFor="location-name"
                                        class="col-form-label"
                                      >
                                        Location
                                      </label>
                                      <Select
                                        value={
                                          this.state.selectedCarLocationOption
                                        }
                                        onChange={this.handleCarsLocationChange}
                                        options={carLocationOption}
                                        placeholder={carDetails.location}
                                      />
                                    </div>

                                    <div class="form-group">
                                      <label
                                        htmlFor="description-text"
                                        class="col-form-label"
                                      >
                                        Description:
                                      </label>
                                      <textarea
                                        rows="3"
                                        minLength="50"
                                        class="form-control"
                                        onChange={this.descriptionChangeHandler}
                                        placeholder={carDetails.description}
                                      ></textarea>
                                    </div>
                                    <p class="text-danger">
                                      {this.state.updateError}
                                    </p>
                                    {this.state.loading ? <Spinner /> : null}
                                    <p class="text-success">
                                      {this.state.message}
                                    </p>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <div className="text-success font-weight-bold">To update all car details use our app (Get from play store)</div>
                                  <a 
                                        className="btn btn-outline-info"
                                        rel="noopener noreferrer" 
                                        href="https://play.google.com/store/apps/details?id=org.carlistingapp.autolist" 
                                        target="_blank"
                                        role="button"
                                        style={{ marginTop: "5px" }}>
                                          <img
                                          style={{ width: "30px", marginRight: "10px" }}
                                          alt="Clock"
                                          src={require("../../assets/svgs/google-play.svg")}
                                        />
                                          Google Play
                                  </a>
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={this.updateCar.bind(
                                      this,
                                      this.state.carId
                                    )}
                                  >
                                    Update Car
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>



                          <div
                            class="modal fade"
                            id="markCarSoldModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    {carDetails.name}
                                  </h5>
                                  <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <form>
                                    <div class="form-group">
                                      <label
                                        htmlFor="recipient-name"
                                        class="col-form-label"
                                      >
                                        Type SOLD To Confirm:
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        name="sold"
                                        onChange={this.handleChange}
                                      />
                                      <p class="text-danger">
                                        {this.state.soldError}
                                      </p>
                                      {this.state.loading ? <Spinner /> : null}
                                      <p class="text-success">
                                        {this.state.message}
                                      </p>
                                    </div>
                                  </form>
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-success"
                                    onClick={this.handleSold.bind(
                                      this,
                                      this.props.match.params.vehicleId
                                    )}
                                  >
                                    Mark Car As Sold
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            class="modal fade"
                            id="deleteCar"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    {carDetails.name}
                                  </h5>
                                  <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <form>
                                    <div class="form-group">
                                      <label
                                        htmlFor="recipient-name"
                                        class="col-form-label"
                                      >
                                        Type DELETE To Confirm:
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        name="delete"
                                        onChange={this.handleChange}
                                      />
                                      <p class="text-danger">
                                        {this.state.deleteError}
                                      </p>
                                      {this.state.loading ? <Spinner /> : null}
                                      <p class="text-success">
                                        {this.state.message}
                                      </p>
                                    </div>
                                  </form>
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-danger"
                                    onClick={this.handleDelete.bind(
                                      this,
                                      this.props.match.params.vehicleId
                                    )}
                                  >
                                    Delete Car
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

            <div className="p-3 mb-3 bg-light text-light rounded">
              <h6 className="font-italic">Ad Section</h6>
              <p className="mb-0">
                Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                mattis consectetur purus sit amet fermentum. Aenean lacinia
                bibendum nulla sed consectetur.
              </p>
            </div>
          </aside>
          <div className="col-md-9">
            {this.state.loading ? <Spinner /> : null}

            <div className="card">
              <ImageGallery items={sliderImages} />
            </div>

            <div className="card" style={{ padding: "5px", marginTop: "10px" }}>
              <div style={{ padding: "5px", marginTop: "10px" }}>
                <p className="font-weight-bold" style={{ fontSize: "20px" }}>
                  {carDetails.name}.
                </p>
                <p className="card-text">
                  <span style={{ fontSize: "16px" }}>
                    <FontAwesomeIcon icon="map-marker-alt" style={iconsStyle} />
                    {carDetails.location}.
                  </span>

                  <span style={{ fontSize: "16px" }}>
                    <FontAwesomeIcon icon="eye" style={iconsStyle} />
                    Views : {carDetails.views}
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
                <p>{carDetails.description}</p>
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
                        src={require("../../assets/svgs/gear_box.svg")}
                      />
                      {carDetails.transmission}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../../assets/svgs/gauge.svg")}
                      />
                      {numberFormat(carDetails.mileage)} Km
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../../assets/svgs/fuel.svg")}
                      />
                      {carDetails.fuel}
                    </td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../../assets/svgs/engine.svg")}
                      />
                      {numberFormat(carDetails.engineSize)} cc
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../../assets/svgs/brand.svg")}
                      />
                      {carDetails.make}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../../assets/svgs/scissors.svg")}
                      />
                      {carDetails.model}
                    </td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        alt="Clock"
                        src={require("../../assets/svgs/calendar.svg")}
                      />
                      {carDetails.year}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../../assets/svgs/shapes.svg")}
                        alt="..."
                      />
                      {carDetails.body}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../../assets/svgs/tax.svg")}
                        alt="..."
                      />
                      {carDetails.duty}
                    </td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../../assets/svgs/color.svg")}
                        alt="..."
                      />
                      {carDetails.color}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../../assets/svgs/furnitures.svg")}
                        alt="..."
                      />
                      {carDetails.interior}
                    </td>
                    <td className="text-secondary">
                      <img
                        style={svgImageStyle}
                        src={require("../../assets/svgs/new-product.svg")}
                        alt="..."
                      />
                      {carDetails.condition}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {carFeatures.length > 0 ? (
              <div
                className="card"
                style={{ padding: "5px", marginTop: "10px" }}
              >
                <div className="row mx-auto">
                  {carFeatures.map((feature, i) => (
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
                        src={require("../../assets/svgs/like.svg")}
                      />
                    )}
                  </button>
                ) : null}

                {
                  <FacebookShareButton
                    url={shareUrl}
                    quote={
                      carDetails.name +
                      "   " +
                      carDetails.description
                    }
                    hashtag={carDetails.model}
                  >
                    <FacebookIcon size={36} round={true} />
                  </FacebookShareButton>
                }

                {
                  <WhatsappShareButton
                    title={shareUrl}
                    url={
                      carDetails.name +
                      "   " +
                      carDetails.description
                    }
                  >
                    <WhatsappIcon size={36} round={true} />
                  </WhatsappShareButton>
                }

                {
                  <TwitterShareButton
                    //imageURL={shareUrl}
                    title={carDetails.name}
                    url={
                      "https://www.autolist.co.ke/vehicle/" +
                      this.props.match.params.vehicleId
                    }
                  >
                    <TwitterIcon size={36} round={true} />
                  </TwitterShareButton>
                }
              </div>
            </div>
          </div>

          
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
    isAuthenticated: state.auth.isAuthenticated,
    message: state.carActions.message,
  };
}

export default connect(mapStateToProps, actions)(UserVehicleDetails);
