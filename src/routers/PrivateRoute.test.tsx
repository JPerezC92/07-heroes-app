import PrivateRoute from "./PrivateRoute";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import LocalStorageService from "../services/LocalStorageService";
import { useAuthState } from "../auth/AuthContext";

jest.mock("../auth/AuthContext", () => {
  return {
    useAuthState: jest.fn(),
  };
});

describe("Test on <PrivateRoute />", () => {
  const props: unknown = { location: { pathname: "/marvel" } };

  LocalStorageService.save = jest.fn();

  test("Should render if user is authenticated and save url on localStorage", () => {
    (useAuthState as jest.MockedFunction<any>).mockReturnValue({
      user: { logged: true, name: "Philip" },
    });

    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          {...props}
          isAuthenticated={true}
          path="/"
          Component={() => {
            return <span>Hola</span>;
          }}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(true);

    expect(LocalStorageService.save).toHaveBeenCalledWith(
      "pathname",
      "/marvel"
    );
  });

  test("shouldn't render component if user isn't authenticated", () => {
    (useAuthState as jest.MockedFunction<any>).mockReturnValue({
      user: { logged: false, name: null },
    });

    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          {...props}
          isAuthenticated={false}
          path="/"
          Component={() => {
            return <span>Hola</span>;
          }}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(false);
    expect(LocalStorageService.save).toHaveBeenCalledTimes(0);
  });
});
