import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PersonalInformation from "./PersonalInformation";
import PhoneNumber from "./UserPhoneNumber";

import * as actions from "../../actions";

class UserProfile extends Component {
  state = {};

  signOut = () => {
    this.props.signOut();
  };s

  render() {
    return (
      <div>
        <div
          className="container"
          style={{ marginTop: "100px", marginBottom: "200px" }}
        >
          <div className="row">
            <aside className="col-md-3" style={{ marginBottom: "20px" }}>
              <div className="card shadow">
                <h5 className="card-header font-weight-bold">Settings</h5>

                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    href="#v-pills-home"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Personal information
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Change Phone Number
                  </a>
                  <Link
                    to={`/requestpasswordreset/Change Password`}
                    className="nav-link"
                    id="v-pills-settings-tab"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    Change Password
                  </Link>

                  <Link
                   className="nav-link text-danger"
                   id="v-pills-settings-tab"
                   role="tab"
                   aria-controls="v-pills-settings"
                   aria-selected="false"
                    to="/"
                    onClick={this.signOut.bind(this)}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </aside>

            <div className="col-md-9">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <PersonalInformation />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <PhoneNumber />
                </div>
                
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
    userObject: state.auth.userObject,
  };
}

export default connect(mapStateToProps, actions)(UserProfile);
