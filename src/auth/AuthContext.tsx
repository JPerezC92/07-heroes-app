import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AuthAction, authReducer } from "./AuthReducer";

export interface IUser {
  logged: boolean;
  name: string | null;
}

interface IAuthContext extends IUser {
  dispatch: React.Dispatch<AuthAction>;
}

export const initialAuthContextState = {
  logged: false,
  name: null,
} as IAuthContext;

const AuthContext = createContext(initialAuthContextState);

const useAuthState = () => {
  const context = useContext(AuthContext);
  return context;
};

const init = (initialState: IUser) => {
  const userStorageString = localStorage.getItem("user");

  if (userStorageString) return JSON.parse(userStorageString) as IUser;

  return initialState;
};

const AuthContextProvider: React.FC = ({ children }) => {
  const [user, dispatch] = useReducer(
    authReducer,
    initialAuthContextState,
    init
  );

  const value: IAuthContext = { ...user, dispatch };

  useEffect(() => localStorage.setItem("user", JSON.stringify(user)), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, useAuthState };
