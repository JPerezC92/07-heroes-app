import { RouteComponentProps } from "react-router-dom";
import { useAuthState } from "../../auth/AuthContext";
import { AuthActionType } from "../../auth/AuthReducer";

interface Props extends RouteComponentProps {}

const LoginScreen = ({ history }: Props) => {
  const { dispatch } = useAuthState();

  const handleLogin = () => {
    history.replace("/");

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
