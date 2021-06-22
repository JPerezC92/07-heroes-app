import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuthState } from "../auth/AuthContext";
import LoginScreen from "../components/login/LoginScreen";
import DashboardRoutes from "./DashboardRoutes";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  const { logged } = useAuthState();

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <PrivateRoute
              isAuthenticated={logged}
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
