import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { Link } from "react-router-dom";

import cars from "../../data/cars.json";
import carModels from "../../data/models.json";

const carsMakeOption = cars.cars;
const yearsOption = cars.years;
const carsLocationOption = cars.location;
const priceOptions = cars.price;
let carsModelOption = 0;

class FilterComponent extends Component {
  state = {
    searchKeyWord:null,
    selectedCarMake: null,

    selectedCarsMakeOption: null,
    selectedCarsMakeOptionValue: "All Cars",

    selectedCarsModelOption: null,
    selectedCarsModelOptionValue: "All Models",

    selectedCarsYearMinOption: null,
    selectedCarsYearMinOptionValue: "1950",

    selectedCarsYearMaxOption: null,
    selectedCarsYearMaxOptionValue: new Date().getFullYear().toString(),

    selectedCarsLocationOption: null,
    selectedCarsLocationOptionValue: "All Locations",

    selectedCarsPriceMinOption: null,
    selectedCarsPriceMinOptionValue: 100000,

    selectedCarsPriceMaxOption: null,
    selectedCarsPriceMaxOptionValue: 30000000,
  };

  handleCarMakeChange = (selectedCarsMakeOption) => {
    this.setState({
      selectedCarsMakeOption,
      selectedCarsMakeOptionValue: selectedCarsMakeOption.label,
      selectedCarMake: selectedCarsMakeOption.value,
    });

    switch (selectedCarsMakeOption.value) {
      case 1:
        carsModelOption = carModels.toyotaModels;
        break;
      case 2:
        carsModelOption = carModels.nissanModels;
        break;
      case 3:
        carsModelOption = carModels.subaruModels;
        break;
      case 4:
        carsModelOption = carModels.hondaModels;
        break;
      case 5:
        carsModelOption = carModels.mitsubishiModels;
        break;
      case 6:
        carsModelOption = carModels.mercedesModels;
        break;
      case 7:
        carsModelOption = carModels.mazWModels;
        break;
      case 8:
        carsModelOption = carModels.volkwagenModels;
        break;
      case 9:
        carsModelOption = carModels.bmwModels;
        break;
      case 10:
        carsModelOption = carModels.landRoverModels;
        break;
      case 11:
        carsModelOption = carModels.isuzuModels;
        break;
      case 12:
        carsModelOption = carModels.audiModels;
        break;
      case 13:
        carsModelOption = carModels.suzukiModels;
        break;
      case 14:
        carsModelOption = carModels.lexusModels;
        break;
      case 15:
        carsModelOption = carModels.fordModels;
        break;
      case 16:
        carsModelOption = carModels.alfaRomeoModels;
        break;
      case 17:
        carsModelOption = carModels.audiModels;
        break;
      case 18:
        carsModelOption = carModels.bajajModels;
        break;
      case 19:
        carsModelOption = carModels.bmwModels;
        break;
      case 20:
        carsModelOption = carModels.cadillacModels;
        break;
      case 21:
        carsModelOption = carModels.caterPillarModels;
        break;
      case 22:
        carsModelOption = carModels.cherryModels;
        break;
      case 23:
        carsModelOption = carModels.dafModels;
        break;
      case 24:
        carsModelOption = carModels.daihatsuModels;
        break;
      case 25:
        carsModelOption = carModels.fawModels;
        break;
      case 26:
        carsModelOption = carModels.fordModels;
        break;
      case 27:
        carsModelOption = carModels.fotonModels;
        break;
      case 28:
        carsModelOption = carModels.hinoModels;
        break;
      case 29:
        carsModelOption = carModels.hondaModels;
        break;
      case 30:
        carsModelOption = carModels.hyundaiModels;
        break;
      case 31:
        carsModelOption = carModels.infinittiModels;
        break;
      case 32:
        carsModelOption = carModels.isuzuModels;
        break;
      case 33:
        carsModelOption = carModels.jaguarModels;
        break;
      case 34:
        carsModelOption = carModels.jeepModels;
        break;
      case 35:
        carsModelOption = carModels.kiaModels;
        break;
      case 36:
        carsModelOption = carModels.lamborghiniModels;
        break;
      case 37:
        carsModelOption = carModels.landRoverModels;
        break;
      case 38:
        carsModelOption = carModels.lexusModels;
        break;
      case 39:
        carsModelOption = carModels.leylandModel;
        break;
      case 40:
        carsModelOption = carModels.mahindraModels;
        break;
      case 41:
        carsModelOption = carModels.manModels;
        break;
      case 42:
        carsModelOption = carModels.masseyFergusonModels;
        break;
      case 43:
        carsModelOption = carModels.mazWModels;
        break;
      case 44:
        carsModelOption = carModels.mercedesModels;
        break;
      case 45:
        carsModelOption = carModels.nissanModels;
        break;
      case 46:
        carsModelOption = carModels.opelModels;
        break;
      case 47:
        carsModelOption = carModels.peroduaModels;
        break;
      case 48:
        carsModelOption = carModels.peugeotModels;
        break;
      case 49:
        carsModelOption = carModels.porscheModels;
        break;
      case 50:
        carsModelOption = carModels.renaultModels;
        break;
      case 51:
        carsModelOption = carModels.roverModels;
        break;
      case 52:
        carsModelOption = carModels.royalModels;
        break;
      case 53:
        carsModelOption = carModels.scaniaModels;
        break;
      case 54:
        carsModelOption = carModels.shinerayModels;
        break;
      case 55:
        carsModelOption = carModels.sonalikaModels;
        break;
      case 56:
        carsModelOption = carModels.subaruModels;
        break;
      case 57:
        carsModelOption = carModels.suzukiModels;
        break;
      case 58:
        carsModelOption = carModels.tataModels;
        break;
      case 59:
        carsModelOption = carModels.toyotaModels;
        break;
      case 60:
        carsModelOption = carModels.trailerModels;
        break;
      case 61:
        carsModelOption = carModels.tvsModels;
        break;
      case 62:
        carsModelOption = carModels.vauxhaulModels;
        break;
      case 63:
        carsModelOption = carModels.vector;
        break;
      case 64:
        carsModelOption = carModels.volkwagenModels;
        break;
      case 65:
        carsModelOption = carModels.volvoModels;
        break;
      case 66:
        carsModelOption = carModels.yamahaModels;
        break;
      case 67:
        carsModelOption = carModels.ZongshenModels;
        break;
      case 68:
        carsModelOption = carModels.zontesModels;
        break;

      default:
        carsModelOption = carModels.toyotaModels;
    }
  };

  handleCarModelChange = (selectedCarsModelOption) => {
    this.setState({
      selectedCarsModelOption,
      selectedCarsModelOptionValue: selectedCarsModelOption.label,
    });
  };

  handleCarsYearMinChange = (selectedCarsYearMinOption) => {
    this.setState({
      selectedCarsYearMinOption,
      selectedCarsYearMinOptionValue: selectedCarsYearMinOption.label,
    });
  };

  handleCarsYearMaxChange = (selectedCarsYearMaxOption) => {
    this.setState({
      selectedCarsYearMaxOption,
      selectedCarsYearMaxOptionValue: selectedCarsYearMaxOption.label,
    });
  };

  handleCarLocationChange = (selectedCarsLocationOption) => {
    this.setState({
      selectedCarsLocationOption,
      selectedCarsLocationOptionValue: selectedCarsLocationOption.label,
    });
  };

  handleCarsPriceMinChange = (selectedCarsPriceMinOption) => {
    this.setState({
      selectedCarsPriceMinOption,
      selectedCarsPriceMinOptionValue: selectedCarsPriceMinOption.value,
    });
  };

  handleCarsPriceMaxChange = (selectedCarsPriceMaxOption) => {
    this.setState({
      selectedCarsPriceMaxOption,
      selectedCarsPriceMaxOptionValue: selectedCarsPriceMaxOption.value,
    });
  };

  render() {
    const iconsStyle = {
      color: "#00544C",
      colorHover: "#25D366",
      Right: "5px",
    };
    const selectorStyle = {
      backgroundColor: "#ffffff",
      color: "#fff",
      paddingRight: "10px",
      paddingLeft: "10px",
      paddingBottom: "10px",
    };

    return (
      <div className="rounded shadow-lg w-100" style={selectorStyle}>
        <div className="row">
          <div
            className="col-6 col-sm-6 col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <Select
              value={this.state.selectedCarsMakeOption}
              onChange={this.handleCarMakeChange}
              options={carsMakeOption}
              placeholder={"Make"}
            />
          </div>

          <div
            className="col-6 col-sm-6 col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <Select
              value={this.state.selectedCarsModelOption}
              onChange={this.handleCarModelChange}
              options={carsModelOption}
              placeholder={"Model"}
            />
          </div>

          <div
            className="col-6 col-sm-6 col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <Select
              value={this.state.selectedCarsYearMinOption}
              onChange={this.handleCarsYearMinChange}
              options={yearsOption}
              placeholder={"Year: From"}
            />
          </div>

          <div
            className="col-6 col-sm-6 col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <Select
              value={this.state.selectedCarsYearMaxOption}
              onChange={this.handleCarsYearMaxChange}
              options={yearsOption}
              placeholder={"Year: To"}
            />
          </div>
        </div>

        <div className="row">
          <div
            className="col-6 col-sm-6 col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <Select
              value={this.state.selectedCarsLocationOption}
              onChange={this.handleCarLocationChange}
              options={carsLocationOption}
              placeholder={"Location"}
            />
          </div>

          <div
            className="col-6 col-sm-6 col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <Select
              value={this.state.selectedCarsPriceMinOption}
              onChange={this.handleCarsPriceMinChange}
              options={priceOptions}
              placeholder={"Price: Min"}
            />
          </div>

          <div
            className="col-6 col-sm-6 col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <Select
              value={this.state.selectedCarsPriceMaxOption}
              onChange={this.handleCarsPriceMaxChange}
              options={priceOptions}
              placeholder={"Price: Max"}
            />
          </div>

          <div
            className="col-6 col-sm-6 col-md-3 text-center"
            style={{ marginTop: "10px" }}
          >
            <Link
              to={`/listcars/${this.state.selectedCarsMakeOptionValue}/${this.state.selectedCarsModelOptionValue}/${this.state.selectedCarsLocationOptionValue}/${this.state.selectedCarsYearMinOptionValue}/${this.state.selectedCarsYearMaxOptionValue}/${this.state.selectedCarsPriceMinOptionValue}/${this.state.selectedCarsPriceMaxOptionValue}`}
              className="btn btn-custom btn-block text-centre font-weight-bold"
              role="button"
            >
              <FontAwesomeIcon icon="filter" style={iconsStyle} />
               Filter
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterComponent;
