import React, { Component } from "react";
import { connect } from "react-redux";
class UserPassword extends Component {
  state = {};

  render() {
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userObject: state.auth.userObject,
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, actions)(UserPassword);
