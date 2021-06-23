import { mount } from "enzyme";
import { useAuthState } from "../auth/AuthContext";
import AppRouter from "./AppRouter";

jest.mock("../auth/AuthContext", () => {
  return {
    useAuthState: jest.fn(),
  };
});

describe("Test on <AppRouter />", () => {
  test("should render login if user isn't authenticated", () => {
    (useAuthState as jest.MockedFunction<any>).mockReturnValue({
      user: { logged: false, name: "null" },
    });
    const wrapper = mount(<AppRouter />);

    expect(wrapper).toMatchSnapshot();
  });

  test("should render marvel  if user is authenticated", () => {
    const name = "Philip";

    (useAuthState as jest.MockedFunction<any>).mockReturnValue({
      user: { logged: true, name },
    });
    const wrapper = mount(<AppRouter />);

    expect(wrapper.contains(name)).toBeTruthy();
    expect(wrapper.find(".navbar").exists()).toBeTruthy();
  });
});
