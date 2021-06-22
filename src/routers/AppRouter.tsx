import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useAuthState } from "../auth/AuthContext";
import LoginScreen from "../components/login/LoginScreen";
import DashboardRoutes from "./DashboardRoutes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  const { user } = useAuthState();

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              exact
              isAuthenticated={user.logged}
              path="/login"
              Component={LoginScreen}
            />
            <PrivateRoute
              isAuthenticated={user.logged}
              path="/"
              Component={DashboardRoutes}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default AppRouter;
