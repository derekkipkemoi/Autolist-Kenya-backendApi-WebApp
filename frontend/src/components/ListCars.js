import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import CarCard from "./CarCard";
import FilterComponentList from "./Filter/FilterComponentHome";
import Spinner from "./Spinner";
import SearchBar from "./Filter/Searchbar";

class ListCars extends Component {
  state = {
    cars: this.props.carsList,
    currentPage: 1,
    carsPerPage: 10,
    loading: true,
  };


  componentDidMount = async () => {
    await this.props.getCarsList();
    this.setState({
      cars: this.props.carsList,
      loading: false,
    });
  };

  render() {
    //const searchKeyWord = this.props.match.params.searchKeyWord
    const vehicles = this.props.match.params.vehicles;
    const vehicleModel = this.props.match.params.models;
    const vehicleLocation = this.props.match.params.location;
    const vehicleYearMin = this.props.match.params.yearMin;
    const vehicleYearMax = this.props.match.params.yearMax;
    const vehiclePriceMin = this.props.match.params.priceMin;
    const vehiclePriceMax = this.props.match.params.priceMax;

    

    let filteredCars = this.state.cars

    // if(searchKeyWord != null){
    //   console.log("Keyword", searchKeyWord)
    //   console.log("Before", filteredCars)
    //   filteredCars = filteredCars.filter((myCar) => myCar.name.toLowerCase().includes(searchKeyWord.toLowerCase()));
    //   console.log("After", filteredCars)
    // }

      if (                                                                                                                                                                                               
        window.$.inArray(vehicles, [
          "All Cars",
          "Saloons",
          "Hatchbacks",
          "Station Wagons",
          "SUV",
          "Vans&Buses",
          "Trucks&Trailers",
          "Motorbikes",
        ]) >= 0
      ) {
        if (vehicles === "All Cars") {
          if (
            parseInt(vehicleYearMin) >= 1950 &&
            parseInt(vehicleYearMax) <= 2020
          ) {
            filteredCars = filteredCars.filter(
              (myCar) =>
                myCar.year >= vehicleYearMin && myCar.year <= vehicleYearMax
            );
          }
  
          if (
            parseInt(vehiclePriceMin) >= 100000 &&
            parseInt(vehiclePriceMax) <= 30000000
          ) {
            filteredCars = filteredCars.filter(
              (myCar) =>
                myCar.price >= vehiclePriceMin && myCar.price <= vehiclePriceMax
            );
          }
  
          if (vehicleLocation !== "All Locations" && vehicleLocation != null) {
            filteredCars = filteredCars.filter((myCar) =>
              myCar.location.includes(vehicleLocation)
            );
          }
        } else {
          filteredCars = filteredCars.filter((myCar) =>
            myCar.body.includes(vehicles)
          );
        }
      }
  
      if (
        window.$.inArray(vehicles, [
          "Brand New",
          "Foreign Used",
          "Locally Used",
        ]) >= 0
      ) {
        filteredCars = filteredCars.filter((myCar) =>
          myCar.condition.includes(vehicles)
        );
      }
  
      if (
        window.$.inArray(vehicles, [
          "Brand New",
          "Foreign Used",
          "Locally Used",
          "All Cars",
          "Saloons",
          "Hatchbacks",
          "Station Wagons",
          "SUV",
          "Vans&Buses",
          "Trucks&Trailers",
          "Motorbikes",
        ]) < 0
      ) {
        filteredCars = filteredCars.filter((myCar) =>
          myCar.make.includes(vehicles)
        );
  
        if (
          parseInt(vehicleYearMin) >= 1950 &&
          parseInt(vehicleYearMax) <= 2020
        ) {
          filteredCars = filteredCars.filter(
            (myCar) =>
              myCar.year >= vehicleYearMin && myCar.year <= vehicleYearMax
          );
        }
        if (
          parseInt(vehiclePriceMin) >= 100000 &&
          parseInt(vehiclePriceMax) <= 30000000
        ) {
          filteredCars = filteredCars.filter(
            (myCar) =>
              myCar.price >= vehiclePriceMin && myCar.price <= vehiclePriceMax
          );
        }
  
        if (vehicleLocation !== "All Locations" && vehicleLocation != null) {
          filteredCars = filteredCars.filter((myCar) =>
            myCar.location.includes(vehicleLocation)
          );
        }
        if (vehicleModel !== "All Models" && vehicleModel != null) {
          filteredCars = filteredCars.filter((myCar) =>
            myCar.model.includes(vehicleModel)
          );
          if (vehicleLocation !== "All Locations" && vehicleLocation != null) {
            filteredCars = filteredCars.filter((myCar) =>
              myCar.location.includes(vehicleLocation)
            );
          }
  
          if (
            parseInt(vehicleYearMin) >= 1950 &&
            parseInt(vehicleYearMax) <= 2020
          ) {
            filteredCars = filteredCars.filter(
              (myCar) =>
                myCar.year >= vehicleYearMin && myCar.year <= vehicleYearMax
            );
          }
        }
      }

      


    
    return (
      <div>
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
              {window.$.inArray(vehicles, [
                "All Cars",
                "Saloons",
                "Hatchbacks",
                "Station Wagons",
                "SUV",
                "Vans&Buses",
                "Trucks&Trailers",
                "Motorbikes",
                "Brand New",
                "Foreign Used",
                "Locally Used",
              ]) >= 0 ? (
                <li className="breadcrumb-item ">
                  <Link to={`/listcars/All Cars`} className="text-light">
                    All Cars
                  </Link>
                </li>
              ) : null}
              {window.$.inArray(vehicles, [
                "All Cars",
                "Saloons",
                "Hatchbacks",
                "Station Wagons",
                "SUV",
                "Vans&Buses",
                "Trucks&Trailers",
                "Motorbikes",
                "Brand New",
                "Foreign Used",
                "Locally Used",
              ]) < 0 ? (
                <li className="breadcrumb-item ">
                  <Link to={`/listcars/All Cars`} className="text-light">
                    All Cars
                  </Link>
                </li>
              ) : null}
              {window.$.inArray(vehicles, [
                "All Cars",
                "Saloons",
                "Hatchbacks",
                "Station Wagons",
                "SUV",
                "Vans&Buses",
                "Trucks&Trailers",
                "Motorbikes",
                "Brand New",
                "Foreign Used",
                "Locally Used",
              ]) < 0 ? (
                <li className="breadcrumb-item ">
                  <Link to={`/listcars/${vehicles}`} className="text-light">
                    {vehicles}
                  </Link>
                </li>
              ) : null}
              {vehicleModel !== "All Models" ? (
                <li className="breadcrumb-item ">
                  <Link
                    to={`/listcars/${vehicles}/${vehicleModel}`}
                    className="text-light"
                  >
                    {vehicleModel}
                  </Link>
                </li>
              ) : null}
            </ol>
          </nav>

          <div className="row">
            
            <div className="col-md-12">
           
              {
                <div>
                  {this.state.loading ? <Spinner /> : null}
              <SearchBar />
                  <FilterComponentList />
                  {filteredCars.map((car) => (
                    <div key={car.id}>
                      <CarCard car={car} />
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    carsList: state.carsList.carsList,
  };
}
export default connect(mapStateToProps, actions)(ListCars);
