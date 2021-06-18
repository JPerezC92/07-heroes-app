import { Switch, Route, Redirect } from "react-router-dom";
import DcScreen from "../components/dc/DcScreen";
import HeroScreen from "../components/heroes/HeroeScreen";
import MarvelScreen from "../components/marvel/MarvelScreen";
import Navbar from "../components/ui/Navbar";

interface Props {}

const DashboardRoutes = (props: Props) => {
  return (
    <>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/marvel" component={MarvelScreen} />
          <Route exact path="/heroe/:heroeId" component={HeroScreen} />
          <Route exact path="/dc" component={DcScreen} />

          <Redirect to="/marvel" />
        </Switch>
      </div>
    </>
  );
};

export default DashboardRoutes;
