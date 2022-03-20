import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarCard from "./CarCard";
import Spinner from "./Spinner";

import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

class UserList extends Component {
  state = {
    loading: false,
    userId: null,
    userObject: null,
    phoneNumber: "Show",
    userName: null,
    sellerJoinedAt: 0,
    cars: [],
  };

  componentDidMount = async () => {
    await this.props.getUser(this.props.match.params.userID);
    await this.props.getUserCars(this.props.match.params.userID);

    //console.log("User ID",this.props.match.params.userID)

    var dateString = this.props.userObject.createdAt;
    dateString = new Date(dateString).toUTCString();
    dateString = dateString.split(" ").slice(0, 4).join(" ");
    if (this.props.userObject.method === "google") {
      this.setState({
        cars: this.props.carsList,
        userObject: this.props.userObject,
        loading: false,
        userId: this.props.userObject._id,
        number: this.props.userObject.phoneNumber.number,
        sellerJoinedAt: dateString,
        userName: this.props.userObject.google.name,
        profilePicture: this.props.userObject.google.picture,
      });
    }

    if (this.props.userObject.method === "facebook") {
      this.setState({
        cars: this.props.carsList,
        userId: this.props.userObject._id,
        userObject: this.props.userObject,
        loading: false,
        number: this.props.userObject.phoneNumber.number,
        sellerJoinedAt: dateString,
        userName: this.props.userObject.facebook.name,
        profilePicture: this.props.userObject.facebook.picture,
      });
    }

    if (this.props.userObject.method === "local") {
      this.setState({
        cars: this.props.carsList,
        userObject: this.props.userObject,
        userId: this.props.userObject._id,
        loading: false,
        number: this.props.userObject.phoneNumber.number,
        sellerJoinedAt: dateString,
        userName: this.props.userObject.local.name,
        profilePicture: this.props.userObject.local.picture,
      });
    }
  };

  showSellerNumber(phoneNumber) {
    this.setState({
      phoneNumber: "0" + phoneNumber,
    });
  }

  render() {
    const iconsStyle = {
      color: "#00544C",
      marginLeft: "10px",
      marginRight: "10px",
    };

    const socialMediaIconsStyle = {
      marginTop: "10px",
    };

    return (
      <div>
        <div className="container" style={{ marginTop: "70px" }}>
          <div className="row">
            <aside className="col-md-2 blog-sidebar">
              <div className="card">
                {this.state.profilePicture === "" ? (
                  <img
                    src="https://img.icons8.com/bubbles/100/000000/user.png"
                    className="rounded-circle mx-auto d-block"
                    alt="..."
                    width="120"
                    height="120"
                    style={{ marginTop: "20px" }}
                  />
                ) : (
                  <img
                    src={this.state.profilePicture}
                    className="rounded-circle mx-auto d-block"
                    alt="..."
                    width="120"
                    height="120"
                    style={{ marginTop: "20px" }}
                  />
                )}

                <div className="card-body text-dark text-centre">
                  <h5 className="card-title text-centre font-weight-bold">
                    {this.state.userName}
                  </h5>
                </div>
                <ul className="text-dark list-group list-group-flush">
                  <li className="list-group-item font-weight-bold">
                    Joined : {this.state.sellerJoinedAt}
                  </li>
                  <li className="list-group-item font-weight-bold">
                    Total Ads : {this.state.cars.length}
                  </li>
                </ul>
                <div className="card-body">
                  {
                    <button
                      className="btn btn-custom btn-block text-dark text-centre font-weight-bold"
                      type="submit"
                      onClick={this.showSellerNumber.bind(
                        this,
                        this.state.number
                      )}
                    >
                      <FontAwesomeIcon
                        icon="phone"
                        style={iconsStyle}
                        className="font-weight-bold"
                      />
                      {this.state.phoneNumber}
                    </button>
                  }

                  <div style={socialMediaIconsStyle}>
                    {
                      <FacebookShareButton
                        url={"https://www.autolist.co.ke/"}
                        quote={
                          this.state.userName +
                          "  On motikenya.co.ke.   " +
                          this.state.cars.length +
                          " Cars Listed for sale. Link: https://www.autolist.co.ke/userList/" +
                          this.state.userId
                        }
                        hashtag="Autolist, Kenya"
                      >
                        <FacebookIcon size={36} round={true} />
                      </FacebookShareButton>
                    }

                    {
                      <TwitterShareButton
                        title={
                          this.state.userName +
                          "  On https://www.autolist.co.ke.   " +
                          this.state.cars.length +
                          " Cars Listed for sale Link: "
                        }
                        url={
                          "ttps://www.autolist.co.ke/userList/" +this.state.userId
                        }
                      >
                        <TwitterIcon size={36} round={true} />
                      </TwitterShareButton>
                    }
                  </div>
                </div>
              </div>
            </aside>
            <div className="col-md-10">
              {
                <div>
                  {this.state.loading ? <Spinner /> : null}
                  {this.state.cars.map((car) => (
                     <div key={car.id}>
                    <div key={car.id}>
                      <CarCard car={car} />
                    </div>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    carsList: state.userCarsList.carsList,
    userObject: state.auth.userObject,
  };
}
export default connect(mapStateToProps, actions)(UserList);
