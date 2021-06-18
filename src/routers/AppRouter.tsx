import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "../components/login/LoginScreen";
import MarvelScreen from "../components/marvel/MarvelScreen";
import Navbar from "../components/ui/Navbar";

const AppRouter = () => {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/" component={MarvelScreen} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default AppRouter;
