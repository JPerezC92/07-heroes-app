import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { useAuthState } from "../auth/AuthContext";
import DashboardRoutes from "./DashboardRoutes";

jest.mock("../auth/AuthContext", () => {
  return { useAuthState: jest.fn() };
});

describe("test on <DashboardRoutes />", () => {
  test("should render correctly", () => {
    const name = "Philip";

    (useAuthState as jest.MockedFunction<any>).mockReturnValue({
      user: { logged: true, name },
    });

    const wrapper = mount(
      <MemoryRouter>
        <DashboardRoutes />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe(name);
  });
});
