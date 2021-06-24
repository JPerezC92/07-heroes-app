import { RouteComponentProps } from "react-router-dom";
import { useAuthState } from "../../auth/AuthContext";
import { AuthActionType } from "../../auth/AuthReducer";
import LocalStorageService from "../../services/LocalStorageService";

const LoginScreen = ({ history }: RouteComponentProps) => {
  const { dispatch } = useAuthState();

  const lastpath = LocalStorageService.get<string>("lastpath") || "/";

  const handleLogin = () => {
    history.replace(lastpath);

    dispatch({
      type: AuthActionType.login,
      payload: { name: "Philip" },
    });
  };

  return (
    <div className="container mt-5">
      <h1>Login Screen</h1>
      <hr />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginScreen;
