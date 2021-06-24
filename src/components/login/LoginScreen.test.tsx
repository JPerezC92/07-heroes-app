import { mount } from "enzyme";
import { MemoryRouter, RouteComponentProps } from "react-router-dom";
import { routeComponentPropsFixture } from "../../test/fixtures/routeComponentPropsFixture";
import { AuthActionType } from "../../auth/AuthReducer";
import LoginScreen from "./LoginScreen";
import { useAuthState } from "../../auth/AuthContext";
import LocalStorageService from "../../services/LocalStorageService";

jest.mock("../../auth/AuthContext", () => {
  return { useAuthState: jest.fn() };
});

describe("Test on <LoginScreen />", () => {
  const loginScreenProps: RouteComponentProps = {
    ...routeComponentPropsFixture,
    history: { ...routeComponentPropsFixture.history, replace: jest.fn() },
  };

  const useAuth = {
    user: { logged: true, name: null },
    dispatch: jest.fn(),
  };
  (useAuthState as jest.MockedFunction<any>).mockReturnValue(useAuth);

  const wrapper = mount(
    <MemoryRouter>
      <LoginScreen {...loginScreenProps} />
    </MemoryRouter>
  );

  test("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should realize a dispatch and navigation", () => {
    const button = wrapper.find("button");

    button.simulate("click");
    expect(loginScreenProps.history.replace).toHaveBeenCalledWith("/");
    expect(useAuth.dispatch).toHaveBeenCalledWith({
      payload: { name: "Philip" },
      type: AuthActionType.login,
    });
  });

  test("should rnavigate to /dc", () => {
    const useAuth = {
      user: { logged: true, name: null },
      dispatch: jest.fn(),
    };
    (useAuthState as jest.MockedFunction<any>).mockReturnValue(useAuth);

    LocalStorageService.save("lastpath", "/dc");

    const wrapper = mount(
      <MemoryRouter>
        <LoginScreen {...loginScreenProps} />
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");
    expect(loginScreenProps.history.replace).toHaveBeenCalledWith("/dc");
  });
});
