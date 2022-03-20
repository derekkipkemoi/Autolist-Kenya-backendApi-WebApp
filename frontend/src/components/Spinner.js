import React, { Component } from "react";

class Spinner extends Component {
  state = {};
  render() {
    return (
      <div className="text-center">
        <div
          className="spinner-grow"
          style={{ width: "2rem", height: "2rem", color: "#25D366" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow text-danger"
          style={{ width: "2rem", height: "2rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow"
          style={{ width: "2rem", height: "2rem", color: "#ffa010" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Spinner;
