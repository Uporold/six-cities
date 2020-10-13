import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Main from "../main/main";
import Property from "../property/property";
import { projectPropTypes } from "../../utilites/project-prop-types";
import Page from "../page/page";
import NameSpace from "../../redux/name-space";

class App extends PureComponent {
  render() {
    const { hotels } = this.props;
    const getHotelById = (id) => {
      return hotels.find((hotel) => hotel.id === parseInt(id, 10));
    };
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Main hotels={hotels} />
          </Route>
          <Route
            path="/offers/:id"
            render={({ match }) => {
              const { id } = match.params;
              const hotel = getHotelById(id);
              return <Property hotel={hotel} hotels={hotels} />;
            }}
          />
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

const mapStateToProps = (state) => ({
  hotels: state[NameSpace.DATA].hotels,
});

export { App };
export default connect(mapStateToProps)(App);
