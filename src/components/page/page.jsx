import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import classNames from "classnames";
import Main from "../main/main";
import Property from "../property/property";
import Header from "../header/header";

class Page extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: `main`,
      currentHotel: this.props.hotels[0],
    };

    this.hotelTitleClickHandler = this.hotelTitleClickHandler.bind(this);
  }

  hotelTitleClickHandler(hotel) {
    this.setState({
      currentPage: `property`,
      currentHotel: hotel,
    });
  }

  renderMain(currentPage, currentHotel) {
    // const { currentPage, currentMovie } = this.state;

    if (currentPage === `main`) {
      return (
        <Main
          hotels={this.props.hotels}
          onPlaceCardClick={this.hotelTitleClickHandler}
        />
      );
    }

    if (currentPage === `property`) {
      return <Property hotel={currentHotel} />;
    }

    return null;
  }

  render() {
    const { currentPage, currentHotel } = this.state;
    return (
      <Router>
        <Switch>
          <div
            className={classNames("page", {
              "page--gray page--main":
                this.state.currentPage === `main` &&
                window.location.pathname === "/",
              "": window.location.pathname === "/dev-property",
            })}
          >
            <Header />
            <Route exact path="/">
              {this.renderMain(currentPage, currentHotel)}
            </Route>
            <Route exact path="/dev-property">
              <Property hotel={currentHotel} />;
            </Route>
          </div>
        </Switch>
      </Router>
    );
  }
}

Page.propTypes = {};

export default Page;
