import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const carCondition = () => {
  const buttonsConditionStyle = {
    marginBottom: "20px",
  };

  const iconsStyle = {
    color: "#00544C",
    marginRight: "10px",
  };

  return (
    <div>
      <hr />
      <div className="col-sm text-center" style={{ marginTop: "30px" }}>
        <p className="text-centre font-weight-bold">
          View By Vehicle Condition
        </p>
      </div>
      <div className="row">
        <div className="col-md-4 text-center">
          <Link
            to={`/listcars/${"Foreign Used"}`}
            className="btn btn-custom btn-block stretched-link text-dark"
            role="button"
            style={buttonsConditionStyle}
          >
            <FontAwesomeIcon icon="list" style={iconsStyle} />
            FOREIGN USED
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link
            to={`/listcars/${"Locally Used"}`}
            className="btn btn-custom btn-block stretched-link text-dark"
            role="button"
            style={buttonsConditionStyle}
          >
            <FontAwesomeIcon
              className="fontAwesomeIcon"
              icon="list"
              style={iconsStyle}
            />
            LOCALLY USED
          </Link>
        </div>

        <div className="col-md-4 text-center">
          <Link
            to={`/listcars/${"Brand New"}`}
            className="btn btn-custom btn-block stretched-link text-dark"
            role="button"
          >
            <FontAwesomeIcon icon="list" style={iconsStyle} />
            BRAND NEW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default carCondition;
