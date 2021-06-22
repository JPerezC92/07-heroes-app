import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  path: string;
  Component: React.FC<RouteComponentProps>;
  exact?: boolean;
}

const PublicRoute = ({ isAuthenticated, Component, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
