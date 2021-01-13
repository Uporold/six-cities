import React from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteChildrenProps,
} from "react-router-dom";
import { PagePath } from "../../utilites/const";
import { useAuthorizationStatus } from "../../redux/user/hooks/selectors";

interface Props extends RouteProps {
  render: (routeProps: RouteChildrenProps) => React.ReactNode;
}

const PrivateRoute: React.FC<Props> = (props): JSX.Element => {
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

export default PrivateRoute;
