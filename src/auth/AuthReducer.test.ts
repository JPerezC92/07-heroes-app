import { AuthActionType, authReducer } from "./AuthReducer";

describe("Test in AuthReducer", () => {
  let initialState = { logged: false, name: null };

  beforeEach(() => {});

  test("should return the default state", () => {
    const newState = authReducer(initialState);
    expect(initialState).toMatchObject(newState);
  });

  test("should authenticate and set the username", () => {
    const name = "Philip";

    const newState = authReducer(initialState, {
      type: AuthActionType.login,
      payload: { name },
    });
    expect(newState).toMatchObject({ logged: true, name });
  });

  test("should delete the username and set logged to false", () => {
    const name = "Philip";

    const loginState = authReducer(initialState, {
      type: AuthActionType.login,
      payload: { name },
    });

    const logoutState = authReducer(loginState, {
      type: AuthActionType.logout,
    });

    expect(logoutState).toMatchObject({ logged: false, name: null });
  });
});
