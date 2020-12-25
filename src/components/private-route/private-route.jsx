import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { PagePath } from "../../utilites/const";
import { useAuthorizationStatus } from "../../redux/user/hooks/selectors";

const PrivateRoute = (props) => {
  const { render, path, exact } = props;
  const authorizationStatus = useAuthorizationStatus();

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return authorizationStatus ? (
          render(routeProps)
        ) : (
          <Redirect to={PagePath.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
