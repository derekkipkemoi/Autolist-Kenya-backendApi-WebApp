import React, { Component } from "react";
import { reduxForm} from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";

import * as actions from "../../actions";
import Spinner from "../../components/Spinner";

class PasswordReset extends Component {
  state = {
    type: "input",
    score: "null",
    password: null,
    confirmPassword: null,
    confirmPasswordError: null,
    passwordError: null,
    secretToken: this.props.match.params.secretToken,
    userId: this.props.match.params.userId,
    loading: false,
  };
  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input",
    });
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    let passwordErr = "";
    if (nam === "password") {
      if (val.length >= 6) {
        passwordErr = null;
      } else {
        passwordErr = "Your password must have a minimum of 6 characters";
      }
    }

    this.setState({
      passwordError: passwordErr,
    });

    let confirmPasswordErr = "";
    if (nam === "confirmPassword") {
      if (val === this.state.password) {
        confirmPasswordErr = null;
      } else {
        confirmPasswordErr = "Your passwords do not match";
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

    if (this.state.password === null || this.state.password.length < 6) {
      this.setState({
        passwordError: "Your password must have a minimum of 6 characters",
      });
      return;
    }

    if (this.state.confirmPassword !== this.state.password) {
      this.setState({
        confirmPasswordError: "Your passwords do not match",
      });
      return;
    }
    this.setState({
      loading: true,
    });

    await this.props.resetPassword(
      this.state.secretToken,
      this.state.userId,
      this.state.password
    );

    if(this.props.message === "Your Password Has Been Reset Successfully, Please LogIn with your new password"){
        this.props.signOut();
        this.props.history.push("/signin");
    }

    this.setState({
      loading: false,
    });
    
  };

  render() {
    const mystyle = {
      marginTop: "70px",
    };
    return (
      <div className="container" style={mystyle}>
        
         
            <div className="font-weight-bold" style={{ marginTop: "25px" }}>
              <p className="text-light text-center">
                Enter New Password Below To Reset
              </p>
            </div>
            <div className="row border-1">
              <div
                className="col-md-5 border rounded mx-auto shadow border-0 bg-light"
                style={{ padding: "20px", margin: "20px" }}
              >
                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label htmlFor="exampleFormControlInput1">
                      Enter New Password *
                    </label>
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
                    <label htmlFor="exampleFormControlInput1">
                      Confirm New Password *
                    </label>
                    <input
                      type={this.state.type}
                      name="confirmPassword"
                      className="password__input form-control"
                      onChange={this.changeHandler}
                      id="password"
                      placeholder="Enter Password"
                    />
                    <small className="text-danger">
                      {this.state.confirmPasswordError}
                    </small>
                  </div>

                  <label className="password">
                    <button
                      className="password__show btn btn-secondary"
                      onClick={this.showHide.bind(this)}
                      style={{ marginTop: "10px" }}
                    >
                      {this.state.type === "input"
                        ? "Hide Password"
                        : "Show Password"}
                    </button>
                  </label>

                  {this.props.message ===
                  "Please use a password you have not used before" ? (
                    <div className="alert alert-danger">
                      <small>{this.props.message}</small>
                    </div>
                  ) : null}

                  {this.props.message ===
                  "Your Password Has Been Reset Successfully, Please LogIn with your new password" ? (
                    <div>
                      <div className="alert alert-success">
                        <small>{this.props.message}</small>
                      </div>
                      <Link
                        className="btn btn-custom btn-block text-light"
                        to={`/signin`}
                        type="submit"
                        style={{ marginTop: "20px" }}
                      >
                        Log In Here
                      </Link>
                    </div>
                  ) : (
                    <button
                      className="btn btn-custom btn-block text-light"
                      type="submit"
                      style={{ marginTop: "20px" }}
                    >
                      Reset Password
                    </button>
                  )}

                  {this.state.loading ? <Spinner /> : null}
                </form>
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
  reduxForm({ form: "requestPasswordReset" })
)(PasswordReset);
