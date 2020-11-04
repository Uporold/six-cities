import React from "react";
import PropTypes from "prop-types";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Main from "../main/main";
import Property from "../property/property";
import history from "../../history";
import { getLoadingStatus } from "../../redux/data/selectors";
import LoaderSpinner from "../loader-spinner/loader-spinner";
import Login from "../login/login";
import {
  getAuthorizationStatus,
  getAuthorizationLoadingStatus,
} from "../../redux/user/selectors";
import Favorites from "../favorites/favorites";
import PrivateRoute from "../private-route/private-route";

const App = ({
  isDataLoading,
  authorizationStatus,
  isAuthorizationLoading,
}) => {
  return (
    <>
      {!isDataLoading && !isAuthorizationLoading ? (
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/offers/:id" component={Property} />
            <Route
              exact
              path="/login"
              render={() => {
                return !authorizationStatus ? <Login /> : <Redirect to="/" />;
              }}
            />
            <PrivateRoute
              exact
              path="/favorites"
              render={() => <Favorites />}
            />
          </Switch>
        </Router>
      ) : (
        <LoaderSpinner />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isDataLoading: getLoadingStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
  isAuthorizationLoading: getAuthorizationLoadingStatus(state),
});

App.propTypes = {
  isDataLoading: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.bool.isRequired,
  isAuthorizationLoading: PropTypes.bool.isRequired,
};

export { App };
export default connect(mapStateToProps)(App);
