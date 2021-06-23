import { initialAuthContextState, IUser } from "./AuthContext";

export enum AuthActionType {
  login = "[auth] login",
  logout = "[auth] logout",
}

export type AuthAction = {
  type: AuthActionType;
  payload?: Omit<IUser, "logged">;
};

export const authReducer = (state: IUser, action?: AuthAction): IUser => {
  switch (action?.type) {
    case AuthActionType.login:
      return { ...action.payload!, logged: true };

    case AuthActionType.logout:
      return initialAuthContextState;

    default:
      return state;
  }
};
