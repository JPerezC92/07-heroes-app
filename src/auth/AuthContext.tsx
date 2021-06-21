import React, { createContext, useContext, useReducer } from "react";
import { authReducer } from "./AuthReducer";

export interface IAuthContext {
  logged: boolean;
}

const initialAuthContextState = { logged: false };

const AuthContext = createContext<IAuthContext>(initialAuthContextState);

const useAuthState = () => {
  const context = useContext(AuthContext);
  return context;
};

const init = (initialState: IAuthContext) => {
  const userStorageString = localStorage.getItem("user");

  if (userStorageString) return JSON.parse(userStorageString) as IAuthContext;

  return initialState;
};

const AuthContextProvider: React.FC = ({ children }) => {
  const [user, dispatch] = useReducer(
    authReducer,
    initialAuthContextState,
    init
  );

  const value = { ...user, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, useAuthState };
