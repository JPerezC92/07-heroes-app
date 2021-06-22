import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  path: string;
  Component: React.FC<RouteComponentProps>;
}

const PrivateRoute = ({ isAuthenticated, Component, ...rest }: Props) => {
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
