import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "../components/login/LoginScreen";
import DashboardRoutes from "./DashboardRoutes";

const AppRouter = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <Route path="/" component={DashboardRoutes} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default AppRouter;
