import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import CarBrands from "./CarBrands";
import CarBody from "./CarBody";
import CarCondition from "./CarCondition";
import Carousel from "./Carousel";
import JumbotronHome from "./JumbotronHome";
import Spinner from "./Spinner";
import TrendingCars from "./TrendingCars";

class Home extends Component {
  state = {
    loading: true,
    featuredCars: this.props.featuredCarsList,
    trendingCars: this.props.trendingCarsList
  };

  componentDidMount = async () => {
    await this.props.getFeaturedCarsList();
    await this.props.getTrendingCarsList()
    this.setState({
      featuredCars: this.props.featuredCarsList,
      trendingCars: this.props.trendingCarsList,
      loading: false,
    });
  };

  render() {
    const featuredCars = this.state.featuredCars;
    const trendingCars = this.state.trendingCars

    return (
      <div>
        <div>
          <JumbotronHome />
        </div>

        <div className="container">
          <div>
            {this.state.loading ? <Spinner /> : null}
            <Carousel key={featuredCars} featuredCars={featuredCars} />
          </div>

          <div>
            <CarCondition />
          </div>

          <div>
          {this.state.loading ? <Spinner /> : null}
            <TrendingCars key={trendingCars} trendingCars={trendingCars} />
          </div>

          <div>
            <CarBrands />
          </div>

          <div>
            <CarBody />
          </div>

        </div>
      </div>
    );
  }
}

function mapSateToProps(state) {
  return {
    featuredCarsList: state.carsList.featuredCarsList,
    trendingCarsList: state.carsList.trendingCarsList
  };
}

export default connect(mapSateToProps, actions)(Home);
