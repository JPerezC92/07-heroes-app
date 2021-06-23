import PrivateRoute from "./PrivateRoute";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import LocalStorageService from "../services/LocalStorageService";

describe("Test on <PrivateRoute />", () => {
  const props: unknown = { location: { pathname: "/marvel" } };

  LocalStorageService.save = jest.fn();

  test("Should render if user is authenticated and save url on localStorage", () => {
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
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          {...props}
          isAuthenticated={false}
          path="/"
          Component={() => {
            return <span>hi</span>;
          }}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(false);
    expect(LocalStorageService.save).toHaveBeenCalledTimes(0);
  });
});
