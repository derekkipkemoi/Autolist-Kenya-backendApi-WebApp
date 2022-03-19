import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as actions from "../actions";

class Header extends Component {
  state = {
    sellerName: null,
    userObject: null,
  };

  signOut = () => {
    this.props.signOut();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.userObject) !==
      JSON.stringify(this.props.userObject)
    ) {
      this.initComponent();
    }

    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      this.initComponent();
    }
  }

  initComponent = async () => {
    if (this.props.isAuthenticated) {
      if(JSON.parse(localStorage.getItem("UserObject")) !== null){
        await this.props.getUser(
          JSON.parse(localStorage.getItem("UserObject")).id
        );

        const userObject = this.props.userObject;

      switch (userObject.method) {
        case "google":
          this.setState({
            sellerName: userObject.google.name,
          });
          break;
        case "facebook":
          this.setState({
            sellerName: userObject.facebook.name,
          });
          break;
        case "local":
          this.setState({
            sellerName: userObject.local.name,
          });
          break;
        default:
          this.setState({
            sellerName: "Hallo",
          });
      }
      }
      
      
    }
  };

  componentDidMount = () => {
    this.initComponent();
  };

  render() {
    const mystyle = {
      backgroundColor: "#25D366",
    };
    const iconsStyle = {
      color: "#d60841",
    };
    return (
      <nav
        className="navbar navbar-expand-lg fixed-top navbar-dark"
        style={mystyle}
      >
        <div className="container">
          <Link className="navbar-brand justify-content-center text-center" to="/">
            <img
              alt="Clock"
              src={require("../assets/images/carlogo2.png")}
            />
            Autolist.co.ke
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar- ml-auto">
              {!this.props.isAuthenticated
                ? [
                    <li className="nav-item" key="signup">
                      <Link className="nav-link text-light" to="/signup">
                        Register
                      </Link>
                    </li>,
                    <li className="nav-item" key="signin">
                      <Link className="nav-link text-light" to="/signin">
                        Login
                      </Link>
                    </li>,
                    <li className="nav-item text-center" key="sell">
                      <Link
                        className="btn btn-sellcar btn-block font-weight-bold shadow border-1"
                        to="/signin"
                        role="button"
                        style={{ marginTop: "0px" }}
                      >
                        <FontAwesomeIcon
                          icon="car"
                          style={{ marginRight: "5px" }}
                        />
                        Sell Your Car
                      </Link>
                    </li>,
                  ]
                : [
                    <li className="nav-item text-center" key={12}>
                      <Link
                        className="btn rounded-circle btn-round-circle-favourite shadow border-1"
                        to="/favouriteList"
                        data-toggle="tooltip"
                        title="Favourites"
                      >
                        <FontAwesomeIcon icon="heart" style={iconsStyle} />
                      </Link>
                    </li>,

                    <li
                      className="nav-item text-center"
                      style={{ marginLeft: "10px" }}
                      key={13}
                    >
                      <Link
                        className="btn rounded-circle btn-round-circle-list shadow border-1"
                        to="/dashboard"
                        data-toggle="tooltip"
                        title="My Adverts"
                      >
                        <FontAwesomeIcon icon="list" />
                      </Link>
                    </li>,

                    <li className="dropdown" key={2}>
                      <div className="btn-group">
                        <Link
                          className="nav-link font-weight-bold text-light dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          to="/dashboard"
                        >
                          Hi,{this.state.sellerName}
                        </Link>

                        <div className="dropdown-menu">
                          <Link
                            className="dropdown-item text-success"
                            to="/dashboard"
                          >
                            <FontAwesomeIcon
                              icon="list"
                              className="font-weight-bold"
                            />{" "}
                            Adverts
                          </Link>
                          <Link
                            className="dropdown-item text-info"
                            to="/userprofile"
                          >
                            <FontAwesomeIcon
                              icon="user"
                              className="font-weight-bold"
                            />{" "}
                            Profile
                          </Link>
                          <div className="dropdown-divider"></div>
                          <Link
                            className="dropdown-item text-danger"
                            to="/"
                            onClick={this.signOut.bind(this)}
                          >
                            <FontAwesomeIcon
                              icon="sign-out-alt"
                              className="font-weight-bold color-warning"
                            />{" "}
                            Logout
                          </Link>
                        </div>
                      </div>
                    </li>,

                    <li className="nav-item text-center" key={3}>
                      <Link
                        className="btn btn-sellcar btn-block font-weight-bold shadow border-1"
                        to="/sellcar"
                        role="button"
                        style={{ marginTop: "0px" }}
                      >
                        <FontAwesomeIcon
                          icon="car"
                          style={{ marginRight: "5px" }}
                        />
                        Sell Your Car
                      </Link>
                    </li>,
                  ]}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userObject: state.auth.userObject,
  };
}

export default connect(mapStateToProps, actions)(Header);
