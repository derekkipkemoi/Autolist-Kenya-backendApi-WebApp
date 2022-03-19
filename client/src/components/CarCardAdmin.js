import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Carousel from "nuka-carousel";

import * as actions from "../actions";
import { priceFormat } from "./NumberFormat";
import { numberFormat } from "./NumberFormat";
import { verify } from "jsonwebtoken";
//import { numberFormat } from './NumberFormat';

class ImageCard extends Component {
  state = {
    carVerified: null,
    carDeclined: null,
    carDeleted: null,
    carName: null,

    car: this.props.car,
  };

  componentDidMount() {}

  EditCarDetails = (car) => {
    this.setState({
      carName: this.state.car.name,
    });
  };

  handleDeleteCar = async (carId) => {
    await this.props.deleteCar(carId);
    window.location.reload(true);
  };

  onSubmit = async (formData) => {
    await this.props.signIn(formData);
    if (!this.props.message) {
      this.props.history.push("/dashboard");
    }
  };

  handleVerifyCar = async (carId) => {
    await this.props.verifyCar(carId);
    window.location.reload(true);
  };

  handleDeclineCar = async (carId) => {
    await this.props.verifyCar(carId);
    window.location.reload(true);
  };

  render() {
    const car = this.props.car;
    const imageStyle = {
      width: "100%",
      height: "15rem",
      objectFit: "cover",
    };
    const buttonStyle = {
      margin: "2px",
    };

    return (
      <div className="row">
        <div className="card mt-3 w-100" style={{ margin: "5px" }}>
          <div className="row no-gutters">
            <div className="col-sm-5" style={{ background: "#868e96" }}>
              <Carousel>
                {car.images.map((image, i) => (
                  <img
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
                  to={`/vehicle/${car._id}`}
                  className="text-dark"
                  style={{ textDecoration: "none" }}
                >
                  <h5 className="card-title font-weight-bold">{car.name}</h5>
                  <h5 className="card-title">
                    {priceFormat(car.price)}{" "}
                    {car.priceNegotiable ? "(Negotiable)" : null}
                  </h5>
                  <p className="card-title">
                    <span className="font-weight-bold">Mileage :</span>
                    {numberFormat(car.mileage)} Km{" "}
                    <span className="font-weight-bold"> Condition</span> :
                    {car.condition}
                  </p>
                  <p className="card-title">
                    <span className="font-weight-bold">Transmission :</span>
                    {car.transmission} Km{" "}
                    <span className="font-weight-bold"> Color</span> :
                    {car.color}
                  </p>
                </Link>
                {!car.verified ? (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.handleVerifyCar.bind(this, car._id)}
                    style={buttonStyle}
                  >
                    Approve Car
                  </button>
                ) : null}
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  data-whatever="@getbootstrap"
                  onClick={this.EditCarDetails.bind(this, car)}
                  style={buttonStyle}
                >
                  Decline Car
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.handleDeleteCar.bind(this, car._id)}
                  style={buttonStyle}
                >
                  Delete Car
                </button>
              </div>
            </div>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal title
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
                    <p>Are sure you want to Approve {this.state.car.name}</p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      No
                    </button>
                    <button type="button" class="btn btn-primary">
                      Confirm
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

function mapStateToProps(state) {
  return {
    message: state.carActions.message,
  };
}

export default connect(mapStateToProps, actions)(ImageCard);
