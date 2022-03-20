import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import FaceboookLogin from "react-facebook-login";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Spinner from "../Spinner";
import * as actions from "../../actions";
var phoneno = /^\d{10}$/;
var name = /^[a-zA-Z]+$/;
var email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

class SignUp extends Component {
  state = {
    type: "input",
    score: "null",
    firstName: null,
    firstNameError: null,
    lastName: null,
    lastNameError: null,
    phoneNumber: null,
    phoneError: null,
    email: null,
    emailError: null,
    password: null,
    passwordError: null,
    confirmPassword: null,
    confirmPasswordError: null,
    loading: false,
  };

  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input",
    });
  }

  passwordStrength(e) {
    if (e.target.value === "") {
      this.setState({
        score: "null",
      });
    } else {
      var pw = e.target.value;
      this.setState({
        score: pw.score,
      });
    }
  }

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

    let emailErr = "";
    if (nam === "email") {
      if (val.match(email)) {
        emailErr = null;
      } else {
        emailErr = "Valid Email Required";
      }
    }
    this.setState({
      emailError: emailErr,
    });

    let passwordErr = "";
    if (nam === "password") {
      if (val.length >= 6) {
        passwordErr = null;
      } else {
        passwordErr = "Your password must be minimum 6 characters";
      }
    }
    this.setState({
      passwordError: passwordErr,
    });

    let confirmPasswordErr = "";
    if (nam === "confirmPassword") {
      if (val.length >= 6 && val === this.state.password) {
        confirmPasswordErr = null;
      } else {
        confirmPasswordErr = "Passwords do not match";
      }
    }
    this.setState({
      confirmPasswordError: confirmPasswordErr,
    });

    //Values
    this.setState({
      [nam]: val,
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    if (this.state.firstName === null || !this.state.firstName.match(name)) {
      this.setState({
        firstNameError: "Valid Name Required",
      });
      return;
    }

    if (this.state.lastName === null || !this.state.lastName.match(name)) {
      this.setState({
        lastNameError: "Valid Name Required",
      });
      return;
    }

    if (this.state.email === null || !this.state.email.match(email)) {
      this.setState({
        emailError: "Valid Email Required",
      });
      return;
    }

    if (this.state.password === null || this.state.password.length < 6) {
      this.setState({
        passwordError: "Your password must be minimum 6 characters",
      });
      return;
    }

    if (
      this.state.confirmPassword === null ||
      this.state.confirmPassword !== this.state.password
    ) {
      this.setState({
        confirmPasswordError: "Passwords do not match",
      });
      return;
    }

    this.setState({
      loading: true,
    });
    const params = JSON.parse(
      JSON.stringify({
        email: this.state.email,
        name: this.state.firstName.concat(" ", this.state.lastName),
        password: this.state.password,
      })
    );

    await this.props.signUp(params);
    this.setState({
      loading: false,
    });
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  responseGoogle = async (res) => {
    await this.props.oauthGoogle(res.accessToken);
    console.log("Token", res.accessToken)
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  responseFacebook = async (res) => {
    await this.props.oauthFacebook(res.accessToken);
    console.log("Token", res.accessToken)
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  render() {
    const mystyle = {
      marginTop: "100px",
    };
    return (
      <div>
        <div style={mystyle}>
          <div className="row justify-content-center">
            <div className="card rounded shadow" style={{ maxWidth: "26rem" }}>
              <div className="card-header font-weight-bold">Register</div>
              <div className="card-body text-secondary">
                <h6
                  className="card-title font-weight-bold"
                  style={{ color: "#000", marginBottom: "20px" }}
                >
                  Register With Social Accounts
                </h6>
                <div className="row">
                  <div>
                    <FaceboookLogin
                      appId="617178446082367"
                      autoLoad={false}
                      textButton={
                        <img
                          style={{ width: "30px" }}
                          alt="Clock"
                          src={require("../../assets/svgs/facebook.svg")}
                        />
                      }
                      field="name,email,picture"
                      callback={this.responseFacebook.bind(this)}
                      cssClass="btn rounded-circle btn-round-social-facebook shadow border-1"
                    />
                  </div>
                  <div>
                    <GoogleLogin
                      clientId="92238366680-bmpi6katjn6mvnmir4ekce1clp8pjuqq.apps.googleusercontent.com"
                       autoLoad={false}
                      render={(renderProps) => (
                        <button
                          className="btn rounded-circle btn-round-social-google shadow border-1"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          <img
                            style={{ width: "30px", height: "30px" }}
                            alt="Clock"
                            src={require("../../assets/svgs/google.svg")}
                          />
                        </button>
                      )}
                      buttonText="Google"
                      onSuccess={this.responseGoogle.bind(this)}
                      onFailure={this.responseGoogle.bind(this)}
                      cssClass="btn btn-outline-primary"
                    />
                  </div>
                </div>

                <div className="row" style={{ marginTop: "20px" }}>
                  <div className="col">
                    <hr></hr>
                  </div>
                  <div className="col-auto">OR</div>
                  <div className="col">
                    <hr></hr>
                  </div>
                </div>

                <h6
                  className="card-text font-weight-bold"
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    color: "#000",
                  }}
                >
                  Register Manually
                </h6>

                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          className="form-control"
                          id="firstName"
                          placeholder="Enter First Name"
                          onChange={this.changeHandler}
                        />
                        <small className="text-danger">
                          {this.state.firstNameError}
                        </small>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="LsstName">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter Last Name"
                          onChange={this.changeHandler}
                        />
                        <small className="text-danger">
                          {this.state.lastNameError}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: "10px" }}>
                    <label>Email address *</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email"
                      onChange={this.changeHandler}
                    />
                    <small className="text-danger">
                      {this.state.emailError}
                    </small>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="form-group" style={{ marginTop: "10px" }}>
                        <label htmlFor="Password">Password *</label>
                        <input
                          type={this.state.type}
                          name="password"
                          className="password__input form-control"
                          onChange={this.changeHandler}
                          id="password"
                          placeholder="Enter Password"
                        />
                        <small className="text-danger">
                          {this.state.passwordError}
                        </small>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group" style={{ marginTop: "10px" }}>
                        <label htmlFor="confirmPassword">
                          Confirm Password *
                        </label>
                        <input
                          type={this.state.type}
                          name="confirmPassword"
                          className="password__input form-control"
                          onChange={this.changeHandler}
                          id="confirmPassword"
                          placeholder="Confirm Password"
                        />
                        <small className="text-danger">
                          {this.state.confirmPasswordError}
                        </small>
                      </div>
                    </div>
                  </div>

                  <label className="password">
                    <button
                      className="btn rounded-circle btn-secondary"
                      onClick={this.showHide.bind(this)}
                      style={{ marginTop: "10px" }}
                    >
                      {this.state.type === "input" ? (
                        <FontAwesomeIcon icon="eye-slash" />
                      ) : (
                        <FontAwesomeIcon icon="eye" />
                      )}
                    </button>
                  </label>

                  {this.props.message === "User Registered Successfully" ? (
                    <div className="alert alert-success">
                      <small>{this.props.message}</small>
                    </div>
                  ) : null}

                  {this.props.message ===
                  "User with " + this.state.email + " already exists!" ? (
                    <div className="alert alert-danger">
                      <small>{this.props.message}</small>
                    </div>
                  ) : null}

                  {this.state.loading ? <Spinner /> : null}

                  <button
                    className="btn btn-custom btn-block text-info"
                    type="submit"
                    style={{ marginTop: "20px" }}
                  >
                    Register
                  </button>
                </form>
              </div>
              <div className="card-header font-weight-bold">
                Already registerd ?{" "}
                <Link to={`/signin`} style={{ color: "#25D366" }}>
                  Log In
                </Link>
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
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(SignUp);
