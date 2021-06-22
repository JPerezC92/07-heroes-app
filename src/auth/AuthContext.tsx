import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AuthAction, authReducer } from "./AuthReducer";

export interface IUser {
  logged: boolean;
  name: string | null;
}

export interface IAuthContext {
  user: IUser;
  dispatch: React.Dispatch<AuthAction>;
}

export const initialAuthContextState: IUser = {
  logged: false,
  name: null,
};

const AuthContext = createContext<IAuthContext>({
  user: initialAuthContextState,
  dispatch: () => null,
});

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

  const value: IAuthContext = { user, dispatch };

  useEffect(() => localStorage.setItem("user", JSON.stringify(user)), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, useAuthState };
