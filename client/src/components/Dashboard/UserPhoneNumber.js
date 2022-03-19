import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

var phoneno = /^\d{10}$/;

class UserPhoneNumber extends Component {
  state = {
    userObject: JSON.parse(localStorage.getItem("UserObject")),
    phoneNumber: "",
    loading: false,
  };

  componentDidMount = async () => {
    if (this.props.isAuthenticated) {
      this.setState({
        loading: true,
        userObject: JSON.parse(localStorage.getItem("UserObject")),
      });

      if (this.state.userObject.id !== undefined) {
        await this.props.getUser(this.state.userObject.id);
        if (this.props.userObject.method === "google") {
          this.setState({
            phoneNumber: this.props.userObject.phoneNumber.number,
            loading: false,
          });
        }

        if (this.props.userObject.method === "facebook") {
          this.setState({
            phoneNumber: this.props.userObject.phoneNumber.number,
            loading: false,
          });
        }

        if (this.props.userObject.method === "local") {
          this.setState({
            phoneNumber: this.props.userObject.phoneNumber.number,
            loading: false,
          });
        }
      } else {
        await this.props.getUser(
          JSON.parse(localStorage.getItem("UserObject"))._id
        );
        if (this.props.userObject.method === "google") {
          this.setState({
            phoneNumber: this.props.userObject.phoneNumber.number,
            loading: false,
          });
        }

        if (this.props.userObject.method === "facebook") {
          this.setState({
            phoneNumber: this.props.userObject.phoneNumber.number,
            loading: false,
          });
        }

        if (this.props.userObject.method === "local") {
          this.setState({
            phoneNumber: this.props.userObject.phoneNumber.number,
            loading: false,
          });
        }
      }
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="card rounded shadow">
            <div className="card-header font-weight-bold">
              Change Phone Number
            </div>
            <div className="card-body text-secondary">
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <label htmlFor="phoneNumber" style={{ fontWeight: "bold" }}>
                    Phone Number :
                  </label>
                  <label htmlFor="phoneNumber" className="text-center">
                    {"0" + this.state.phoneNumber}
                  </label>
                  <small className="text-danger">
                    {this.state.phoneNumberError}
                  </small>
                </div>
              </div>

              {this.state.loading ? <Spinner /> : null}
              <Link
                to={{
                  pathname: "/updatePhoneNumber",
                  search: "?query=abc",
                  state: { detail: "userProfile" },
                }}
                style={{ marginTop: "20px" }}
                className="btn btn-custom btn-block"
              >
                Update Phone Number
              </Link>

              <div className="mx-auto text-success">{this.props.message}</div>
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
  };
}

export default connect(mapStateToProps, actions)(UserPhoneNumber);
