import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import FilterSellcarComponent from "./FilterSellCarComponenet";
import * as actions from "../../actions";
import carsMakes from "../../data/cars.json";
import Progress from "../Progress";
import NumberFormat from "react-number-format";
import Spinner from "../Spinner";
import ImageUpload from "./ImageUpload";

const commonFeatures = carsMakes.commonFeatures;
const extraFeatures = carsMakes.extraFeatures;

class SellcarComponent extends Component {
  // initialize your options array on your state

  state = {
    make: null,
    model: null,
    year: null,
    body: null,
    condition: null,
    transmission: null,
    duty: null,
    fuel: null,
    interior: null,
    color: null,
    location: null,
    sellerName: null,
    sellerNumber: null,
    carObject: null,
    phone: null,
    price: null,
    mileage: null,
    engineSize: null,
    description: null,
    errorPrice: null,
    errorMileage: null,
    errorEngineSize: null,
    errorDescription: null,
    priceIsNegotiable: true,
    MakeError: true,
    modelError: true,
    yearError: true,
    bodyError: true,
    conditionError: true,
    transmissionError: true,
    dutyError: true,
    fuelError: true,
    interiorError: true,
    colorError: true,
    locationError: true,
    imagesError: null,
    value: "",
    isChecked: true,
    commonFeaturesOptions: [],
    extraFeaturesOptions: [],
    carPhotosList: [],
    file: null,
    percentage: 0,
    loading: true,
    userObject: {},
  };

  initComponent = async() => {
    if (this.props.isAuthenticated) {
      await this.props.getUser(
        JSON.parse(localStorage.getItem("UserObject")).id
      );
      const userObject = this.props.userObject;

      if (userObject.phoneNumber.verified) {
        switch (userObject.method) {
          case "google":
            this.setState({
              sellerName: userObject.google.name,
              sellerNumber: userObject.phoneNumber.number,
              loading: false,
            });
            break;
          case "facebook":
            this.setState({
              sellerName: userObject.facebook.name,
              sellerNumber: userObject.phoneNumber.number,
              loading: false,
            });
            break;
          case "local":
            this.setState({
              sellerName: userObject.local.name,
              sellerNumber: userObject.phoneNumber.number,
              loading: false,
            });
            break;
          default:
            this.setState({
              sellerName: "Hallo",
            });
        }
      } else {
        this.props.history.push({
          pathname: "/updatePhoneNumber",
          search: "?query=abc",
          state: { detail: "sellCar" },
        });
      }
    }
  };

  componentDidMount =()=> {
    this.initComponent();
  }

  

  submitHandler = async (event) => {
    event.preventDefault();

    if (
      this.state.make == null ||
      this.state.model == null ||
      this.state.year == null ||
      this.state.body == null ||
      this.state.condition == null ||
      this.state.transmission == null ||
      this.state.duty == null ||
      this.state.fuel == null ||
      this.state.interior == null ||
      this.state.color == null ||
      this.state.location == null
    ) {
      window.$(window).scrollTop(0);
      return;
    }

    if (this.state.price == null) {
      this.setState({
        errorPrice: "Car Price Required",
      });
      window.$(window).scrollTop(0);
      return;
    }

    if (this.state.mileage == null) {
      this.setState({
        errorMileage: "Car Mileage Required",
      });
      window.$(window).scrollTop(0);
      return;
    }

    if (this.state.engineSize == null) {
      this.setState({
        errorEngineSize: "Car Engine Size Required",
      });
      window.$(window).scrollTop(0);
      return;
    }

    if (this.state.description == null || this.state.description.length < 30) {
      this.setState({ errorDescription: "Car Description Required" });
      window.$(window).scrollTop(0);
      return;
    }

    if (
      this.state.carPhotosList == null ||
      this.state.carPhotosList.length < 5
    ) {
      this.setState({
        errorImages: "Minimum of 5 photos required",
      });
      return;
    }

    this.setState({
      loading: true,
    });

    const params = JSON.stringify({
      name: this.state.make.concat(" ", this.state.model, " ", this.state.year),
      make: this.state.make,
      model: this.state.model,
      year: this.state.year,
      body: this.state.body,
      condition: this.state.condition,
      transmission: this.state.transmission,
      duty: this.state.duty,
      fuel: this.state.fuel,
      interior: this.state.interior,
      color: this.state.color,
      location: this.state.location,
      features: this.state.commonFeaturesOptions,
      price: parseFloat(this.state.price),
      priceNegotiable: this.state.priceIsNegotiable,
      mileage: parseFloat(this.state.mileage),
      engineSize: parseFloat(this.state.engineSize),
      description: this.state.description,
    });

    await this.props.postCar(
      this.props.userObject.id,
      JSON.parse(params)
    );
    //Post Car Details

    this.setState({
      carObject: this.props.carObject,
    });

    if (this.props.message === "Uploaded Successfuly") {
      const imagesData = new FormData();
      for (const file of this.state.carPhotosList) {
        imagesData.append("photos", file);
      }
      await this.props.postCarImages(
        this.props.carObject.id,
        imagesData,
        (progressEvent) => {
          const percentage = parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
          this.setState({ percentage: percentage });
          return percentage; // Because you were returning the percentage before.
        }
      );

      if (
        this.props.message === "Car Details and Images uploaded successfuly"
      ) {
        this.props.history.push(`/dashboard`);
      }
    }
  };

  handleCarMake = (make, error) => {
    this.setState({ make: make, MakeError: error });
  };

  handleCarModel = (model, error) => {
    this.setState({ model: model, modelError: error });
  };

  handleCarYear = (year, error) => {
    this.setState({ year: year, yearError: error });
  };

  handleCarBody = (body, error) => {
    this.setState({ body: body, bodyError: error });
  };

  handleCarCondition = (condition, error) => {
    this.setState({ condition: condition, conditionError: error });
  };

  handleCarTransmission = (transmission, error) => {
    this.setState({ transmission: transmission, transmissionError: error });
  };

  handleCarDuty = (duty, error) => {
    this.setState({ duty: duty, dutyError: error });
  };

  handleCarfuel = (fuel, error) => {
    this.setState({ fuel: fuel, fuelError: error });
  };

  handleCarInterior = (interior, error) => {
    this.setState({ interior: interior, interiorError: error });
  };

  handleCarColor = (color, error) => {
    this.setState({ color: color, colorError: error });
  };

  handleCarLocation = (location, error) => {
    this.setState({ location: location, locationError: error });
  };

  toggleChangeCommonFeatures = (event) => {
    const commonFeaturesOptions = [...this.state.commonFeaturesOptions];

    const value = event.target.value;
    const index = commonFeaturesOptions.findIndex(
      (feature) => feature === value
    );

    if (index > -1) {
      commonFeaturesOptions.splice(index, 1);
    } else {
      commonFeaturesOptions.push(value);
    }

    // sort the array
    commonFeaturesOptions.sort();
    // update the state with the new array of options
    this.setState({
      commonFeaturesOptions: commonFeaturesOptions,
    });
  };

  toggleChangeExtraFeatures = (event) => {
    const extraFeaturesOptions = this.state.commonFeaturesOptions;
    const value = event.target.value;
    const index = extraFeaturesOptions.findIndex(
      (feature) => feature === value
    );

    if (index > -1) {
      extraFeaturesOptions.splice(index, 1);
    } else {
      extraFeaturesOptions.push(value);
    }
    // sort the array
    extraFeaturesOptions.sort();
    // update the state with the new array of options
    this.setState({
      commonFeaturesOptions: extraFeaturesOptions,
    });
  };

  toggleChangePriceNegotiable = (event) => {
    if (event.target.cheked) {
      this.setState({
        priceIsNegotiable: true,
      });
    } else {
      this.setState({
        priceIsNegotiable: false,
      });
    }
  };

  f;

  priceChangeHandler = (event) => {
    this.setState({
      price: event.target.value.replace(/,/g, ""),
      errorPrice: null,
    });
  };
  mileageChangeHandler = (event) => {
    this.setState({
      mileage: event.target.value.replace(/,/g, ""),
      errorMileage: null,
    });
  };

  engineSizeChangeHandler = (event) => {
    this.setState({
      engineSize: event.target.value.replace(/,/g, ""),
      errorEngineSize: null,
    });
  };

  decriptionChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    //Values
    this.setState({ [nam]: val });
  };

  handleCarPhotos = (carPhotosList) => {
    this.setState({ carPhotosList });
  };

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    let errDescription = "";
    if (nam === "description") {
      if (val.length < 50) {
        errDescription = "Should be more than 30 Characters";
      }
    }

    this.setState({
      errorDescription: errDescription,
    });

    //Values
    this.setState({
      [nam]: val,
    });
  };
  render() {
    const mystyle = { marginTop: "70px" };
    const selectorStyle = {
      backgroundColor: "#fafafa",
      margin: "10px",
    };
    const errorText = { fontSize: "12px", margin: "0px", Padding: "0px" };

    return (
      <div className="sell-car">
        <div className="container" style={mystyle}>
          <div className="mx-auto">
            <div class="center-container">
              <div className="col-md-12">
                <div>
                  <div>
                    <div>
                      {this.state.loading ? <Spinner /> : null}
                      <h5 className="card-header">Sell Your Car</h5>
                      <div>
                        <p className="card-text">
                          <FilterSellcarComponent
                            handleCarMake={this.handleCarMake.bind(this)}
                            handleCarModel={this.handleCarModel.bind(this)}
                            handleCarYear={this.handleCarYear.bind(this)}
                            handleCarBody={this.handleCarBody.bind(this)}
                            handleCarCondition={this.handleCarCondition.bind(
                              this
                            )}
                            handleCarTransmission={this.handleCarTransmission.bind(
                              this
                            )}
                            handleCarFuel={this.handleCarfuel.bind(this)}
                            handleCarDuty={this.handleCarDuty.bind(this)}
                            handleCarInterior={this.handleCarInterior.bind(
                              this
                            )}
                            handleCarColor={this.handleCarColor.bind(this)}
                            handleCarLocation={this.handleCarLocation.bind(
                              this
                            )}
                          />
                        </p>

                        <form id="car-details" onSubmit={this.submitHandler}>
                          <div
                            className="rounded mx-auto shadow-lg"
                            style={selectorStyle}
                          >
                            <div
                              className="form-row"
                              style={{ padding: "15px" }}
                            >
                              <div className="col-md-3">
                                <p className="text-dark">Price (Ksh)*</p>
                                <NumberFormat
                                  thousandSeparator={true}
                                  className="form-control text-dark"
                                  placeholder="Enter Price"
                                  name="price"
                                  onChange={this.priceChangeHandler}
                                  inputMode="numeric"
                                />
                                <p className="text-danger" style={errorText}>
                                  {this.state.errorPrice}
                                </p>
                              </div>

                              <div className="col-md-3">
                                <p className="text-dark">Mileage (Km)*</p>
                                <NumberFormat
                                  thousandSeparator={true}
                                  className="form-control text-dark"
                                  placeholder="Enter Mileage"
                                  name="mileage"
                                  onChange={this.mileageChangeHandler}
                                  inputMode="numeric"
                                />
                                <p className="text-danger" style={errorText}>
                                  {this.state.errorMileage}
                                </p>
                              </div>

                              <div className="col-md-3">
                                <p className="text-dark">Engine Size (CC)*</p>
                                <NumberFormat
                                  thousandSeparator={true}
                                  className="form-control text-dark"
                                  placeholder="Enter Engine Size"
                                  name="engineSize"
                                  onChange={this.engineSizeChangeHandler}
                                  inputMode="numeric"
                                />
                                <p className="text-danger" style={errorText}>
                                  {this.state.errorEngineSize}
                                </p>
                              </div>

                              <div
                                className="col-md-12"
                                style={{ marginTop: "10px" }}
                              >
                                <p className="text-dark">Enter Description *</p>
                                <textarea
                                  rows="4"
                                  minLength="50"
                                  className="form-control text-dark"
                                  type="text"
                                  placeholder="Enter Car Description"
                                  name="description"
                                  onChange={this.changeHandler}
                                />
                                <p className="text-danger" style={errorText}>
                                  {this.state.errorDescription}
                                </p>
                              </div>
                              <div
                                className="custom-control custom-checkbox"
                                style={{ marginTop: "20px" }}
                              >
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="priceIsNegotiable"
                                  onChange={this.toggleChangePriceNegotiable}
                                  defaultChecked={true}
                                />
                                <label
                                  className="custom-control-label text-dark"
                                  htmlFor="priceIsNegotiable"
                                >
                                  Price Is Negotiable
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>

                        <div
                          className="rounded mx-auto shadow-lg"
                          style={selectorStyle}
                        >
                          <div className="p-3">
                            <h5
                              className="h6 text-dark font-weight-bold"
                              style={{ marginBottom: "10px" }}
                            >
                              Common Features
                            </h5>
                            <div className="container">
                              <div className="row">
                                {commonFeatures.map((common) => (
                                  <li
                                    key={common.value}
                                    className="list-group-item flex-fill rounded-5"
                                  >
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        id={common.label}
                                        className="custom-control-input"
                                        type="checkbox"
                                        value={common.label}
                                        name={common.label}
                                        defaultChecked={false}
                                        onChange={this.toggleChangeCommonFeatures.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        className="text-dark cursor-pointer d-block custom-control-label"
                                        htmlFor={common.label}
                                      >
                                        {common.label}
                                      </label>
                                    </div>
                                  </li>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="rounded mx-auto shadow-lg"
                          style={selectorStyle}
                        >
                          <div className="p-3">
                            <h5
                              className="h6 text-dark font-weight-bold"
                              style={{ marginBottom: "10px" }}
                            >
                              Extra Features
                            </h5>
                            <div className="container">
                              <div className="row">
                                {extraFeatures.map((extra) => (
                                  <li
                                    key={extra.value}
                                    className="list-group-item flex-fill rounded-5"
                                  >
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        id={extra.label}
                                        className="custom-control-input"
                                        type="checkbox"
                                        value={extra.label}
                                        name={extra.label}
                                        defaultChecked={false}
                                        onChange={this.toggleChangeExtraFeatures.bind(
                                          this
                                        )}
                                      />
                                      <label
                                        className="text-dark cursor-pointer d-block custom-control-label"
                                        htmlFor={extra.label}
                                      >
                                        {extra.label}
                                      </label>
                                    </div>
                                  </li>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="rounded mx-auto shadow-lg"
                          style={selectorStyle}
                        >
                          <div className="p-3">
                            <h5
                              className="h6 text-dark font-weight-bold"
                              style={{ marginBottom: "10px" }}
                            >
                              Add photos
                            </h5>

                            <ImageUpload
                              handleCarPhotos={this.handleCarPhotos.bind(this)}
                            />
                          </div>

                          <p className="text-danger" style={errorText}>
                            {this.state.errorImages}
                          </p>
                        </div>

                        <div
                          className="rounded mx-auto shadow-lg p-3"
                          style={selectorStyle}
                        >
                          <h5 className="h6 text-dark font-weight-bold">
                            Contact Details
                          </h5>
                          <div className="form-row" style={{ padding: "15px" }}>
                            <div className="col-md-3">
                              <p className="text-dark">Name</p>
                              <input
                                rows="4"
                                minLength="50"
                                className="form-control text-dark"
                                type="text"
                                placeholder={this.state.sellerName}
                                name="sellerName"
                                readOnly
                              />
                            </div>

                            <div className="col-md-3">
                              <p className="text-dark">Phone Number</p>
                              <input
                                className="form-control text-dark"
                                placeholder={"0" + this.state.sellerNumber}
                                name="sellerNumber"
                                type="text"
                                readOnly
                              />
                            </div>
                          </div>
                        </div>

                        {this.state.loading ? <Spinner /> : null}
                        <Progress percentage={this.state.percentage} />

                        <button
                          id="submitButton"
                          form="car-details"
                          type="submit"
                          className="mx-auto btn btn-custom btn-block text-dark text-centre font-weight-bold"
                          style={{ padding: "10px", marginTop: "10px" }}
                        >
                          Post Car
                        </button>
                      </div>
                    </div>
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

function mapStateToProps(state) {
  return {
    message: state.postCar.message,
    isAuthenticated: state.auth.isAuthenticated,
    userObject: state.auth.userObject,
    carObject: state.postCar.carObject,
    phoneUpdateMessage: state.auth.message,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "sellCar" })
)(SellcarComponent);
