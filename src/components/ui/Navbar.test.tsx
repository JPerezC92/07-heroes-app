import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { useAuthState } from "../../auth/AuthContext";
import { AuthActionType } from "../../auth/AuthReducer";
import { createMemoryHistory } from "history";
import Navbar from "./Navbar";

jest.mock("../../auth/AuthContext", () => {
  return { useAuthState: jest.fn() };
});

describe("Test on <Navbar />", () => {
  const name = "Philip";
  const dispatch = jest.fn();
  const historyMock = createMemoryHistory();
  historyMock.replace = jest.fn();

  (useAuthState as jest.MockedFunction<any>).mockReturnValue({
    user: { logged: true, name },
    dispatch,
  });

  const wrapper = mount(
    <MemoryRouter>
      <Router history={historyMock}>
        <Navbar />
      </Router>
    </MemoryRouter>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe(name);
  });

  test("should call logout and history.replace", () => {
    expect(wrapper.find("button").exists()).toBeTruthy();
    wrapper.find("button").simulate("click");

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: AuthActionType.logout,
    });
    expect(historyMock.replace).toHaveBeenCalledWith("./login");
  });
});
