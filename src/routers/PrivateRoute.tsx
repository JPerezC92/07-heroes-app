import React, { useEffect } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import LocalStorageService from "../services/LocalStorageService";

interface Props extends RouteProps {
  isAuthenticated: boolean;
  path: string;
  Component: React.FC<RouteComponentProps>;
}

const PrivateRoute = ({ isAuthenticated, Component, ...rest }: Props) => {
  const pathname = rest.location?.pathname! || "";

  useEffect(() => {
    if (isAuthenticated && pathname.length > 0) {
      LocalStorageService.save<string>("lastpath", pathname);
    }
  }, [pathname, isAuthenticated]);

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
