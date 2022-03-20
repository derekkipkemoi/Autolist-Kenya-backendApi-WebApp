import React from "react";
import { Link } from "react-router-dom";

const carBrand = () => {
  return (
    <div>
      <hr />
      <div className="col-sm text-center" style={{ marginTop: "30px" }}>
        <p className="text-centre font-weight-bold">
          View By Vehicle Popular Brand
        </p>
      </div>
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/toyota.svg")}
          />
          <Link
            to={`/listcars/${"Toyota"}`}
            className="stretched-link text-dark"
          >
            <p>Toyota</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/nissan.svg")}
          />
          <Link
            to={`/listcars/${"Nissan"}`}
            className="stretched-link text-dark"
          >
            <p>Nissan</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/subaru.svg")}
          />
          <Link
            to={`/listcars/${"Subaru"}`}
            className="stretched-link text-dark"
          >
            <p>Subaru</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/honda.svg")}
          />
          <Link
            to={`/listcars/${"Honda"}`}
            className="stretched-link text-dark"
          >
            <p>Honda</p>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/mitsubishi.svg")}
          />
          <Link
            to={`/listcars/${"Mitsubishi"}`}
            className="stretched-link text-dark"
          >
            <p>Mitsubishi</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/mercedes-benz.svg")}
          />
          <Link
            to={`/listcars/${"Mercedes"}`}
            className="stretched-link text-dark"
          >
            <p>Mercedes</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/mazda.svg")}
          />
          <Link
            to={`/listcars/${"Mazda"}`}
            className="stretched-link text-dark"
          >
            <p>Mazda</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/volkswagen.svg")}
          />
          <Link
            to={`/listcars/${"Volkswagen"}`}
            className="stretched-link text-dark"
          >
            <p>Volkswagen</p>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/bmw.svg")}
          />
          <Link to={`/listcars/${"BMW"}`} className="stretched-link text-dark">
            <p>BMW</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/land-rover.svg")}
          />
          <Link
            to={`/listcars/${"Land&Range Rover"}`}
            className="stretched-link text-dark"
          >
            <p>Land/Range Rover</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/isuzu.svg")}
          />
          <Link
            to={`/listcars/${"Isuzu"}`}
            className="stretched-link text-dark"
          >
            <p>Isuzu</p>
          </Link>
        </div>
        <div className="col text-center">
          <img
            style={{ width: "60px" }}
            alt="Clock"
            src={require("../assets/svgs/audi.svg")}
          />
          <Link to={`/listcars/${"Audi"}`} className="stretched-link text-dark">
            <p>Audi</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default carBrand;
