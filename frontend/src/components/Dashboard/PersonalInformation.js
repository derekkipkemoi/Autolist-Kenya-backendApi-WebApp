import React, { Component } from "react";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
var name = /^[a-zA-Z]+$/;

class PersonalInformation extends Component {
  state = {
    type: "input",
    userObject: JSON.parse(localStorage.getItem("UserObject")),
    firstName: "",
    accountStatus: true,
    userEmail: "",
    firstNameError: null,
    lastName: "",
    lastNameError: null,
    profilePicture: "",
    loading: false,
    buttonEnable: true,
    percentage: 0,
  };

  initComponent = async () => {
    if (this.props.isAuthenticated) {

      this.setState({
        loading: true
      })
      await this.props.getUser(
        JSON.parse(localStorage.getItem("UserObject")).id
      );
      const userObject = this.props.userObject;

      switch (userObject.method) {
        case "google":
          this.setState({
            firstName: this.props.userObject.google.name
              .split(" ")
              .slice(0, -1)
              .join(" "),
            lastName: this.props.userObject.google.name
              .split(" ")
              .slice(-1)
              .join(" "),
            profilePicture: this.props.userObject.google.picture,
            loading: false,
          });
          break;
        case "facebook":
          this.setState({
            loading: false,
            userName: this.props.userObject.facebook.name,
            firstName: this.props.userObject.facebook.name
              .split(" ")
              .slice(0, -1)
              .join(" "),
            lastName: this.props.userObject.facebook.name
              .split(" ")
              .slice(-1)
              .join(" "),
            profilePicture: this.props.userObject.facebook.picture,
          });
          break;
        case "local":
          this.setState({
            loading: false,
            accountStatus: this.props.userObject.local.active,
            userEmail: this.props.userObject.local.email,
            userName: this.props.userObject.local.name,
            firstName: this.props.userObject.local.name
              .split(" ")
              .slice(0, -1)
              .join(" "),
            lastName: this.props.userObject.local.name
              .split(" ")
              .slice(-1)
              .join(" "),
            profilePicture: this.props.userObject.local.picture,
          });
          break;
        default:
          this.setState({
            sellerName: "Hallo",
          });
      }
    }
  };

  componentDidMount = () => {
    this.initComponent();
  };

  
  changeHandler = (event) => {
    this.setState({
      buttonEnable: false,
    });
    let nam = event.target.name;
    let val = event.target.value;

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

  updateProfileImage = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const imagesData = new FormData();
    for (const file of e.target.files) {
      imagesData.append("photos", file);
    }

    await this.props.updateProfileImage(
      JSON.parse(localStorage.getItem("UserObject")).id,
      imagesData,
      (progressEvent) => {
        const percentage = parseInt(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        this.setState({ percentage: percentage });
        return percentage; // Because you were returning the percentage before.
      }
    );

    this.setState({
      profilePicture: this.props.imageUrl,
      loading: false,
      percentage: 0,
    });
  };

  updateUserInformation = async (event) => {
    event.preventDefault();
    if (!this.state.firstName.match(name) || !this.state.lastName.match(name)) {
      this.setState({
        sellerNameError: "Valid Name Required",
      });
      return;
    }

    this.setState({
      loading: true,
    });

    const updateProfile = JSON.stringify({
      name: this.state.firstName + " " + this.state.lastName,
    });

    await this.props.updateUser(
      this.props.userObject.id,
      JSON.parse(updateProfile)
    );
    this.setState({
      message: this.props.message,
      loading: false,
    });
  };

  render() {
    
    return (
      <div className="container">
        {!this.state.accountStatus ? (
            <div className="alert alert-danger" role="alert">
              <small>
                Please activate your account to start selling on Autolist
                Kenya.We sent an activation email to{" "}
                <span className="font-weight-bold">
                  {this.state.userEmail}
                </span>
              </small>
            </div>
          ) : null}
        <div className="card rounded shadow">
          <div className="card-header font-weight-bold">Personal Details</div>

          {this.state.profilePicture === "" ? (
            <div className="mx-auto d-block imageProfile">
              <div className="profilePercentage">
                <h4>{this.state.percentage}</h4>
              </div>
              <div className="overlayProfile">
                <label
                  htmlFor="files"
                  className="btn rounded-circle btn-round-profile shadow border-1"
                >
                  <FontAwesomeIcon icon="pen" />
                </label>
              </div>
              <input
                type="file"
                id="files"
                accept=".jpg, .png, .gif, .jpeg"
                onChange={this.updateProfileImage}
              />

              <img
                src="../assets/svgs/user.svg"
                className="rounded-circle mx-auto d-block"
                alt="..."
                width="120"
                height="120"
                style={{ marginTop: "20px" }}
              />
            </div>
          ) : (
            <div className="mx-auto d-block imageProfile">
              <div className="profilePercentage" style={{ color: "#25D366" }}>
                {this.state.loading ? (
                  <div>
                    <div className="spinner-border"></div>
                    <h4>{this.state.percentage}</h4>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="overlayProfile">
                <label
                  htmlFor="files"
                  className="btn rounded-circle btn-round-profile shadow border-1"
                >
                  <FontAwesomeIcon icon="pen" />
                </label>
              </div>
              <input
                type="file"
                id="files"
                accept=".jpg, .png, .gif, .jpeg"
                onChange={this.updateProfileImage}
              />

              <img
                src={this.state.profilePicture}
                className="rounded-circle"
                alt="..."
                width="120"
                height="120"
                style={{ marginTop: "20px" }}
              />
            </div>
          )}

          <div className="card-body text-secondary">
            <form onSubmit={this.updateUserInformation}>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      id="firstName"
                      value={this.state.firstName}
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
                      value={this.state.lastName}
                      onChange={this.changeHandler}
                    />
                    <small className="text-danger">
                      {this.state.lastNameError}
                    </small>
                  </div>
                </div>
              </div>

              {this.state.loading ? <Spinner /> : null}
              <button
                className="btn btn-custom btn-block"
                type="submit"
                disabled={this.state.buttonEnable}
                style={{ marginTop: "20px" }}
              >
                Save
              </button>
            </form>
            <div className="mx-auto text-success">{this.props.message}</div>
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
    imageUrl: state.auth.imageUrl,
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, actions)(PersonalInformation);
