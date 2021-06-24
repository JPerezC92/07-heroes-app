import { mount } from "enzyme";
import { MemoryRouter, Route, RouteComponentProps } from "react-router-dom";
import { routeComponentPropsFixture } from "../../test/fixtures/routeComponentPropsFixture";
import SearchScreen from "./SearchScreen";

describe("Test on <SearchScreen />", () => {
  test("should render correctly", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
  });

  test("should render Batman info and input text field with the queryString parameter", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.contains("Bruce Wayne")).toBeTruthy();
    expect(wrapper.find("input").props().value).toBe("batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("should display error if the search fails", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=gomamon"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      "There is not a hero with gomamon"
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("should call push from history", () => {
    const searchScreenProps: RouteComponentProps = {
      ...routeComponentPropsFixture,
      history: { ...routeComponentPropsFixture.history, push: jest.fn() },
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route
          path="/search"
          component={(props: unknown) => (
            <SearchScreen {...props} {...searchScreenProps} />
          )}
        />
      </MemoryRouter>
    );

    wrapper.find("input").simulate("change", {
      target: { name: "searchText", value: "batman" },
    });
    wrapper.find("form").simulate("submit");

    expect(searchScreenProps.history.push).toHaveBeenCalledWith("?q=batman");
  });
});
