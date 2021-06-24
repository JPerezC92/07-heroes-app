import { mount } from "enzyme";

import { MemoryRouter, Route } from "react-router-dom";
import { heroScreenPropsFixture } from "../../test/fixtures/heroScreenPropsFixture";
import HeroScreen from "./HeroScreen";

describe("Test on <HeroScreen />", () => {
  test("should render <Redirect /> component if isn't arguments on URL'", () => {
    const HeroScreenProps = {
      ...heroScreenPropsFixture,
      history: {
        ...heroScreenPropsFixture.history,
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
      },
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroScreen {...HeroScreenProps} />
      </MemoryRouter>
    );

    expect(wrapper.find("Redirect").exists()).toBeTruthy();
  });

  test("should render a hero if param exists", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Route path="/hero/:heroeId" component={HeroScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.contains("Bruce Wayne")).toBeTruthy();
  });

  test("should redirect with push()", () => {
    const HeroScreenProps = {
      ...heroScreenPropsFixture,
      history: {
        ...heroScreenPropsFixture.history,
        length: 1,
        push: jest.fn(),
        goBack: jest.fn(),
      },
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen {...HeroScreenProps} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");

    expect(HeroScreenProps.history.goBack).not.toHaveBeenCalled();
    expect(HeroScreenProps.history.push).toHaveBeenCalledWith("/");
  });

  test("should redirect with goBack()", () => {
    const HeroScreenProps = {
      ...heroScreenPropsFixture,
      history: {
        ...heroScreenPropsFixture.history,
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
      },
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen {...HeroScreenProps} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");

    expect(HeroScreenProps.history.goBack).toHaveBeenCalled();
    expect(HeroScreenProps.history.push).not.toHaveBeenCalled();
  });

  test("should render <Redirect /> component if hero does not exists", () => {
    const heroScreenProps = {
      ...heroScreenPropsFixture,
      history: {
        ...heroScreenPropsFixture.history,
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
      },
    };

    const heroId = "dc-batman123wewq";
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/hero/${heroId}`]}>
        <Route
          path="/hero/:heroId"
          component={() => <HeroScreen {...heroScreenProps} />}
        />
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe("");
  });
});
