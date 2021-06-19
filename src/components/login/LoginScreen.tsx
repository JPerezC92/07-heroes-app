import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const LoginScreen = ({ history }: Props) => {
  const handleLogin = () => {
    console.log("click");
    history.push("/");
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
