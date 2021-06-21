import { IAuthContext } from "./AuthContext";

enum ActionType {
  login = "[auth] login",
  logout = "[auth] logout",
}

export const authReducer = (
  state: IAuthContext,
  action: { type: ActionType; payload: ObjectConstructor }
): IAuthContext => {
  switch (action.type) {
    case ActionType.login:
      return { ...action.payload, logged: true };

    case ActionType.logout:
      return { logged: false };

    default:
      return state;
  }
};
