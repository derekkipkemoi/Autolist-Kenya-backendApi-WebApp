import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";

import * as actions from "../../actions";
import Spinner from "../../components/Spinner";
var email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

class RequestPasswordReset extends Component {
  state = {
    type: "input",
    score: "null",
    userObject: JSON.parse(localStorage.getItem("UserObject")),
    email: null,
    emailError: null,
    password: null,
    passwordError: null,
    loading: false,
    requestReason: "",
    textInputEditable: true,
  };

  componentDidMount = async () => {
    this.setState({
      requestReason: this.props.match.params.requestReason,
    });

    if (this.props.isAuthenticated) {
      this.setState({
        textInputEditable: false,
        loading: true,
        userObject: JSON.parse(localStorage.getItem("UserObject")),
      });
      await this.props.getUser(this.state.userObject.id);
      if (this.props.userObject.method === "google") {
        this.setState({
          email: this.props.userObject.google.email,
          loading: false,
        });
      }

      if (this.props.userObject.method === "facebook") {
        this.setState({
          email: this.props.userObject.facebook.email,
          loading: false,
        });
      }

      if (this.props.userObject.method === "local") {
        this.setState({
          email: this.props.userObject.local.email,
          loading: false,
        });
      }
    }
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
    //Values
    this.setState({
      [nam]: val,
    });
  };
  onSubmit = async (event) => {
    event.preventDefault();

    if (this.state.email === null || !this.state.email.match(email)) {
      this.setState({
        emailError: "Valid Email Required",
      });
      return;
    }

    this.setState({
      loading: true,
    });

    await this.props.requestPasswordReset(this.state.email);
    this.setState({
      loading: false,
    });
  };
  render() {
    const mystyle = {
      marginTop: "130px",
    };
    return (
      <div className="container" style={mystyle}>
        <div className="row justify-content-center">
          <div className="card rounded shadow" style={{ maxWidth: "26rem" }}>
            <div className="card-header font-weight-bold">
              {this.state.requestReason}
            </div>
            <div className="card-body text-secondary">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  {!this.state.textInputEditable ? (
                    <div>
                      <label htmlFor="exampleFormControlInput1">
                        Instructions on how to change your password will be sent
                        to your email below
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        id="email"
                        readOnly
                        placeholder={this.state.email}
                        onChange={this.changeHandler}
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="exampleFormControlInput1">
                        Enter Your Registered Email *
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder={this.state.email}
                        onChange={this.changeHandler}
                      />
                    </div>
                  )}

                  <small className="text-danger">{this.state.emailError}</small>
                </div>

                {this.props.message ===
                "User With this email does not exist. Please Use the Email you Registered with" ? (
                  <div className="alert alert-danger">
                    <small>{this.props.message}</small>
                  </div>
                ) : null}

                {this.props.message ===
                "Password reset link has been sent to " +
                  this.state.email +
                  " please use it to reset your password" ? (
                  <div className="alert alert-success">
                    <small>{this.props.message}</small>
                  </div>
                ) : null}

                {this.state.loading ? <Spinner /> : null}

                {this.props.message ===
                "Password reset link has been sent to " +
                  this.state.email +
                  " please use it to reset your password" ? (
                  <Link
                    className="btn btn-custom btn-block text-light"
                    to={`/`}
                    type="submit"
                    style={{ marginTop: "20px" }}
                  >
                    Continue
                  </Link>
                ) : (
                  <button
                    className="btn btn-custom btn-block text-light"
                    type="submit"
                    style={{ marginTop: "20px" }}
                  >
                    {this.state.requestReason}
                  </button>
                )}
              </form>
            </div>
            {this.state.textInputEditable ? (
              <div className="card-header font-weight-bold">
                Forget about it{" "}
                <Link to={`/signin`} style={{ color: "#25D366" }}>
                  Send me back
                </Link>{" "}
                to Login
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    isAuthenticated: state.auth.isAuthenticated,
    userObject: state.auth.userObject,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "requestPasswordReset" })
)(RequestPasswordReset);
