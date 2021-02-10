import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { PagePath } from "../../utilites/const";
import { useAuthorizationStatus } from "../../redux/user/hooks/selectors";

interface Props extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<Props> = (props): JSX.Element => {
  const { component: Component, path, exact } = props;
  const authorizationStatus = useAuthorizationStatus();
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return authorizationStatus ? (
          <Component routeProps={routeProps} />
        ) : (
          <Redirect to={PagePath.LOGIN} />
        );
      }}
    />
  );
};

export default PrivateRoute;
