import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import carsList from "../../reducers/carsList";
import Spinner from "../Spinner";
import FavouriteCarCard from "./FavouriteCarCard";
class UserFavouriteList extends Component {
  state = {
    carsList: this.props.userFavouriteList,
    loading: true,
  };

  componentDidMount = async () => {
    await this.props.getUserFavouriteList(
      JSON.parse(localStorage.getItem("UserObject")).id,
      1
    );

    this.setState({
      loading: false,
      carsList: this.props.userFavouriteList,
    });
  };

  handleCarRemovedFromFavouriteList = async (carId) => {
    this.setState({
      loading: true,
    });

    await this.props.addCarToFavouriteList(
      JSON.parse(localStorage.getItem("UserObject")).id,
      carId
    );
    this.setState({
      loading: false,
    });

    var carsArray = [...this.state.carsList].filter(function (obj) {
      return obj.id !== carId;
    });

    this.setState({
      carsList: carsArray,
    });
  };

  render() {
    let userCars = this.state.carsList;
    return (
      <div>
        <div className="container" style={{ marginTop: "70px" }}>
          {this.state.loading ? <Spinner /> : null}

          {this.state.carsList.length > 0 ? (
            <div>
              {userCars.map((car) => (
                <div key={car.id}>
                  <FavouriteCarCard
                    car={car}
                    onRemoveFromFavouriteList={this.handleCarRemovedFromFavouriteList.bind(
                      this
                    )}
                  />
                </div>
              ))}
            </div>
          ) : (
            <h6 className="text-center font-weight-bold">
              No cars in your favourite list
            </h6>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userFavouriteList: state.userCarsList.userFavouriteCarsList,
    isAuthenticated: state.auth.isAuthenticated,
    userObject: state.auth.userObject,
  };
}

export default connect(mapStateToProps, actions)(UserFavouriteList);
