import React from "react";
import PropTypes from "prop-types";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Main from "../../pages/main/main";
import Property from "../../pages/property/property";
import history from "../../history";
import { getLoadingStatus } from "../../redux/data/selectors";
import LoaderSpinner from "../loader-spinner/loader-spinner";
import Login from "../../pages/login/login";
import {
  getAuthorizationStatus,
  getAuthorizationLoadingStatus,
} from "../../redux/user/selectors";
import Favorites from "../../pages/favorites/favorites";
import PrivateRoute from "../private-route/private-route";
import { PagePath } from "../../utilites/const";

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
            <Route exact path={PagePath.MAIN} component={Main} />
            <Route path={PagePath.PROPERTY()} component={Property} />
            <Route
              exact
              path={PagePath.LOGIN}
              render={() => {
                return !authorizationStatus ? <Login /> : <Redirect to="/" />;
              }}
            />
            <PrivateRoute
              exact
              path={PagePath.FAVORITES}
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
