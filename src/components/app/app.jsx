import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "../main/main";
import Property from "../property/property";
import { projectPropTypes } from "../../utilites/project-prop-types";
import Page from "../page/page";
/* const adTitleClickHandler = (hotel) => {
  console.log(`---`);
  console.log(hotel);
  console.log(`---`);
};

function App({ hotels }) {
  return <Main hotels={hotels} onPlaceCardClick={adTitleClickHandler} />;
}
*/

class App extends PureComponent {
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

  renderApp(currentPage, currentHotel, hotels) {
    if (currentPage === `main`) {
      return (
        <Main hotels={hotels} onPlaceCardClick={this.hotelTitleClickHandler} />
      );
    }

    if (currentPage === `property`) {
      return (
        <Property
          hotel={currentHotel}
          hotels={hotels}
          onPlaceCardClick={this.hotelTitleClickHandler}
        />
      );
    }

    return null;
  }

  render() {
    const { currentPage, currentHotel } = this.state;
    const { hotels } = this.props;
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this.renderApp(currentPage, currentHotel, hotels)}
          </Route>
          <Route exact path="/dev-property">
            <Property
              hotel={currentHotel}
              hotels={hotels}
              onPlaceCardClick={this.hotelTitleClickHandler}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

// function App({ hotels }) {
//   return <Page hotels={hotels} />;
// }

App.propTypes = {
  hotels: PropTypes.arrayOf(projectPropTypes.HOTEL.isRequired).isRequired,
};

export default App;
