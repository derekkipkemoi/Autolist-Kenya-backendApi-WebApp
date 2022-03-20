import React from "react";
import { Link } from "react-router-dom";

const carTypes = () => {
  const textColor = {
    color: "#000",
  };
  return (
    <div>
      <hr />
      <div className="col-sm text-center" style={{ marginTop: "30px" }}>
        <p className="text-centre font-weight-bold" style={textColor}>
          View By Vehicle Type
        </p>
      </div>
      <div className="row">
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/car-front.svg")}
          />
          <Link
            to={`/listcars/${"All Cars"}`}
            className="stretched-link text-dark"
          >
            <p>All Cars</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/car.svg")}
          />
          <Link
            to={`/listcars/${"Saloons"}`}
            className="stretched-link text-dark"
          >
            <p>Saloons</p>
          </Link>
        </div>

        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/car_hatchback.svg")}
          />
          <Link
            to={`/listcars/${"Hatchbacks"}`}
            className="stretched-link text-dark"
          >
            <p>Hatchbacks</p>
          </Link>
        </div>

        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/wagon.svg")}
          />
          <Link
            to={`/listcars/${"Station Wagons"}`}
            className="stretched-link text-dark"
          >
            <p>Station Wagons</p>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/suv.svg")}
          />
          <Link to={`/listcars/${"SUV"}`} className="stretched-link text-dark">
            <p>SUVs</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/microbus.svg")}
          />
          <Link
            to={`/listcars/${"Vans&Buses"}`}
            className="stretched-link text-dark"
          >
            <p>Vans and Buses</p>
          </Link>
        </div>

        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/truck.svg")}
          />
          <Link
            to={`/listcars/${"Trucks&Trailers"}`}
            className="stretched-link text-dark"
          >
            <p>Trucks and Trailers</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/motorcycle.svg")}
          />
          <Link
            to={`/listcars/${"Motorbikes"}`}
            className="stretched-link text-dark"
          >
            <p>Motorcycle</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default carTypes;
