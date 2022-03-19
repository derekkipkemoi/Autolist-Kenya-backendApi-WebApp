import React, { Component } from "react";

var phoneno = /^\d{10}$/;
var name = /^[a-zA-Z]+$/;
class CustomInput extends Component {
  state = {
    name: "",
    password: "",
    Error: "",
    firstNameError: null,
    lastNameError: null,
    phoneError: null,
  };
  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    let phoneNumberErr = "";
    if (nam === "number") {
      if (val.match(phoneno) && Number(val)) {
        phoneNumberErr = null;
      } else {
        phoneNumberErr = "Valid Phone Number Required";
      }
    }

    this.setState({
      phoneError: phoneNumberErr,
    });

    let firstNameErr = "";
    if (nam === "firstName") {
      if (val.match(name)) {
        firstNameErr = null;
      } else {
        firstNameErr = "Valid Name Required";
      }
    }
    this.setState({
      firstNameError: firstNameErr,
    });

    let lastNameErr = "";
    if (nam === "lastName") {
      if (val.match(name)) {
        lastNameErr = null;
      } else {
        lastNameErr = "Valid Name Required";
      }
    }
    this.setState({
      lastNameError: lastNameErr,
    });

    //Values
    this.setState({
      [nam]: val,
    });
  };

  render() {
    console.log(this.state.Error);
    return (
      <div>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          name={this.props.name}
          id={this.props.id}
          placeholder={this.props.placeholder}
          className="form-control text-dark"
          type={this.props.type}
          onChange={this.changeHandler}
        />
        <p className="text-danger">{this.state.firstNameError}</p>
      </div>
    );
  }
}
export default CustomInput;
