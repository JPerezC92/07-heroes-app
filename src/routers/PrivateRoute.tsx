import React, { useEffect } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { useAuthState } from "../auth/AuthContext";
import LocalStorageService from "../services/LocalStorageService";

interface Props extends RouteProps {
  isAuthenticated: boolean;
  path: string;
  Component: React.FC<RouteComponentProps>;
}

const PrivateRoute = ({ isAuthenticated, Component, ...rest }: Props) => {
  const { user } = useAuthState();
  const pathname = rest.location?.pathname! || "";

  useEffect(() => {
    if (user.logged && pathname.length > 0) {
      LocalStorageService.save<string>("pathname", pathname);
    }
  }, [pathname, user.logged]);

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
