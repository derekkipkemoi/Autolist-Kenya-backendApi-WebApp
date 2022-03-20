import React from "react";
import firebase from "./Firebase";

import Spinner from "../Spinner";

// var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
var phoneno = /^\d{10}$/;

class UpdatePhoneNumber extends React.Component {
  state = {
    type: "input",
    phoneNumber: "",
    phoneNumberError: null,
    buttonDisabled: true,
    loading: false,
    codeSent: false,
    message: null,
    fromComponent: "",
  };

  componentDidMount = () => {
    this.setState({
      fromComponent: this.props.location.state.detail,
    });
  };

  changeHandler = (event) => {
    this.setState({
      buttonDisabled: false,
    });
    let nam = event.target.name;
    let val = event.target.value;

    let phoneNumberErr = "";
    if (nam === "phoneNumber") {
      if (val.match(phoneno)) {
        phoneNumberErr = null;
      } else {
        phoneNumberErr =
          "Valid Phone Number Required, (+ and Country code not required)";
      }
    }

    this.setState({
      phoneNumberError: phoneNumberErr,
    });

    //Values
    this.setState({
      [nam]: val,
    });
  };

  configureCaptcha = () => {
    window["recaptchaVerifier"] = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
        },
      }
    );
  };

  onSignInSubmit = (event) => {
    event.preventDefault();
    if (!this.state.phoneNumber.match(phoneno)) {
      this.setState({
        phoneNumberError:
          "Valid Phone Number Required, (+ and Country code not required)",
      });
      return;
    }

    this.configureCaptcha();

    this.setState({
      loading: true,
    });

    const phoneNumber = "+254" + this.state.phoneNumber;
    const appVerifier = window["recaptchaVerifier"];
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window["confirmationResult"] = confirmationResult;
        this.setState({
          loading: false,
        });
        this.props.history.push({
          pathname: "/verifyOTPCode",
          search: "?query=abc",
          state: { detail: this.state.fromComponent },
        });
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        this.setState({
          message: "Sending Verication Code Failed",
          loading: false,
        });
      });
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
              <form onSubmit={this.onSignInSubmit}>
                <div id="sign-in-button"></div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Enter PhoneNumber"
                    onChange={this.changeHandler}
                  />
                  <small className="text-danger">
                    {this.state.phoneNumberError}
                  </small>
                </div>

                {this.state.message === "Sending Verication Code Failed" ? (
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
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  Get OTP Code
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdatePhoneNumber;
