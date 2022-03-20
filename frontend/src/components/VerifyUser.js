import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../actions";
class VerifyUser extends Component {
  state = {
    secretToken: this.props.match.params.secretToken,
    message: null,
  };

  componentDidMount = async () => {
    this.props.signOut();
    if (
      this.state.secretToken !== null ||
      this.state.secretToken !== undefined
    ) {
      await this.props.verifyUser(this.state.secretToken);
      this.setState({
        message: this.props.message,
      });
    }
  };
  render() {
    if (this.state.message === "Sorry!! We are unable to verify your account") {
      this.props.history.index = 0;
    }

    return (
      <div className="container text-center" style={{ marginTop: "70px" }}>
        <div className="row text-center">
          {this.state.message !== null ? (
            <div className="alert alert-success" role="alert">
              <small>
                <span>{this.state.message}</span>
                <Link to={`/`} className="alert-link font-weight-bold">
                  {" "}
                  Click Here To Continue
                </Link>
              </small>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, actions)(VerifyUser);
