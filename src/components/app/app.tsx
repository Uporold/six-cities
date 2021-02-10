import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Main from "../../pages/main/main";
import Property from "../../pages/property/property";
import history from "../../history";
import LoaderSpinner from "../loader-spinner/loader-spinner";
import Login from "../../pages/login/login";
import Favorites from "../../pages/favorites/favorites";
import PrivateRoute from "../private-route/private-route";
import { PagePath } from "../../utilites/const";
import {
  useAuthorizationStatus,
  useAuthorizationLoadingStatus,
} from "../../redux/user/hooks/selectors";
import { useLoadingStatus } from "../../redux/data/hooks/selectors";

const App: React.FC = (): JSX.Element => {
  const authorizationStatus = useAuthorizationStatus();
  const isAuthorizationLoading = useAuthorizationLoadingStatus();
  const isDataLoading = useLoadingStatus();

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
                return !authorizationStatus ? (
                  <Login />
                ) : (
                  <Redirect to={PagePath.MAIN} />
                );
              }}
            />
            <PrivateRoute
              exact
              path={PagePath.FAVORITES}
              component={Favorites}
            />
          </Switch>
        </Router>
      ) : (
        <LoaderSpinner />
      )}
    </>
  );
};

export default App;
