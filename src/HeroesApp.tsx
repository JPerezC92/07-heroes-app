import { AuthContextProvider } from "./auth/AuthContext";
import AppRouter from "./routers/AppRouter";

const HeroesApp = () => {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
};

export default HeroesApp;
