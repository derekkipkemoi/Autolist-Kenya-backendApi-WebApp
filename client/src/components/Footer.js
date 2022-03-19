import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class footer extends Component {
  state = {};
  getYear = () => {
    return new Date().getFullYear();
  };
  render() {
    const iconsStyle = {
      color: "white",
      marginRight: "10px",
    };

    const footerMain = {
      position: "absolute",
      bottom: "0",
      width: "100%",
    };

    const footerStyle = {
      backgroundColor: "#25D366",
    };

    return (
      <div style={footerMain}>
        <div style={footerStyle}>
          <div className="container">
            <div className="row" style={{ paddingTop: "10px" }}>
              <div className="col-md-3">
                <div className="col-smr">
                  <p className="text-light font-weight-bold" style={{color: "#25D366"}}>Resources</p>
                  <hr
                    style={{ backgroundColor: "#25D366", height: "1px" }}
                  ></hr>
                  <p>
                    <Link
                      to="/privacyPolicy"
                      className="text-light font-weight-bold"
                      style={{ fontSize: "14px" }}
                    >
                      Privacy Policy
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/termsAndConditions"
                      className="text-light font-weight-bold"
                      style={{ fontSize: "14px" }}
                    >
                      Terms and Conditions
                    </Link>
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="col-smr" style={{ marginTop: "0px" }}>
                  <p className="text-light font-weight-bold" style={{color: "#25D366"}}>Contact</p>
                  <hr
                    style={{ backgroundColor: "#25D366", height: "1px" }}
                  ></hr>
                  <p>
                    <Link
                      to="/contactUs"
                      className="text-light font-weight-bold"
                      style={{ fontSize: "14px" }}
                    >
                      Contact Us
                    </Link>
                  </p>
                  <p
                    className="text-light font-weight-bold"
                    style={{ fontSize: "14px" }}
                  >
                    <FontAwesomeIcon icon="envelope" style={iconsStyle} />
                    info@autolist.co.ke
                  </p>
                  <p
                    className="text-light font-weight-bold"
                    style={{ fontSize: "14px" }}
                  >
                    <FontAwesomeIcon icon="phone" style={iconsStyle} />
                    +254 115539223
                  </p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="col-smr">
                  <p className="text-light font-weight-bold" style={{color: "#25D366"}}>Download App</p>
                  <hr
                    style={{ backgroundColor: "#25D366", height: "1px" }}
                  ></hr>
                  <p>

                  <a 
                      className="btn btn-playstore btn-outline-light shadow border-1"
                      rel="noopener noreferrer" 
                      href="https://play.google.com/store/apps/details?id=org.carlistingapp.autolist" 
                      target="_blank"
                      role="button"
                     >
                        <img
                        style={{ width: "30px", marginRight: "10px" }}
                        alt="Clock"
                        src={require("../assets/svgs/google-play.svg")}
                      />
                        Google Play
                  </a>
                    {/* <Link
                      className="btn btn-outline-light shadow border-1"
                      to="chart" 
                      target="_blank"
                      to="https://play.google.com/store/apps/details?id=org.carlistingapp.autolist"
                      role="button"
                      style={{ marginTop: "12px" }}
                    >
                      <img
                        style={{ width: "30px", marginRight: "10px" }}
                        alt="Clock"
                        src={require("../assets/svgs/google-play.svg")}
                      />
                      
                    </Link> */}
                  </p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="col-smr" style={{ marginTop: "0px" }}>
                  <p className="text-light font-weight-bold" style={{color: "#25D366"}}>Follow Us</p>
                  <hr
                    style={{ backgroundColor: "#25D366", height: "1px" }}
                  ></hr>
                  <div className="row">
                    <button className="btn rounded-circle btn-round-social-google shadow border-1">
                      <img
                        style={{ width: "30px", height: "30px",}}
                        alt="Clock"
                        src={require("../assets/svgs/facebook.svg")}
                      />
                    </button>
                    <button className="btn rounded-circle btn-round-social-google shadow border-1">
                      <img
                        style={{ width: "30px", height: "30px"}}
                        alt="Clock"
                        src={require("../assets/svgs/twitter.svg")}
                      />

                    </button>
                    <button className="btn rounded-circle btn-round-social-google shadow border-1">
                      <img
                        style={{ width: "30px", height: "30px"}}
                        alt="Clock"
                        src={require("../assets/svgs/instagram.svg")}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#000" }}>
          <div className="container">
            <div
              className="row justify-content-center"
              style={{ paddingTop: "20px" }}
            >
              <p>
                <span>
                  © {this.getYear()}{" "}
                  <Link
                    className="text-light"
                    style={{ fontSize: "14px" }}
                    to="/"
                  >
                    autolist.co.ke
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default footer;
