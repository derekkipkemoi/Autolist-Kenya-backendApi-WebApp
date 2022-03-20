import React from "react";
import firebase from "./Firebase";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Spinner from "../Spinner";

var codeno = /^\d{6}$/;

class VerifyOTPCode extends React.Component {
  state = {
    type: "input",
    OTPCode: null,
    OTPCodeError: null,
    buttonDisabled: true,
    loading: false,
    message: null,
    phoneNumber: null,
    userObject: JSON.parse(localStorage.getItem("UserObject")),
  };
  changeHandler = (event) => {
    this.setState({
      buttonDisabled: false,
    });
    let nam = event.target.name;
    let val = event.target.value;

    let OTPCodeErr = "";
    if (nam === "OTPCode") {
      if (val.match(codeno)) {
        OTPCodeErr = null;
      } else {
        OTPCodeErr = "Valid Code Required";
      }
    }

    this.setState({
      OTPCodeError: OTPCodeErr,
    });
    //Values
    this.setState({
      [nam]: val,
    });
  };
  onSubmitOTPCode = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const code = this.state.OTPCode;
    window["confirmationResult"]
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        var phoneno = user.phoneNumber.slice(user.phoneNumber.length - 9);
        console.log(phoneno);
        this.setState({
          loading: false,
          phoneNumber: phoneno,
        });
        this.updateUserPhone();
        // ...
      })
      .catch((error) => {
        this.setState({
          message: "Incorrect OTP Code",
          loading: false,
        });
        return;
      });
  };

  updateUserPhone = async () => {
    this.setState({
      loading: true,
    });

    const phoneNumberToUpdate = JSON.stringify({
      number: this.state.phoneNumber,
    });

    if (this.state.userObject.id !== undefined) {
      await this.props.updatePhoneNumber(
        this.state.userObject.id,
        JSON.parse(phoneNumberToUpdate)
      );
    } else {
      await this.props.updatePhoneNumber(
        JSON.parse(localStorage.getItem("UserObject"))._id,
        JSON.parse(phoneNumberToUpdate)
      );
    }

    this.setState({
      message: this.props.message,
      userObject: JSON.parse(localStorage.getItem("UserObject")),
      loading: false,
    });

    this.props.history.push(`/${this.props.location.state.detail}`);
  };
  render() {
    const mystyle = {
      marginTop: "100px",
    };
    return (
      <div className="container" style={mystyle}>
        <div className="row justify-content-center">
          <div className="card rounded shadow" style={{ maxWidth: "36rem" }}>
            <div className="card-header font-weight-bold">
              Update Phone Number
            </div>
            <div className="card-body text-secondary">
              <form onSubmit={this.onSubmitOTPCode}>
                <div className="form-group" style={{ marginTop: "10px" }}>
                  <label htmlFor="OTPCode">OTP Code *</label>
                  <input
                    type={this.state.type}
                    name="OTPCode"
                    className="form-control"
                    onChange={this.changeHandler}
                    id="code"
                    placeholder="Enter OTP Code"
                  />
                  <small className="text-danger">
                    {this.state.OTPCodeError}
                  </small>
                </div>

                {this.state.message === "Incorrect OTP Code" ? (
                  <div
                    className="alert alert-danger"
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                  >
                    <small>{this.state.message}</small>
                  </div>
                ) : null}

                {this.state.loading ? <Spinner /> : null}

                <button
                  className="btn btn-custom btn-block text-light"
                  type="submit"
                  disabled={this.state.buttonDisabled}
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  Verify OTP Code
                </button>
              </form>
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
    userObject: state.auth.userObject,
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, actions)(VerifyOTPCode);
