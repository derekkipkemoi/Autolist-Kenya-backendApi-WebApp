import React, { Component } from "react";
import Select from "react-select";

import carsMakes from "../../data/cars.json";
import carModels from "../../data/models.json";

const carsMakeOption = carsMakes.cars;
const carYearOption = carsMakes.years;
const carBodyOption = carsMakes.body;
const carConditionOption = carsMakes.condition;
const carTransmissionOption = carsMakes.transmission;
const carDutyOption = carsMakes.duty;
const carFuelOption = carsMakes.fuel;
const carInteriorOption = carsMakes.interior;
const carColorOption = carsMakes.color;
const carLocationOption = carsMakes.location;
let carsModelOption = 0;

class FilterSellCarComponenet extends Component {
  state = {
    selectedCarMake: null,

    selectedCarsMakeOption: null,
    selectedCarsMakeOptionValue: null,
    selectedCarMakeError: true,

    selectedCarsModelOption: null,
    selectedCarsModelOptionValue: null,
    selectedCarModelError: true,

    selectedCarsYearOption: null,
    selectedCarsYearOptionValue: null,
    selectedCarsYearError: true,

    selectedCarsBodyOption: null,
    selectedCarsBodyOptionValue: null,
    selectedCarsBodyError: true,

    selectedCarsConditionOption: null,
    selectedCarsConditionOptionValue: null,
    selectedCarConditionError: true,

    selectedCarsTransmissionOption: null,
    selectedCarsTransmissionOptionValue: null,
    selectedCarsTransmissionError: true,

    selectedCarsDutyOption: null,
    selectedCarDutyValue: null,
    selectedCarDutyError: true,

    selectedCarsFuelOption: null,
    selectedCarsFuelOptionValue: null,
    selectedCarsFuelError: true,

    selectedCarsInteriorOption: null,
    selectedCarsInteriorOptionValue: null,
    selectedCarsInteriorError: true,

    selectedCarsColorOption: null,
    selectedCarsColorOptionValue: null,
    selectedCarsColorError: true,

    selectedCarsLocationOption: null,
    selectedCarsLocationOptionValue: null,
    selectedCarsLocationError: true,
  };

  handleCarMakeChange = (selectedCarsMakeOption) => {
    this.setState({
      selectedCarsMakeOption,
      selectedCarsMakeOptionValue: selectedCarsMakeOption.label,
      selectedCarMake: selectedCarsMakeOption.value,
      selectedCarMakeError: false,
    });

    this.props.handleCarMake(selectedCarsMakeOption.label, false);

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
      selectedCarModelError: false,
    });
    this.props.handleCarModel(selectedCarsModelOption.label, false);
  };

  handleCarsYearChange = (selectedCarsYearOption) => {
    this.setState({
      selectedCarsYearOption,
      selectedCarsYearOptionValue: selectedCarsYearOption.label,
      selectedCarsYearError: false,
    });
    this.props.handleCarYear(selectedCarsYearOption.label, false);
  };

  handleCarsBodyChange = (selectedCarsBodyOption) => {
    this.setState({
      selectedCarsBodyOption,
      selectedCarsBodyOptionValue: selectedCarsBodyOption.label,
      selectedCarsBodyError: false,
    });
    this.props.handleCarBody(selectedCarsBodyOption.label, false);
  };

  handleCarsConditionChange = (selectedCarsConditionOption) => {
    this.setState({
      selectedCarsConditionOption,
      selectedCarsConditionOptionValue: selectedCarsConditionOption.label,
      selectedCarConditionError: false,
    });
    this.props.handleCarCondition(selectedCarsConditionOption.label, false);
  };

  handleCarsTransmissionChange = (selectedCarsTransmissionOption) => {
    this.setState({
      selectedCarsTransmissionOption,
      selectedCarsTransmissionOptionValue: selectedCarsTransmissionOption.label,
      selectedCarsTransmissionError: false,
    });
    this.props.handleCarTransmission(
      selectedCarsTransmissionOption.label,
      false
    );
  };

  handleCarsDutyChange = (selectedCarsDutyOption) => {
    this.setState({
      selectedCarsDutyOption,
      selectedCarsDutyOptionValue: selectedCarsDutyOption.label,
      selectedCarDutyError: false,
    });
    this.props.handleCarDuty(selectedCarsDutyOption.label, false);
  };

  handleCarsFuelChange = (selectedCarsFuelOption) => {
    this.setState({
      selectedCarsFuelOption,
      selectedCarsFuelOptionValue: selectedCarsFuelOption.label,
      selectedCarsFuelError: false,
    });
    this.props.handleCarFuel(selectedCarsFuelOption.label, false);
  };

  handleCarsInteriorChange = (selectedCarsInteriorOption) => {
    this.setState({
      selectedCarsInteriorOption,
      selectedCarsInteriorOptionValue: selectedCarsInteriorOption.label,
      selectedCarsInteriorError: false,
    });
    this.props.handleCarInterior(selectedCarsInteriorOption.label, false);
  };

  handleCarsColorChange = (selectedCarsColorOption) => {
    this.setState({
      selectedCarsColorOption,
      selectedCarsColorOptionValue: selectedCarsColorOption.label,
      selectedCarsColorError: false,
    });
    this.props.handleCarColor(selectedCarsColorOption.label, false);
  };

  handleCarsLocationChange = (selectedCarsLocationOption) => {
    this.setState({
      selectedCarsLocationOption,
      selectedCarsLocationOptionValue: selectedCarsLocationOption.label,
      selectedCarsLocationError: false,
    });
    this.props.handleCarLocation(selectedCarsLocationOption.label, false);
  };

  render() {
    const selectorStyle = {
      backgroundColor: "#fafafa",
      color: "#fff",
    };

    const errorText = {
      fontSize: "12px",
      margin: "0px",
      Padding: "0px",
    };

    return (
      <div>
        <div className="row rounded mx-auto shadow-lg" style={selectorStyle}>
          <div
            className="col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <div className="form-group">
              <p className="text-dark">Make *</p>
              <Select
                value={this.state.selectedCarsMakeOption}
                onChange={this.handleCarMakeChange}
                options={carsMakeOption}
                placeholder={"Select Make"}
              />
              {this.state.selectedCarMakeError ? (
                <p className="text-danger" style={errorText}>
                  Make Required
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <div className="form-group">
              <p className="text-dark">Model *</p>
              <Select
                value={
                  this.state.selectedCarsMakeOption !== null
                    ? this.state.selectedCarsModelOption
                    : null
                }
                onChange={this.handleCarModelChange}
                options={carsModelOption}
                placeholder={"Select Model"}
              />
              {this.state.selectedCarModelError ? (
                <p className="text-danger" style={errorText}>
                  Model Required
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <div className="form-group">
              <p className="text-dark">Year *</p>
              <Select
                value={this.state.selectedCarsYearOption}
                onChange={this.handleCarsYearChange}
                options={carYearOption}
                placeholder={"Select Year"}
              />
              {this.state.selectedCarsYearError ? (
                <p className="text-danger" style={errorText}>
                  Year Required
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <div className="form-group">
              <p className="text-dark">Body *</p>
              <Select
                value={this.state.selectedCarsBodyOption}
                onChange={this.handleCarsBodyChange}
                options={carBodyOption}
                placeholder={"Select Body"}
              />
              {this.state.selectedCarsBodyError ? (
                <p className="text-danger" style={errorText}>
                  Body Required
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <div className="form-group">
              <p className="text-dark">Condition *</p>
              <Select
                value={this.state.selectedCarsConditionOption}
                onChange={this.handleCarsConditionChange}
                options={carConditionOption}
                placeholder={"Select Condition"}
              />
              {this.state.selectedCarConditionError ? (
                <p className="text-danger" style={errorText}>
                  Condition Required
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <div className="form-group">
              <p className="text-dark">Transmission *</p>
              <Select
                value={this.state.selectedCarsTransmissionOption}
                onChange={this.handleCarsTransmissionChange}
                options={carTransmissionOption}
                placeholder={"Transmission"}
              />
              {this.state.selectedCarsTransmissionError ? (
                <p className="text-danger" style={errorText}>
                  Transmission Required
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <div className="form-group">
              <p className="text-dark">Duty *</p>
              <Select
                value={this.state.selectedCarsDutyOption}
                onChange={this.handleCarsDutyChange}
                options={carDutyOption}
                placeholder={"Select Duty"}
              />
              {this.state.selectedCarDutyError ? (
                <p className="text-danger" style={errorText}>
                  Duty Required
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <div className="form-group">
              <p className="text-dark">Fuel *</p>
              <Select
                value={this.state.selectedCarsFuelOption}
                onChange={this.handleCarsFuelChange}
                options={carFuelOption}
                placeholder={"Select Fuel"}
              />
              {this.state.selectedCarsFuelError ? (
                <p className="text-danger" style={errorText}>
                  Fuel Required
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <div className="form-group">
              <p className="text-dark">Interior *</p>
              <Select
                value={this.state.selectedCarsInteriorOption}
                onChange={this.handleCarsInteriorChange}
                options={carInteriorOption}
                placeholder={"Select Interior"}
              />
              {this.state.selectedCarsInteriorError ? (
                <p className="text-danger" style={errorText}>
                  Interior Required
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="col-md-3 text-dark text-centre"
            style={{ marginTop: "10px" }}
          >
            <div className="form-group">
              <p className="text-dark">Color *</p>
              <Select
                value={this.state.selectedCarsColorOption}
                onChange={this.handleCarsColorChange}
                options={carColorOption}
                placeholder={"Select Color"}
              />
              {this.state.selectedCarsColorError ? (
                <p className="text-danger" style={errorText}>
                  Color Required
                </p>
              ) : null}
            </div>
          </div>

          <div
            className="col-md-3 text-dark text-centre"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <div className="form-group">
              <p className="text-dark">Location *</p>
              <Select
                value={this.state.selectedCarsLocationOption}
                onChange={this.handleCarsLocationChange}
                options={carLocationOption}
                placeholder={"Select Location"}
              />
              {this.state.selectedCarsLocationError ? (
                <p className="text-danger" style={errorText}>
                  Location Required
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterSellCarComponenet;
