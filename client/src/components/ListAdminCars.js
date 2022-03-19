import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import { priceFormat } from "./NumberFormat";
import { numberFormat } from "./NumberFormat";
import Carousel from "nuka-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "./Spinner";

class ListAdminCars extends Component {
  state = {
    userRetrived: null,
    carId: null,
    carName: null,
    data: [],

    message: null,

    editCarPrice: null,
    editCarMileage: null,
    editCarDescription: null,
    editCarPriceNegotiable: true,
    percentage: 0,
    loading: true,
  };

  EditCarDetails = (car) => {
    this.setState({
      carId: car.id,
      carName: car.name,
      message: null,
    });
  };

  handleApproveCar = async (carId) => {
    await this.props.approveCar(carId, (progressEvent) => {
      const percentage = parseInt(
        Math.round((progressEvent.loaded * 100) / progressEvent.total)
      );
      this.setState({ percentage: percentage });
      return percentage; // Because you were returning the percentage before.
    });

    this.setState({
      message: this.props.message,
    });

    //window.location.reload(true);
    await this.props.getAdminCarsList();
    this.setState({
      data: this.props.carsList,
    });
  };

  handleDecline = async (carId) => {
    await this.props.declineCar(carId, (progressEvent) => {
      const percentage = parseInt(
        Math.round((progressEvent.loaded * 100) / progressEvent.total)
      );
      this.setState({ percentage: percentage });
      return percentage; // Because you were returning the percentage before.
    });

    this.setState({
      message: this.props.message,
    });
    //window.location.reload(true);
    await this.props.getAdminCarsList();
    this.setState({
      data: this.props.carsList,
    });
  };

  handleDelete = async (carId) => {
    await this.props.deleteCar(carId, (progressEvent) => {
      const percentage = parseInt(
        Math.round((progressEvent.loaded * 100) / progressEvent.total)
      );
      this.setState({ percentage: percentage });
      return percentage; // Because you were returning the percentage before.
    });

    this.setState({
      message: this.props.message,
    });
    //window.location.reload(true);
    await this.props.getAdminCarsList();
    this.setState({
      data: this.props.carsList,
    });
  };

  componentDidMount = async () => {
    await this.props.getAdminCarsList();
    this.setState({
      data: this.props.carsList,
      loading: false,
    });
  };

  handleActiveStatus = (carList) => {
    if (carList.length > 0) {
      carList = carList.filter((myCar) => myCar.status === "active");
      this.setState({
        data: carList,
      });
    }
  };

  handleUnderReviewStatus = (carList) => {
    if (carList.length > 0) {
      carList = carList.filter((myCar) => myCar.status === "underreview");
      this.setState({
        data: carList,
      });
    }
  };

  handleDeclinedStatus = (carList) => {
    if (carList.length > 0) {
      carList = carList.filter((myCar) => myCar.status === "declined");
      this.setState({
        data: carList,
      });
    }
  };

  handleAllStatus = (carList) => {
    if (carList.length > 0) {
      this.setState({
        data: carList,
      });
    }
  };

  render() {
    let activeList = this.props.carsList;
    let rejectedList = this.props.carsList;
    let reviewingList = this.props.carsList;

    if (activeList.length > 0) {
      activeList = activeList.filter((myCar) => myCar.status === "active");
    }

    if (rejectedList.length > 0) {
      rejectedList = rejectedList.filter(
        (myCar) => myCar.status === "declined"
      );
    }

    if (reviewingList.length > 0) {
      reviewingList = reviewingList.filter(
        (myCar) => myCar.status === "underreview"
      );
    }

    const imageStyle = {
      width: "100%",
      height: "15rem",
      objectFit: "cover",
    };
    const buttonStyle = {
      margin: "2px",
    };
    const iconsStyle = {
      color: "#25D366",
      marginRight: "10px",
    };
    const svgImageStyle = {
      width: "25px",
      marginRight: "5px",
      color: "#fff",
    };

    return (
      <div className="container" style={{ marginTop: "70px" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="text-center rounded shadow-lg">
              <h6 className="text-center font-weight-bold">Manage Cars</h6>
              <button
                type="button"
                className="btn btn-success"
                style={{ margin: "5px" }}
                onClick={this.handleActiveStatus.bind(
                  this,
                  this.props.carsList
                )}
              >
                Active({activeList.length})
              </button>
              <button
                type="button"
                className="text-light btn btn-warning"
                style={{ margin: "5px" }}
                onClick={this.handleUnderReviewStatus.bind(
                  this,
                  this.props.carsList
                )}
              >
                Reviewing({reviewingList.length})
              </button>
              <button
                type="button"
                className="btn btn-danger"
                style={{ margin: "5px" }}
                onClick={this.handleDeclinedStatus.bind(
                  this,
                  this.props.carsList
                )}
              >
                Rejected({rejectedList.length})
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                style={{ margin: "5px" }}
                onClick={this.handleAllStatus.bind(this, this.props.carsList)}
              >
                All({this.props.carsList.length})
              </button>
            </div>
            {this.state.loading ? <Spinner /> : null}
            {this.state.data.map((car) => (
              <div key={car.id}>
                <div className="row">
                  <div
                    className="card mt-3  ml-3 mr-3 w-100"
                    style={{ marginTop: "5px" }}
                  >
                    <div className="row no-gutters">
                      <div
                        className="col-sm-5"
                        style={{ background: "#868e96" }}
                      >
                        <Carousel>
                          {car.images.map((image, i) => (
                            <img
                              key={image}
                              className="card-img"
                              src={image}
                              alt="Card"
                              style={imageStyle}
                            />
                          ))}
                        </Carousel>
                      </div>
                      <div className="col-sm-7 col-md-7">
                        <div className="card-body">
                          <Link
                            to={`/vehicle/${car.id}`}
                            className="text-dark"
                            style={{ textDecoration: "none" }}
                          >
                            <span className="card-title font-weight-bold">
                              {car.name}
                            </span>
                            <span className="card-title font-weight-bold text-right">
                              {" "}
                              {car.status === "active" ? (
                                <div>
                                  <span className="text-success">Active</span>{" "}
                                </div>
                              ) : null}
                              {car.status === "declined" ? (
                                <div>
                                  <span className="text-danger">Rejected</span>{" "}
                                </div>
                              ) : null}
                              {car.status === "underreview" ? (
                                <div>
                                  <span className="text-warning">
                                    Under Review
                                  </span>{" "}
                                </div>
                              ) : null}
                              {car.status === "sold" ? (
                                <div>
                                  <span className="text-info">Sold</span>{" "}
                                </div>
                              ) : null}
                            </span>
                            <h5
                              className="card-title font-weight-bold"
                              style={{ color: "#25D366" }}
                            >
                              {priceFormat(car.price)}{" "}
                              <span
                                className="font-weight-bold"
                                style={{
                                  fontSize: "14px",
                                  color: "#ffa010",
                                }}
                              >
                                {car.priceNegotiable ? "Negotiable" : null}
                              </span>
                            </h5>
                            <h5
                              className="card-title font-weight-bold"
                              style={{ fontSize: "15px" }}
                            >
                              <FontAwesomeIcon
                                icon="map-marker-alt"
                                style={iconsStyle}
                              />
                              {car.location}
                            </h5>
                            <p
                              className="card-title"
                              style={{ fontSize: "15px" }}
                            >
                              <span>
                                {" "}
                                <img
                                  style={svgImageStyle}
                                  alt="Clock"
                                  src={require("../assets/svgs/gauge.svg")}
                                />
                                {numberFormat(car.mileage)} Km |
                              </span>
                              <span>
                                {" "}
                                <img
                                  style={svgImageStyle}
                                  src={require("../assets/svgs/new-product.svg")}
                                  alt="..."
                                />
                                {car.condition}|
                              </span>
                              <span>
                                {" "}
                                <img
                                  style={svgImageStyle}
                                  src={require("../assets/svgs/color.svg")}
                                  alt="..."
                                />
                                {car.color}|
                              </span>
                              <span>
                                {" "}
                                <img
                                  style={svgImageStyle}
                                  alt="Clock"
                                  src={require("../assets/svgs/gear_box.svg")}
                                />
                                {car.transmission}
                              </span>
                            </p>
                          </Link>

                          {car.status === "active" ? (
                            <button
                              type="button"
                              className="btn btn-warning text-light"
                              data-toggle="modal"
                              data-target="#declineCar"
                              onClick={this.EditCarDetails.bind(this, car)}
                              style={buttonStyle}
                            >
                              Decline Car
                            </button>
                          ) : null}

                          {car.status === "underreview" ? (
                            <span>
                              <button
                                type="button"
                                className="btn btn-warning text-light"
                                data-toggle="modal"
                                data-target="#declineCar"
                                onClick={this.EditCarDetails.bind(this, car)}
                                style={buttonStyle}
                              >
                                Decline Car
                              </button>

                              <button
                                type="button"
                                className="btn btn-success"
                                data-toggle="modal"
                                data-target="#approveCar"
                                onClick={this.EditCarDetails.bind(this, car)}
                                style={buttonStyle}
                              >
                                Approve Car
                              </button>
                            </span>
                          ) : null}

                          <button
                            type="button"
                            className="btn btn-danger"
                            data-toggle="modal"
                            data-target="#deleteCar"
                            onClick={this.EditCarDetails.bind(this, car)}
                            style={buttonStyle}
                          >
                            Delete Car
                          </button>
                        </div>

                        <div
                          className="modal fade"
                          id="approveCar"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  {this.state.percentage}
                                  {this.state.carName}
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="form-group">
                                    <label
                                      htmlFor="recipient-name"
                                      className="col-form-label"
                                    >
                                      Are Your Sure you want to Approve
                                      <p className="font-weight-bold text-success">
                                        {this.state.carName}
                                      </p>
                                    </label>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <p className="text-success">
                                  {this.state.message}
                                </p>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={this.handleApproveCar.bind(
                                    this,
                                    this.state.carId
                                  )}
                                >
                                  Approve Car
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="modal fade"
                          id="declineCar"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  {this.state.carName}
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="form-group">
                                    <label
                                      htmlFor="recipient-name"
                                      className="col-form-label"
                                    >
                                      Are Your Sure you want to Decline
                                      <p className="font-weight-bold text-warning">
                                        {this.state.carName}
                                      </p>
                                    </label>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <p className="text-success">
                                  {this.state.message}
                                </p>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-warning text-light"
                                  onClick={this.handleDecline.bind(
                                    this,
                                    this.state.carId
                                  )}
                                >
                                  Decline Car
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="modal fade"
                          id="deleteCar"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  {this.state.carName}
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="form-group">
                                    <label
                                      htmlFor="recipient-name"
                                      className="col-form-label"
                                    >
                                      Are Your Sure you want to Delete
                                    </label>

                                    <p className="font-weight-bold text-danger">
                                      {this.state.carName}
                                    </p>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <p className="text-success">
                                  {this.state.message}
                                </p>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={this.handleDelete.bind(
                                    this,
                                    this.state.carId
                                  )}
                                >
                                  Delete Car
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
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    resource: state.dashboard.secret,
    carsList: state.carsList.carsList,
    message: state.carActions.message,
  };
}
export default connect(mapStateToProps, actions)(ListAdminCars);
